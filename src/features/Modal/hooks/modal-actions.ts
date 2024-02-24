import { useAppSelector, useAppDispatch } from '@/hooks/redux-hooks';
import { useCallback } from 'react';
import {
  removeTargetDoc,
  changeDocument,
  removeModal,
  saveDocumentInformation,
  setNewDocument,
  deleteDocument,
  displayModal,
} from '@/redux/document-reducer';
import type { SavedDocument } from '@/types/saved-document';
import createSaveDate from '@/utils/create-save-date';

export const useModalAction = () => {
  const { targetSwitch, document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const confirmSwitch = useCallback(() => {
    const targetDocumentTitle = targetSwitch;
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown || !targetDocumentTitle) return;

    const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;

    if (!savedMarkdownObject[targetDocumentTitle]) {
      dispatch(removeTargetDoc());
      dispatch(removeModal());
      return;
    } else {
      dispatch(
        changeDocument(
          targetDocumentTitle,
          savedMarkdownObject[targetDocumentTitle].documentMarkdown
        )
      );
    }
    dispatch(removeTargetDoc());
    dispatch(removeModal());
  }, [document]);

  const confirmOverwrite = useCallback(() => {
    if (!document) return;
    const isNewDocument = document.isNewDocument;
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown) return;
    const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;

    if (isNewDocument) {
      savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
        document.documentMarkdown;
      savedMarkdownObject[document.currentDocumentTitle].date = createSaveDate(
        new Date()
      );
      dispatch(saveDocumentInformation());
    } else {
      delete savedMarkdownObject[document.originalDocumentTitle];
      savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
        document.documentMarkdown;
      savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
        createSaveDate(new Date());
      dispatch(saveDocumentInformation());
    }

    localStorage.setItem('savedMarkdown', JSON.stringify(savedMarkdownObject));
    dispatch(removeModal());
    window.dispatchEvent(new Event('storage'));
  }, [document]);

  const confirmDiscard = useCallback(() => {
    dispatch(setNewDocument());
    dispatch(removeModal());
  }, []);

  const confirmDelete = useCallback(() => {
    if (!document) return;

    if (document.isNewDocument) {
      dispatch(deleteDocument());
      return;
    }

    const savedDocuments = localStorage.getItem('savedMarkdown');
    if (!savedDocuments) {
      dispatch(removeModal());
      dispatch(deleteDocument());
      return;
    }
    const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
    delete savedDocumentsObject[document.originalDocumentTitle];
    localStorage.setItem('savedMarkdown', JSON.stringify(savedDocumentsObject));

    dispatch(removeModal());
    dispatch(deleteDocument());
    window.dispatchEvent(new Event('storage'));
  }, [document]);

  const renderNewDoc = useCallback(() => {
    if (!document) {
      dispatch(setNewDocument());
      return;
    } else if (document.isNewDocument)
      dispatch(
        displayModal(
          `do you want to discard the document ${document.currentDocumentTitle}? This cannot be reversed.`,
          'Discard new document',
          'discard'
        )
      );
    else
      dispatch(
        displayModal(
          `do you want to discard any changes made to ${
            document?.currentDocumentTitle || ''
          }? This cannot be reversed.`,
          'Discard changes',
          'discard'
        )
      );
  }, [document]);

  return {
    switch: confirmSwitch,
    overwrite: confirmOverwrite,
    discard: confirmDiscard,
    delete: confirmDelete,
    newDoc: renderNewDoc,
  };
};
