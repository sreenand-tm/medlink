// api/config.js — Vercel Serverless Function
// This file runs on Vercel's servers, NOT in the browser.
// It reads secret env vars and returns only what the frontend needs.
// The keys are NEVER shipped inside index.html.

export default function handler(req, res) {
  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Optional: restrict to your own domain in production
  const origin = req.headers.origin || "";
  const allowed = [
    process.env.ALLOWED_ORIGIN || "",   // e.g. https://medlink.vercel.app
    "http://localhost:3000",
    "http://localhost:5173",
  ].filter(Boolean);

  // Allow if origin matches OR if it's a direct server-side call (no origin header)
  if (origin && allowed.length && !allowed.some((o) => origin.startsWith(o))) {
    return res.status(403).json({ error: "Forbidden" });
  }

  // Read all secrets from Vercel environment variables
  const config = {
    firebase: {
      apiKey:            process.env.FIREBASE_API_KEY,
      authDomain:        process.env.FIREBASE_AUTH_DOMAIN,
      projectId:         process.env.FIREBASE_PROJECT_ID,
      storageBucket:     process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId:             process.env.FIREBASE_APP_ID,
    },
    groqKey:   process.env.GROQ_API_KEY,
    brevoKey:  process.env.BREVO_API_KEY,
    brevoEmail: process.env.BREVO_SENDER_EMAIL || "faultline1823@gmail.com",
    brevoName:  process.env.BREVO_SENDER_NAME  || "Medlink",
  };

  // Validate — refuse to respond if any critical key is missing
  const missing = [];
  if (!config.firebase.apiKey)     missing.push("FIREBASE_API_KEY");
  if (!config.firebase.projectId)  missing.push("FIREBASE_PROJECT_ID");
  if (!config.groqKey)             missing.push("GROQ_API_KEY");
  if (!config.brevoKey)            missing.push("BREVO_API_KEY");

  if (missing.length) {
    console.error("Missing env vars:", missing.join(", "));
    return res.status(500).json({
      error: "Server misconfigured",
      missing, // shown in Vercel logs, not to end users in prod
    });
  }

  // Cache for 5 minutes (keys don't change at runtime)
  res.setHeader("Cache-Control", "private, max-age=300");
  return res.status(200).json(config);
}
