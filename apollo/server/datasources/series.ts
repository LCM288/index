/**
 * @packageDocumentation
 * @module Series
 */

import { DataSource } from "apollo-datasource";
import { Series } from "@/models/series";
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
  public async create(series: Series): Promise<Series | undefined> {
    const newDocRef = this.collectionRef.doc(series.id);
    await newDocRef.create(series);
    return newDocRef.get().then((snapshot) => snapshot.data());
  }
}
