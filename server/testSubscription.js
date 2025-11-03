import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/user.model.js";

dotenv.config();

const { MONGO_URL } = process.env;

async function testSubscription() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // 1️⃣ Állítsuk lejártra a teszt user előfizetését
    const userEmail = "asd4@gmail.com"; // cseréld a saját user email-jére
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.log("Nincs ilyen felhasználó!");
      return;
    }

    user.subscriptionExpires = new Date(Date.now() - 1000); // már lejárt
    user.subscriber = true; // előfizetés még aktív
    await user.save();
    console.log("Előfizetés lejáratra állítva:", userEmail);

    // 2️⃣ Lefuttatjuk a cron logikát manuálisan
    const now = new Date();
    const result = await User.updateMany(
      { subscriber: true, subscriptionExpires: { $lt: now } },
      { $set: { subscriber: false } }
    );

    console.log(`${result.modifiedCount} előfizetés lett inaktiválva.`);

    // 3️⃣ Ellenőrzés
    const updatedUser = await User.findOne({ email: userEmail });
    console.log("Frissített user:", {
      email: updatedUser.email,
      subscriber: updatedUser.subscriber,
      subscriptionExpires: updatedUser.subscriptionExpires,
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

testSubscription();

