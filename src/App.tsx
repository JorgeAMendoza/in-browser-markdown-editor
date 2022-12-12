import { useEffect, useState } from 'react';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import { useAppDispatch, useAppSelector } from './utils/redux-hooks';
import { ThemeProvider } from 'styled-components';
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
import AppStyled, { DocumentEditContainer } from './App.styled';
import createSaveDate from './utils/create-save-date';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/Global.styled';
import { Button } from './styles/utils/Button.styled';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
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
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else setTheme('light');
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
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <AppStyled menuVisible={showMenu}>
          {showDeleteModal && (
            <Modal
              showMenu={showMenu}
              title="Delete document"
              message="Are you sure you want to delete the current document and its contents? This action cannot be reversed."
            >
              <Button onClick={() => dispatch(removeModal('delete'))}>
                Cancel
              </Button>
              <Button onClick={confirmDelete}>Confirm & Delete</Button>
            </Modal>
          )}

          {showOverwriteModal && (
            <Modal
              showMenu={showMenu}
              title="Duplicate document"
              message={`Document ${
                document?.currentDocumentTitle || ''
              } will have its contents overwritten. This action cannnot be reversed.`}
            >
              <Button onClick={() => dispatch(removeModal('overwrite'))}>
                Cancel
              </Button>
              <Button onClick={confirmOverwrite}>Confirm</Button>
            </Modal>
          )}

          {showTitleModal && (
            <Modal
              showMenu={showMenu}
              title="Invalid document name"
              message={`The document title ${
                document?.currentDocumentTitle || ''
              } is invalid, please enter a valid document name`}
            >
              <Button onClick={() => dispatch(removeModal('title'))}>OK</Button>
            </Modal>
          )}

          {showDiscardNewModal && (
            <Modal
              showMenu={showMenu}
              title="Discard new document"
              message={`do you want to discard the document ${
                document?.currentDocumentTitle || ''
              }? This cannot be reversed.`}
            >
              <Button onClick={() => dispatch(removeModal('discardNew'))}>
                Cancel
              </Button>
              <Button onClick={confirmDiscard}>Confirm</Button>
            </Modal>
          )}

          {showDiscardSavedModal && (
            <Modal
              showMenu={showMenu}
              title="Discard changes"
              message={`do you want to discard any changes made to ${
                document?.currentDocumentTitle || ''
              }? This cannot be reversed.`}
            >
              <Button onClick={() => dispatch(removeModal('discardSaved'))}>
                Cancel
              </Button>
              <Button onClick={confirmDiscard}>Confirm</Button>
            </Modal>
          )}

          {showSwitchModal && (
            <Modal
              showMenu={showMenu}
              title={
                document?.isNewDocument
                  ? 'Discard new document'
                  : 'Discard changes'
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
              <Button onClick={() => dispatch(removeModal('switch'))}>
                Cancel
              </Button>
              <Button onClick={confirmSwitch}>Confirm</Button>
            </Modal>
          )}
          <Menu showMenu={showMenu} setTheme={setTheme} theme={theme} />
          <DocumentEditContainer>
            <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
            <DocumentEdit />
          </DocumentEditContainer>
        </AppStyled>
      </ThemeProvider>
    </>
  );
}

export default App;
