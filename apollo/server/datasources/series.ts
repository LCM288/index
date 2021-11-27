import { DataSource } from "apollo-datasource";
import {
  Series,
  SeriesUpdateAttributes,
  SeriesCreateAttributes,
} from "@/models/series";
import { v4 as uuidv4 } from "uuid";
import { Timestamp } from "firebase-admin/firestore";
import { ContextBase } from "@/types/datasources";
import { CollectionReference } from "firebase-admin/firestore";

/** An API to retrieve data from the series collection */
export default class SeriesAPI extends DataSource<ContextBase> {
  /** The {@link Series} collection reference */
  private collectionRef: CollectionReference<Series>;

  /**
   * Create the API instance.
   * @param {CollectionReference<Series>} collectionRef - A reference to the series collection.
   */
  constructor(collectionRef: CollectionReference) {
    super();
    this.collectionRef = collectionRef as CollectionReference<Series>;
  }

  /**
   * Find some series
   * @async
   * @returns {Promise<Series[]>} An array of series
   */
  public async findSome(): Promise<Series[]> {
    return this.collectionRef
      .orderBy("createdAt")
      .get()
      .then((snapshot) => snapshot.docs.map((doc) => doc.data()));
  }

  /**
   * Create a new series
   * @async
   * @param series - The new series
   * @returns An object of the new series
   */
  public async create(
    series: SeriesCreateAttributes
  ): Promise<Series | undefined> {
    const newId = uuidv4();
    const newDocRef = this.collectionRef.doc(newId);
    await newDocRef.create({
      ...series,
      id: newId,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return newDocRef.get().then((snapshot) => snapshot.data());
  }
}
