import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

initializeApp({
  credential: process.env.IS_GCP
    ? applicationDefault()
    : cert("GCPServiceAccountKey.json"),
});

export const firestore = getFirestore();
