interface Document {
  originalDocumentTitle: string;
  documentMarkdown: string;
  currentDocumentTitle: string;
  isNewDocument: boolean;
}

type DocumentContext = Document | null;

export default DocumentContext;
