interface DocumentInfo {
  originalDocumentTitle: string;
  documentMarkdown: string;
  currentDocumentTitle: string;
  isNewDocument: boolean;
}

export type ModalAction =
  | 'delete'
  | 'discard'
  | 'overwrite'
  | 'title'
  | 'switch'
  | null;

interface DocumentContext {
  modalInformation: {
    title: string;
    message: string;
  } | null;
  modalAction: ModalAction;
  targetSwitch: string | null;
  document: DocumentInfo | null;
}

export default DocumentContext;
