import {
  initializeApp,
  applicationDefault,
  cert,
  getApps,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const getStore = () => {
  if (!getApps().length) {
    initializeApp({
      credential: process.env.IS_GCP
        ? applicationDefault()
        : cert("GCPServiceAccountKey.json"),
    });
  }
  return getFirestore();
};

export const firestore = getStore();
