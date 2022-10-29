import { useEffect, useState } from 'react';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import { useAppDispatch, useAppSelector } from './util/hooks';
import {
  initializeWelcomeMarkdown,
  removeModal,
  deleteDocument,
  setNewDocument,
  saveDocumentInformation,
  removeTargetDoc,
  changeDocument,
} from './redux/document-reducer';
import TopBar from './components/TopBar/TopBar';
import Modal from './components/Modal/Modal';
import { SavedDocument } from './types/saved-document';
import Menu from './components/Menu/Menu';
import AppStyled from './App.styled';
import createSaveDate from './util/creat-save-date';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();
  const {
    showTitleModal,
    showDeleteModal,
    showDiscardNewModal,
    showDiscardSavedModal,
    showOverwriteModal,
    showSwitchModal,
    targetSwitch,
    document,
  } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(initializeWelcomeMarkdown());
  }, []);

  const confirmDelete = () => {
    if (!document) return;

    if (document.isNewDocument) {
      dispatch(deleteDocument());
      return;
    }

    const savedDocuments = localStorage.getItem('savedMarkdown');
    if (!savedDocuments) {
      dispatch(removeModal('delete'));
      dispatch(deleteDocument());
      setShowMenu(false);
      return;
    }
    const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
    delete savedDocumentsObject[document.originalDocumentTitle];
    localStorage.setItem('savedMarkdown', JSON.stringify(savedDocumentsObject));

    dispatch(removeModal('delete'));
    dispatch(deleteDocument());
    window.dispatchEvent(new Event('storage'));
  };

  const confirmDiscard = () => {
    dispatch(setNewDocument());
    setShowMenu(false);
  };

  const confirmOverwrite = () => {
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
    dispatch(removeModal('overwrite'));
    window.dispatchEvent(new Event('storage'));
  };

  const confirmSwitch = () => {
    const targetDocumentTitle = targetSwitch;
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown || !targetDocumentTitle) return;

    const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;

    if (!savedMarkdownObject[targetDocumentTitle]) {
      console.log(
        'the document was able to be selected, but cannot be reached for some reason'
      );
      dispatch(removeTargetDoc());
      dispatch(removeModal('switch'));
      // here we need to bring up the error modal
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
    dispatch(removeModal('switch'));
  };

  return (
    <AppStyled menuVisible={showMenu}>
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

      {showOverwriteModal && (
        <Modal title="Duplicate document" message="Document ">
          <button onClick={() => dispatch(removeModal('overwrite'))}>
            Cancel
          </button>
          <button onClick={confirmOverwrite}>Confirm & Overwrite</button>
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

      {showDiscardNewModal && (
        <Modal
          title="discard new document"
          message={`do you want to discard the document ${
            document?.currentDocumentTitle || ''
          }? This cannot be reversed.`}
        >
          <button onClick={() => dispatch(removeModal('discardNew'))}>
            cancel
          </button>
          <button onClick={confirmDiscard}>confirm</button>
        </Modal>
      )}

      {showDiscardSavedModal && (
        <Modal
          title="discard changes"
          message={`do you want to discard any changes made to ${
            document?.currentDocumentTitle || ''
          }? This cannot be reversed.`}
        >
          <button onClick={() => dispatch(removeModal('discardSaved'))}>
            cancel
          </button>
          <button onClick={confirmDiscard}>confirm</button>
        </Modal>
      )}

      {showSwitchModal && (
        <Modal
          title={
            document?.isNewDocument ? 'Discard New Document' : 'Discard Changes'
          }
          message={
            document?.isNewDocument
              ? `Do you want to discard the current document ${
                  document.currentDocumentTitle || ''
                }?`
              : `Do you want to discard the changes made to ${
                  document?.currentDocumentTitle || ''
                }?`
          }
        >
          <button onClick={() => dispatch(removeModal('switch'))}>
            Cancel
          </button>
          <button onClick={confirmSwitch}>Confirm</button>
        </Modal>
      )}
      <Menu showMenu={showMenu} />
      <div>
        <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
        <DocumentEdit />
      </div>
    </AppStyled>
  );
}

export default App;
