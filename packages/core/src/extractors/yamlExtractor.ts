import * as yaml from "js-yaml";
import { IDocument, IExtractor } from "../interfaces.js";

export class YamlExtractor<T extends IDocument> implements IExtractor<T> {
  private fileContent: string;

  constructor(fileContent: string) {
    this.fileContent = fileContent;
  }

  public extractData(): T {
    return yaml.load(this.fileContent) as T;
  }
}

export default function yamlExtractorFactory<T extends IDocument>(
  fileContent: string
): YamlExtractor<T> {
  return new YamlExtractor<T>(fileContent);
}
