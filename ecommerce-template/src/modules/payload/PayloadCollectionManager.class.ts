export enum PayloadCollectionFilterKeys {
  COLLECTION_ID = "collection_id",
  PRODUCT_ID = "product_id",
}

export type PayloadCollectionFilter = Record<
  string | PayloadCollectionFilterKeys,
  string | string[]
>;

export class PayloadCollectionManager {
  private readonly filterKey: PayloadCollectionFilterKeys;
  private readonly collectionMap: PayloadCollectionFilter;

  constructor(collectionMap: PayloadCollectionFilter) {
    this.filterKey = this.parseFilterKey(collectionMap);
    this.collectionMap = collectionMap;
  }

  private parseFilterKey(collectionMap: PayloadCollectionFilter) {
    if (PayloadCollectionFilterKeys.COLLECTION_ID in collectionMap) {
      return PayloadCollectionFilterKeys.COLLECTION_ID;
    } else if (PayloadCollectionFilterKeys.PRODUCT_ID in collectionMap) {
      return PayloadCollectionFilterKeys.PRODUCT_ID;
    }

    throw new Error("Invalid filter key.");
  }

  getFilterKey() {
    return this.filterKey;
  }

  getCollectionName() {
    if (this.filterKey === PayloadCollectionFilterKeys.COLLECTION_ID) {
      return "collections";
    } else if (this.filterKey === PayloadCollectionFilterKeys.PRODUCT_ID) {
      return "products";
    }

    return "unknown";
  }

  getCollectionIds() {
    const ids = this.collectionMap[this.filterKey];
    return Array.isArray(ids) ? ids : [ids];
  }
}
