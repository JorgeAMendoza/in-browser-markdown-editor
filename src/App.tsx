import { useEffect } from 'react';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import { useAppDispatch, useAppSelector } from './util/hooks';
import {
  initializeWelcomeMarkdown,
  removeModal,
  deleteDocument,
} from './redux/document-reducer';
import TopBar from './components/TopBar/TopBar';
import Modal from './components/Modal/Modal';
import { SavedDocument } from './types/saved-document';

function App() {
  const dispatch = useAppDispatch();
  const { showTitleModal, showDeleteModal, document } = useAppSelector(
    (state) => state
  );
  useEffect(() => {
    dispatch(initializeWelcomeMarkdown());
  }, []);

  const confirmDelete = () => {
    if (!document) return;

    const savedDocuments = localStorage.getItem('savedMarkdown');
    if (!savedDocuments) {
      dispatch(removeModal('delete'));
      dispatch(deleteDocument());
      return;
    }
    const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
    delete savedDocumentsObject[document.originalDocumentTitle];
    localStorage.setItem('savedMarkdown', JSON.stringify(savedDocumentsObject));

    dispatch(removeModal('delete'));
    dispatch(deleteDocument());
  };

  return (
    <div>
      {showDeleteModal && (
        <Modal
          title="delete document"
          message="Are you sure you want to delete the current document and its contents? This action cannot be reversed."
        >
          <button onClick={confirmDelete}>Confirm & Delete</button>
          <button onClick={() => dispatch(removeModal('delete'))}>
            Cancel
          </button>
        </Modal>
      )}
      {showTitleModal && (
        <Modal
          title="Invalid document name"
          message={`The document title ${
            document?.currentDocumentTitle || ''
          } is invalid, please enter a valid document name`}
        >
          <button onClick={() => dispatch(removeModal('title'))}>OK</button>
        </Modal>
      )}
      <TopBar />
      <DocumentEdit />
    </div>
  );
}

export default App;
