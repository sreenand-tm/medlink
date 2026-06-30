# MedLink – India's Emergency Resource Network

MedLink is a real-time emergency response platform that connects patients, hospitals, pharmacies, and administrators in a single, unified intelligent system. It provides live ICU bed tracking, AI-powered triage (voice & text), ambulance tracking, medicine finder, prescription scanning, blood bank coordination, specialist booking, and secure medical records — all built for India's emergency needs.

**Live Demo:** [medlink-rouge.vercel.app](https://medlink-rouge.vercel.app)

## Features

### Patient Portal

- Find nearby hospitals with live ICU/ventilator availability.
- AI Triage (Groq Llama 3) — text or voice in 8 languages (English, Hindi, Tamil, Malayalam, etc.).
- Book appointments with hospital specialists via token-based system.
- Medicine finder with pharmacy search and price comparison.
- Prescription scanner — upload or photograph any medical document; AI extracts medications, dosages, and lab results.
- Secure medical records shared with hospitals on SOS.
- Live ambulance tracking with ETA countdown.
- Blood type storage and blood donation registry.

### Hospital Portal

- Manage ICU/ventilator availability in real time.
- View incoming SOS and blood requests with patient location and medical records.
- Accept/decline requests, admit patients, discharge with automatic discharge log.
- Dispatch ambulances with simulated ETA.
- Blood bank inventory management.
- Specialist management with daily token limits.
- Inter-hospital chat (broadcast, network, patient transfers).

### Pharmacy Portal

- List medicines, prices, stock, and prescription status.
- Update pharmacy location on map for patient discovery.
- Inventory search and management.

### Admin Dashboard

- Monitor total hospitals, ICU beds, ventilators, and active SOS counts.
- Register new hospitals and pharmacies (with email credentials).
- View all requests and patient trust scores.
- Export data (CSV) and send broadcast alerts to all hospitals.
- Region-based emergency status (normal/elevated/critical).
- Live hospital and pharmacy network maps.
- Analytics charts (SOS trends, response metrics).

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **UI / Styling:** Google Fonts (Outfit, DM Mono), custom CSS variables (dark/light themes), glassmorphism, CSS animations
- **3D Background:** Three.js (node-network with particle effects)
- **Maps & Routing:** Leaflet.js, OpenStreetMap (tiles), Nominatim (reverse geocoding), OSRM (route calculation)
- **Backend (BaaS):** Firebase — Authentication (email/password, Google) & Firestore (NoSQL real-time database)
- **AI / ML:** Groq API — Llama 3 (triage, specialist finder), Llama 4 Vision (prescription scanner)
- **Email Service:** Brevo (Sendinblue) — transactional emails (OTP, welcome credentials, alerts)
- **Native Browser APIs:** Web Speech API (voice recognition & synthesis), Web Crypto API (OTP hashing), Geolocation API
- **Hosting:** Vercel (serverless functions for API key protection)

## Setup & Environment Variables

### Clone the repository

```bash
git clone https://github.com/your-username/medlink.git
cd medlink
```

### Install dependencies

```bash
npm install
```

This is a vanilla project, but Vercel development works best with the CLI installed.

### Set up Firebase

- Create a Firebase project and enable Authentication (Email/Password + Google).
- Create a Firestore database (start in test mode, then set security rules).
- Obtain your Firebase config (apiKey, authDomain, projectId, etc.).

### Get API keys

- Groq — generate an API key for Llama models.
- Brevo — get an SMTP/API key and a sender email/name.
- OSRM/Nominatim are free and public; no keys needed.

### Create `.env.local`

```env
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
GROQ_API_KEY=...
BREVO_API_KEY=...
BREVO_EMAIL=your-sender@example.com
BREVO_NAME=MedLink
```

### Create `/api/config.js`

```js
export default function handler(req, res) {
  res.status(200).json({
    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    groqKey: process.env.GROQ_API_KEY,
    brevoKey: process.env.BREVO_API_KEY,
    brevoEmail: process.env.BREVO_EMAIL,
    brevoName: process.env.BREVO_NAME,
  });
}
```

### Run locally

```bash
npm install -g vercel
vercel dev
```

The app will be available at `http://localhost:3000`.

## Deployment to Vercel

- Push the code to a GitHub repository.
- Import the repository into Vercel.
- Add the environment variables listed above in the Vercel project settings.
- Deploy — Vercel will automatically handle the `api/config` route.

## Folder Structure

```text
/
├── index.html # Main single-page app (all HTML, CSS, JS)
├── api/
│   └── config.js # Serverless function to serve environment variables
├── .env.local # Local environment variables (not committed)
├── .vercelignore # Ignore README.md and other files during deployment
└── README.md # This file
```

Note: The entire application is contained in `index.html`. The JavaScript is split into `type="module"` scripts within the same file.

## Security & Privacy

- All API keys are server-side (Vercel functions) — never exposed to the client.
- Patient medical records are stored in Firestore and only shared with hospitals upon SOS.
- Trust scores are maintained per patient to prevent abuse.
- OTPs are hashed on the client before verification.

## Testing

- Use a modern browser (Chrome recommended for voice features).
- Enable location and camera permissions for full functionality.
- Test with the admin account created via Firebase.

## License

This project is for demonstration purposes. All rights reserved.

**MedLink – Every second counts.**
Made with ❤️ for India.
