// server.js
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/auth.js";
import Stripe from "stripe";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cron from "node-cron";

dotenv.config();

const {
  MONGO_URL,
  PORT = 8080,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  FRONTEND_URL = "http://localhost:5173"
} = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

if (!STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY environment variable");
  process.exit(1);
}

const stripe = new Stripe(STRIPE_SECRET_KEY);
const app = express();

// CORS a frontendhez
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

// Cookie parser
app.use(cookieParser());

// ------------------- Stripe Webhook -------------------
// IMPORTANT: webhook endpoint must receive raw body -> bodyParser.raw BEFORE express.json()
app.post("/api/webhook", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  if (!STRIPE_WEBHOOK_SECRET) {
    console.warn("Stripe webhook secret not set; skipping verification.");
  }

  let event;
  try {
    if (STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        STRIPE_WEBHOOK_SECRET
      );
    } else {
      // If no webhook secret (only for local dev), try parsing the JSON (best-effort)
      event = JSON.parse(req.body.toString());
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Stripe session email:", session.customer_email);

    try {
      const user = await User.findOne({ email: session.customer_email });
      if (user) {
        user.subscriber = true;
        user.subscriptionExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await user.save();
      }
    } catch (err) {
      console.error("User update error:", err);
    }
  }

  res.json({ received: true });
});

// ------------------- JSON parser minden más API-hoz -------------------
app.use(express.json());

// ------------------- Profile -------------------
app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ success: false });

    if (user.subscriber && user.subscriptionExpires < new Date()) {
      user.subscriber = false;
      await user.save();
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// ------------------- Logout -------------------
app.post("/api/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ success: true, message: "Kijelentkezve" });
});

// ------------------- Create Checkout Session -------------------
app.post("/api/create-checkout-session", authMiddleware, async (req, res) => {
  try {
    const { packageName } = req.body;

    const packagePrices = {
      "Gold Csomag": 14990,
      "Platina Csomag": 24990,
    };

    if (!packagePrices[packageName]) {
      return res.status(400).json({ success: false, message: "Érvénytelen csomag" });
    }

    // A success/cancel URL most a FRONTEND_URL környezeti változóból jön
    const successUrl = `${FRONTEND_URL.replace(/\/$/, "")}/success`;
    const cancelUrl = `${FRONTEND_URL.replace(/\/$/, "")}/cancel`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // Kiegészítés: ha szeretnéd, hogy 3DS automatikusan kezelve legyen
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      line_items: [{
        price_data: {
          currency: "huf",
          product_data: { name: `${packageName} - 30 nap` },
          unit_amount: packagePrices[packageName] * 100, // forint -> minor currency units
        },
        quantity: 1,
      }],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: req.user.email,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ success: false, message: "Fizetés indítása sikertelen" });
  }
});

// ------------------- Register -------------------
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: "All fields are required" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, user: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ------------------- Login -------------------
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ success: false, message: "Hibás bejelentkezési adatok" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    }).json({ success: true, user: { id: user._id, name: user.name, email: user.email, subscriber: user.subscriber } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false });
  }
});

// ------------------- Start Server -------------------
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    // ------------------- CRON JOB: előfizetés ellenőrzés -------------------
    // Fut minden órában (0. perc)
    cron.schedule("0 * * * *", async () => {
      console.log("CRON: Előfizetések ellenőrzése indul...");
      try {
        const now = new Date();
        const result = await User.updateMany(
          { subscriber: true, subscriptionExpires: { $lt: now } },
          { $set: { subscriber: false } }
        );
        if (result.modifiedCount > 0) {
          console.log(`CRON: ${result.modifiedCount} előfizetés lejárt és inaktiválva lett.`);
        }
      } catch (err) {
        console.error("CRON hiba:", err);
      }
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

startServer();
