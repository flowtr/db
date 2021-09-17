export interface IDocument<I = string> {
  id: I;
}

export interface IDatabase<T extends IDocument> {
  getAll: (table: string) => Promise<T[]>;
  getById: (id: T["id"], table: string) => Promise<T>;
}

export interface IExtractor<T> {
  extractData: () => T;
}
