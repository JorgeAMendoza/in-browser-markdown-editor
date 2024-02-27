import { useAppSelector, useAppDispatch } from './redux-hooks';
import { useCallback } from 'react';
import {
  setNewDocument,
  displayModal,
  changeDocument,
  applyTargetDoc,
  saveDocumentInformation,
  updateCurrentDocumentTitle,
  updateMarkdown,
} from '@/redux/document-reducer';
import type { SavedDocument } from '@/types/saved-document';
import createSaveDate from '@/utils/create-save-date';

export const useDocumentAction = () => {
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const newDoc = useCallback(() => {
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

  const switchDoc = useCallback((documentTitle: string) => {
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown) {
      return;
    }

    if (!document) {
      const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
      if (!savedMarkdownObject[documentTitle]) {
        return;
      }

      dispatch(
        changeDocument(
          documentTitle,
          savedMarkdownObject[documentTitle].documentMarkdown
        )
      );
      return;
    } else {
      dispatch(applyTargetDoc(documentTitle));
      dispatch(
        displayModal(
          `Do you want to discard the current document ${
            document.currentDocumentTitle || ''
          }?`,
          document?.isNewDocument ? 'Discard new document' : 'Discard changes',
          'switch'
        )
      );
    }
  }, [document]);

  const saveDoc = useCallback(() => {
    const savedDocuments = localStorage.getItem('savedMarkdown');
    const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]+\.md$/;
    if (!document) return;

    if (!validDocumentTitle.test(document.currentDocumentTitle)) {
      dispatch(
        displayModal(
          `The document title ${
            document?.currentDocumentTitle || ''
          } is invalid, please enter a valid document name`,
          'Invalid document title',
          'title'
        )
      );
      return;
    }

    if (!savedDocuments) {
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify({
          [document.currentDocumentTitle]: {
            documentMarkdown: document.documentMarkdown,
            date: createSaveDate(new Date()),
          },
        })
      );
      dispatch(saveDocumentInformation());
      window.dispatchEvent(new Event('storage'));
    } else if (document.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (document.currentDocumentTitle in savedDocumentsObject)
        dispatch(
          displayModal(
            `Document ${
              document?.currentDocumentTitle || ''
            } will have its contents overwritten. This action cannnot be reversed.`,
            'Duplicate document',
            'overwrite'
          )
        );
      else {
        const newSave = {
          documentMarkdown: document.documentMarkdown,
          date: createSaveDate(new Date()),
        };
        savedDocumentsObject[document.currentDocumentTitle] = newSave;
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation());
        window.dispatchEvent(new Event('storage'));
      }
    } else if (!document.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (document.originalDocumentTitle === document.currentDocumentTitle) {
        savedDocumentsObject[document.originalDocumentTitle].documentMarkdown =
          document.documentMarkdown;
        savedDocumentsObject[document.originalDocumentTitle].date =
          createSaveDate(new Date());
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation);
        window.dispatchEvent(new Event('storage'));
      } else {
        if (!(document.currentDocumentTitle in savedDocumentsObject)) {
          savedDocumentsObject[document.currentDocumentTitle] = {
            documentMarkdown: document.documentMarkdown,
            date: createSaveDate(new Date()),
          };
          delete savedDocumentsObject[document.originalDocumentTitle];
          localStorage.setItem(
            'savedMarkdown',
            JSON.stringify(savedDocumentsObject)
          );
          dispatch(saveDocumentInformation());
          window.dispatchEvent(new Event('storage'));
        } else {
          dispatch(
            displayModal(
              `Document ${
                document?.currentDocumentTitle || ''
              } will have its contents overwritten. This action cannnot be reversed.`,
              'Duplicate document',
              'overwrite'
            )
          );
        }
      }
    }
  }, [document]);

  const updateDocTitle = useCallback((title: string) => {
    dispatch(updateCurrentDocumentTitle(title));
  }, []);

  const deleteDoc = useCallback(() => {
    dispatch(
      displayModal(
        'Are you sure you want to delete the current document and its contents? This action cannot be reversed.',
        'Delete Document',
        'delete'
      )
    );
  }, []);

  const updateDoc = useCallback((markdown: string) => {
    dispatch(updateMarkdown(markdown));
  }, []);

  return {
    newDoc,
    switchDoc,
    saveDoc,
    updateDocTitle,
    deleteDoc,
    updateDoc,
  };
};
