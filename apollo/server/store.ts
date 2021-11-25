import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import type { ServiceAccount } from "firebase-admin/app";

export const firestore = new Promise<Firestore>(async (resolve) => {
  if (process.env.IS_GCP) {
    initializeApp({ credential: applicationDefault() });
  } else {
    initializeApp({
      credential: cert(
        (await import("GCPServiceAccountKey.json")) as ServiceAccount
      ),
    });
  }
  resolve(getFirestore());
});
