interface Document {
  currentDocumentTitle: string;
  documentMarkdown: string;
  lastDocumentTitle: null | string;
  isNewDocument: boolean;
}

type DocumentContext = Document | null;

export default DocumentContext;
