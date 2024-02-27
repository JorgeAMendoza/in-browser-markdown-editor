import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DocumentContext from '../types/document-context';
import {
  newDocumentMarkdownText,
  welcomeMarkdownText,
} from '../utils/markdown-text';
import { AppDispatch } from './store';
import type { ModalAction } from '../types/document-context';

const initialState: DocumentContext = {
  document: {
    originalDocumentTitle: 'welcome.md',
    currentDocumentTitle: 'welcome.md',
    documentMarkdown: welcomeMarkdownText,
    isNewDocument: true,
  },
  modalAction: null,
  modalInformation: null,
  targetSwitch: null,
};

const documentContextSlice = createSlice({
  name: 'documentContext',
  initialState,
  reducers: {
    setMarkdownInformation(_state, action: PayloadAction<DocumentContext>) {
      const markdownInformation = action.payload;
      return markdownInformation;
    },
    setCurrentMarkdownTitle(state, action: PayloadAction<string>) {
      if (!state.document) return state;
      state.document.currentDocumentTitle = action.payload;
      return state;
    },
    setMarkdownContent(state, action: PayloadAction<string>) {
      if (!state.document) return state;
      state.document.documentMarkdown = action.payload;
      return state;
    },
    setNullDocument(_state) {
      return {
        document: null,
        targetSwitch: null,
        modalAction: null,
        modalInformation: null,
      };
    },
    documentSaved(state) {
      if (!state.document) return state;
      state.document.originalDocumentTitle =
        state.document.currentDocumentTitle;
      state.document.isNewDocument = false;
      return state;
    },
    showModal(
      state,
      action: PayloadAction<{
        action: ModalAction;
        message: string;
        title: string;
      }>
    ) {
      state.modalAction = action.payload.action;
      state.modalInformation = {
        title: action.payload.title,
        message: action.payload.message,
      };
      return state;
    },
    hideModal(state) {
      state.modalAction = null;
      state.modalInformation = null;
      return state;
    },
    searchDoc(state, action: PayloadAction<string | null>) {
      state.targetSwitch = action.payload;
      return state;
    },
  },
});

export const {
  setMarkdownInformation,
  setCurrentMarkdownTitle,
  setMarkdownContent,
  setNullDocument,
  documentSaved,
  hideModal,
  showModal,
  searchDoc,
} = documentContextSlice.actions;

// when a user clicks a document in the list, switch to this page (if no conflicts exist)
export const changeDocument = (
  documentTitle: string,
  documentMarkdown: string
) => {
  return (dispatch: AppDispatch) => {
    const document: DocumentContext = {
      document: {
        originalDocumentTitle: documentTitle,
        currentDocumentTitle: documentTitle,
        documentMarkdown: documentMarkdown,
        isNewDocument: false,
      },
      modalAction: null,
      modalInformation: null,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(document));
  };
};
// if user clicks new page (and accepts save or discard) then set context to new document markdown
export const setNewDocument = () => {
  return (dispatch: AppDispatch) => {
    const newMarkdown: DocumentContext = {
      document: {
        originalDocumentTitle: 'new-document.md',
        currentDocumentTitle: 'new-document.md',
        documentMarkdown: newDocumentMarkdownText,
        isNewDocument: true,
      },
      modalAction: null,
      modalInformation: null,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(newMarkdown));
  };
};

// update the origianal document title to the currnet one, should be fired off with save. (only if current document name differs from the original and there is no conflicts)
export const saveDocumentInformation = () => {
  return (dispatch: AppDispatch) => {
    dispatch(documentSaved());
  };
};

// fired when the input input is chagned, does not chagne original document name
export const updateCurrentDocumentTitle = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setCurrentMarkdownTitle(title));
  };
};

// fires when user modifies textbox contianing markdown,
export const updateMarkdown = (documentMarkdown: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setMarkdownContent(documentMarkdown));
  };
};

export const deleteDocument = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setNullDocument());
  };
};

export const displayModal = (
  modalMessage: string,
  modalTitle: string,
  modalAction: ModalAction
) => {
  return (dispatch: AppDispatch) => {
    dispatch(
      showModal({
        message: modalMessage,
        title: modalTitle,
        action: modalAction,
      })
    );
  };
};

export const removeModal = () => {
  return (dispatch: AppDispatch) => {
    dispatch(hideModal());
  };
};

export const applyTargetDoc = (documentTitle: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(searchDoc(documentTitle));
  };
};

export const removeTargetDoc = () => {
  return (dispatch: AppDispatch) => {
    dispatch(searchDoc(null));
  };
};

export default documentContextSlice.reducer;
