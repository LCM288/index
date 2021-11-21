import { Timestamp } from "firebase-admin/firestore";

export type Book = {
  id: string; // uuid
  seriesId: number;
  volumn: string;
  isbn: string; // a 10 digit or 13 digit string
  title: string | null;
  author: string | null;
  location: string | null;
  language: string | null;
  status: "on-loan" | "on-shelf" | "hold" | "lost" | "archived" | "deleted";
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
