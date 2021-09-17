import { IDatabase, IDocument } from "./interfaces.js";

export class Database<T extends IDocument> implements IDatabase<T> {
  private driver: IDatabase<T>;

  constructor(driver: IDatabase<T>) {
    this.driver = driver;
  }

  public getAll(table: string) {
    return this.driver.getAll(table);
  }

  public getById(id: T["id"], table: string) {
    return this.driver.getById(id, table);
  }
}

export default function databaseFactory<T extends IDocument>(
  driver: IDatabase<T>
) {
  return new Database<T>(driver);
}
