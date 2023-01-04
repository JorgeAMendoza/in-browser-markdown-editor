interface DocumentInfo {
  originalDocumentTitle: string;
  documentMarkdown: string;
  currentDocumentTitle: string;
  isNewDocument: boolean;
}

interface DocumentContext {
  showDeleteModal: boolean;
  showDiscardNewModal: boolean;
  showDiscardSavedModal: boolean;
  showOverwriteModal: boolean;
  showTitleModal: boolean;
  showSwitchModal: boolean;
  targetSwitch: string | null;
  document: DocumentInfo | null;
}

export default DocumentContext;
