interface DocumentInfo {
  originalDocumentTitle: string;
  documentMarkdown: string;
  currentDocumentTitle: string;
  isNewDocument: boolean;
}

interface DocumentContext {
  showDeleteModal: boolean;
  showDiscardModal: boolean;
  showOverwriteModal: boolean;
  showTitleModal: boolean;
  document: DocumentInfo | null;
}

export default DocumentContext;
