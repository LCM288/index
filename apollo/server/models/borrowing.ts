import { Timestamp } from "firebase-admin/firestore";

export type Borrowing = {
  id: string; // uuid
  sid: string;
  bookId: number;
  borrowAt: Timestamp;
  dueOn: Timestamp;
  returnedAt: Timestamp | null;
  renewalCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
