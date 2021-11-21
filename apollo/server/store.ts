import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import serviceAccount from "GCPServiceAccountKey.json";

initializeApp({
  credential: process.env.IS_GCP ? applicationDefault() : cert(serviceAccount),
});

export const firestore = getFirestore();
