interface Document {
  currentDocumentTitle: string;
  documentMarkdown: string;
  lastDocumentTitle: null | string;
}

type DocumentContext = Document | null;

export default DocumentContext;
