# sport_bet_web
A modern web platform for premium sports betting tips. Features secure user registration and login, subscription-based access to expert predictions, and a responsive design. Built for scalability with plans for personalized dashboards, admin management, and future expansion.

===========================================================================
#ENG
===========================================================================
# Setting Up Stripe Test Payments (Local Development)

## 1. Install the Stripe CLI
If the Stripe CLI is not yet installed, run:

```bash
npm install -g stripe
```

(or download it from the official site: https://stripe.com/docs/stripe-cli)

## 2. Log in to your Stripe account

In the terminal (CMD/PowerShell), run:

```bash
stripe login
```

This command will open a browser where you authorize the CLI to access your Stripe account. After successful login, the CLI will save the authentication automatically.

## 3. Listening to webhook events (for your local server)

Make sure your server is running (e.g., `npm run dev` or `node server.js`), then start the webhook listener:

```bash
stripe listen --forward-to localhost:8080/api/webhook
```

The terminal output will show a line like:

```
Ready! Your webhook signing secret is whsec_1234567890abcdef...
```

Copy this `whsec_...` key into your project’s `.env` file:

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef
```

## 4. Example server `.env` file

Example `.env` (replace the values with your own):

```env
MONGO_URL=mongodb+srv://...
PORT=8080
JWT_SECRET=some_long_random_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

## 5. Initiating a test payment

From the frontend (or Postman), start a payment using the Stripe test card:

- Card number: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits

After a successful payment, `stripe listen` will forward the webhook events to `localhost:8080/api/webhook` and your server will process them.




===========================================================================
#HUN
===========================================================================
# Stripe tesztfizetés beállítása (helyi fejlesztéshez)

## 1. Stripe CLI telepítése
Ha még nincs telepítve a Stripe CLI, futtasd:

```bash
npm install -g stripe
```

(vagy töltsd le a hivatalos oldalról: https://stripe.com/docs/stripe-cli)

## 2. Bejelentkezés a Stripe fiókba

A terminálban (CMD/PowerShell) futtasd:

```bash
stripe login
```

A parancs megnyit egy böngészőt, ahol engedélyezned kell a CLI hozzáférést a Stripe fiókodhoz. Sikeres bejelentkezés után a CLI elmenti a hitelesítést.

## 3. Webhook események figyelése (helyi szerverhez)

Győződj meg róla, hogy a szervered fut (pl. `npm run dev` vagy `node server.js`), majd indítsd el a webhook figyelőt:

```bash
stripe listen --forward-to localhost:8080/api/webhook
```

A parancs kimenetében megjelenik egy sor hasonlóan:

```
Ready! Your webhook signing secret is whsec_1234567890abcdef...
```

Ezt a `whsec_...` kulcsot másold a projekted `.env` fájljába:

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef
```

## 4. A szerver `.env` példája

Példa `.env` (ne felejtsd el a saját értékekre cserélni):

```env
MONGO_URL=mongodb+srv://...
PORT=8080
JWT_SECRET=valami_hosszu_es_veletlenszeru
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
```

## 5. Teszt fizetés indítása

A frontendről (vagy Postmanből) indíts fizetést a Stripe tesztkártyával:

- Kártyaszám: `4242 4242 4242 4242`
- Lejárat: bármilyen jövőbeli dátum
- CVC: bármilyen 3 szám

Sikeres fizetés után a `stripe listen` továbbítja a webhookokat a `localhost:8080/api/webhook` végponthoz, és a szervered feldolgozza az eseményeket.
