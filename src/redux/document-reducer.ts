import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DocumentContext from '../types/document-context';
import {
  newDocumentMarkdownText,
  welcomeMarkdownText,
} from '../util/markdown-text';
import { AppDispatch } from './store';
import { ModalTypes } from '../types/modal-types';

const initialState: DocumentContext = {} as DocumentContext;

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
        showDeleteModal: false,
        showDiscardModal: false,
        showOverwriteModal: false,
        showTitleModal: false,
      };
    },
    documentSaved(state) {
      if (!state.document) return state;
      state.document.originalDocumentTitle =
        state.document.currentDocumentTitle;
      state.document.isNewDocument = false;
      return state;
    },
    showModal(state, action: PayloadAction<ModalTypes>) {
      switch (action.payload) {
        case 'delete': {
          state.showDeleteModal = true;
          break;
        }
        case 'discard': {
          state.showDiscardModal = true;
          break;
        }
        case 'overwrite': {
          state.showOverwriteModal = true;
          break;
        }
        case 'title': {
          state.showTitleModal = true;
          break;
        }
        default:
          return state;
      }
      return state;
    },
    hideModal(state, action: PayloadAction<ModalTypes>) {
      switch (action.payload) {
        case 'delete': {
          state.showDeleteModal = false;
          break;
        }
        case 'discard': {
          state.showDiscardModal = false;
          break;
        }
        case 'overwrite': {
          state.showOverwriteModal = false;
          break;
        }
        case 'title': {
          state.showTitleModal = false;
          break;
        }
        default:
          return state;
      }
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
} = documentContextSlice.actions;

// On page load, intialize the context with the welcome markdown content, set the title as well
export const initializeWelcomeMarkdown = () => {
  return (dispatch: AppDispatch) => {
    const welcomeMarkdown: DocumentContext = {
      document: {
        originalDocumentTitle: 'welcome.md',
        currentDocumentTitle: 'welcome.md',
        documentMarkdown: welcomeMarkdownText,
        isNewDocument: true,
      },
      showDeleteModal: false,
      showDiscardModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
    };
    dispatch(setMarkdownInformation(welcomeMarkdown));
  };
};

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
      showDeleteModal: false,
      showDiscardModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
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
      showDeleteModal: false,
      showDiscardModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
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

export const displayModal = (modalName: ModalTypes) => {
  return (dispatch: AppDispatch) => {
    dispatch(showModal(modalName));
  };
};

export const removeModal = (modalName: ModalTypes) => {
  return (dispatch: AppDispatch) => {
    dispatch(hideModal(modalName));
  };
};

export default documentContextSlice.reducer;
