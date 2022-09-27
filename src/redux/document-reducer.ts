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
    setOriginalMarkdownTitle(state) {
      if (!state) return state;
      state.originalDocumentTitle = state.currentDocumentTitle;
      return state;
    },
    setCurrentMarkdownTitle(state, action: PayloadAction<string>) {
      if (!state) return state;
      state.currentDocumentTitle = action.payload;
      return state;
    },
    setMarkdownContent(state, action: PayloadAction<string>) {
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
  setOriginalMarkdownTitle,
  setCurrentMarkdownTitle,
  setMarkdownContent,
  setNullDocument,
} = documentContextSlice.actions;

export const initializeWelcomeMarkdown = () => {
  return (dispatch: AppDispatch) => {
    const welcomeMarkdown: DocumentContext = {
      originalDocumentTitle: 'welcome.md',
      currentDocumentTitle: 'welcome.md',
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
      originalDocumentTitle: documentTitle,
      currentDocumentTitle: documentTitle,
      documentMarkdown: documentMarkdown,
      isNewDocument: false,
    };
    dispatch(setMarkdownInformation(document));
  };
};

export const setNewDocument = () => {
  return (dispatch: AppDispatch) => {
    const newMarkdown: DocumentContext = {
      originalDocumentTitle: 'new-document.md',
      currentDocumentTitle: 'new-document.md',
      documentMarkdown: newDocumentMarkdownText,
      isNewDocument: true,
    };
    dispatch(setMarkdownInformation(newMarkdown));
  };
};

export const updateDocumentTitle = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setOriginalMarkdownTitle());
  };
};

export const updateCurrentDocumentTitle = (title: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setCurrentMarkdownTitle(title));
  };
};

export const saveMarkdown = (documentMarkdown: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setMarkdownContent(documentMarkdown));
  };
};

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

export default documentContextSlice.reducer;
