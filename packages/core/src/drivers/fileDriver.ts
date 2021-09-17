import * as fs from "fs";
import glob from "tiny-glob";
import * as path from "path";

// We're reusing the database interface.
import { IDatabase, IDocument, IExtractor } from "../interfaces.js";

export class FileDriver<T extends IDocument> implements IDatabase<T> {
  private glob: any;
  private path: any;
  private fs: any;
  private extractor: (fileContent: string) => IExtractor<T>;
  private cwd: string;

  constructor(extractor: (fileContent: string) => IExtractor<T>, cwd: string) {
    this.extractor = extractor;
    this.cwd = cwd;
  }

  public async getAll(table: string): Promise<Array<T>> {
    const globPattern = path.resolve(this.cwd, `resources/${table}/*`);
    const files = await glob(globPattern);
    const result: T[] = [];
    for await (const file of files) {
      const fileContent: string = await this.readFile(file);
      result.push(this.extractData(fileContent));
    }

    return result;
  }

  public async getById(id: T["id"], table: string): Promise<T> {
    const file = this.path.resolve(this.cwd, `resources/${table}/${id}`);
    const fileContent: string = await this.readFile(file);

    return this.extractData(fileContent);
  }

  private async readFile(file: string): Promise<string> {
    return this.fs.promises.readFile(file, `utf8`);
  }

  private extractData(fileContent: string): T {
    // The extractor is responsible for
    // extracting data from a file string.
    return this.extractor(fileContent).extractData();
  }
}

export default function fileDriverFactory<T extends IDocument>(
  extractor: (fileContent: string) => IExtractor<T>,
  cwd: string
): FileDriver<T> {
  return new FileDriver(extractor, cwd);
}
