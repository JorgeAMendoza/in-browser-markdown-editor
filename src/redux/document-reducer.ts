import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DocumentContext from '../types/document-context';
import {
  newDocumentMarkdownText,
  welcomeMarkdownText,
} from '../util/markdown-text';
import { AppDispatch } from './store';

const initialState: DocumentContext = {} as DocumentContext;

const documentContextSlice = createSlice({
  name: 'documentContext',
  initialState,
  reducers: {
    setMarkdownInformation(_state, action: PayloadAction<DocumentContext>) {
      const markdownInformation = action.payload;
      return markdownInformation;
    },
    setMarkdownTitle(state, action: PayloadAction<string>) {
      if (!state) return state;
      state.lastDocumentTitle = state.currentDocumentTitle;
      state.currentDocumentTitle = action.payload;
      return state;
    },
    updateMarkdownContent(state, action: PayloadAction<string>) {
      if (!state) return state;
      state.documentMarkdown = action.payload;
      return state;
    },
    setNullDocument(_state) {
      return null;
    },
  },
});

export const {
  setMarkdownInformation,
  setMarkdownTitle,
  updateMarkdownContent,
  setNullDocument,
} = documentContextSlice.actions;

export const initializeWelcomeMarkdown = () => {
  return (dispatch: AppDispatch) => {
    const welcomeMarkdown: DocumentContext = {
      currentDocumentTitle: 'welcome.md',
      lastDocumentTitle: null,
      documentMarkdown: welcomeMarkdownText,
      isNewDocument: true,
    };
    dispatch(setMarkdownInformation(welcomeMarkdown));
  };
};

export const changeDocument = (
  documentTitle: string,
  documentMarkdown: string
) => {
  return (dispatch: AppDispatch) => {
    const document: DocumentContext = {
      currentDocumentTitle: documentTitle,
      lastDocumentTitle: null,
      documentMarkdown: documentMarkdown,
      isNewDocument: false,
    };
    dispatch(setMarkdownInformation(document));
  };
};

export const setNewDocument = () => {
  return (dispatch: AppDispatch) => {
    const newMarkdown: DocumentContext = {
      currentDocumentTitle: 'new-document.md',
      lastDocumentTitle: null,
      documentMarkdown: newDocumentMarkdownText,
      isNewDocument: true,
    };
    dispatch(setMarkdownInformation(newMarkdown));
  };
};

export const updateDocumentTitle = (documentTitle: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setMarkdownTitle(documentTitle));
  };
};

export const saveMarkdown = (documentMarkdown: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateMarkdownContent(documentMarkdown));
  };
};

export const updateMarkdown = (documentMarkdown: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(updateMarkdownContent(documentMarkdown));
  };
};

export const deleteDocument = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setNullDocument());
  };
};

export default documentContextSlice.reducer;
