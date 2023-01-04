import { useEffect, useState } from 'react';
import menuIcon from '../../assets/icon-menu.svg';
import closeMenuIcon from '../../assets/icon-close.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { useAppDispatch, useAppSelector } from '../../utils/redux-hooks';
import { SavedDocument } from '../../types/saved-document';
import {
  updateCurrentDocumentTitle,
  saveDocumentInformation,
  displayModal,
} from '../../redux/document-reducer';
import TopBarStyled, {
  DocOptions,
  DocumentName,
  MarkdownLogo,
  MenuButton,
  SaveButton,
  DeleteButton,
} from './TopBar.styled';
import createSaveDate from '../../utils/create-save-date';

interface TopBarProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<boolean>;
}

const TopBar = ({ showMenu, setShowMenu }: TopBarProps) => {
  const [disableAction, setDisableAction] = useState(false);
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!document) setDisableAction(true);
    else setDisableAction(false);
  }, [document]);

  const saveDocument = () => {
    const savedDocuments = localStorage.getItem('savedMarkdown');
    const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]+\.md$/;
    if (!document) return;

    if (!validDocumentTitle.test(document.currentDocumentTitle)) {
      dispatch(displayModal('title'));
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
        dispatch(displayModal('overwrite'));
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
          dispatch(displayModal('overwrite'));
        }
      }
    }
  };

  return (
    <TopBarStyled>
      <div>
        <MenuButton>
          <button
            data-cy="menuButton"
            onClick={() => {
              if (showMenu) setShowMenu(false);
              else setShowMenu(true);
            }}
          >
            {showMenu ? (
              <img
                src={closeMenuIcon}
                alt="Close Menu Icon"
                aria-label="Close the menu"
              />
            ) : (
              <img src={menuIcon} alt="Menu Icon" aria-label="Open the menu" />
            )}
          </button>
        </MenuButton>

        <MarkdownLogo>
          <img src={logoIcon} alt="Logo Icon" />
        </MarkdownLogo>

        {!document ? null : (
          <DocumentName>
            <div>
              <img src={documentIcon} alt="Document icon" />
            </div>
            <div>
              <p>document name</p>
              <input
                data-cy="documentName"
                type="text"
                value={document?.currentDocumentTitle || ''}
                onChange={({ target }) =>
                  dispatch(updateCurrentDocumentTitle(target.value))
                }
                onBlur={({ target }) =>
                  dispatch(updateCurrentDocumentTitle(target.value))
                }
              />
            </div>
          </DocumentName>
        )}
      </div>

      <DocOptions>
        <DeleteButton
          disabled={disableAction}
          onClick={() => dispatch(displayModal('delete'))}
        >
          <img src={deleteIcon} alt="Click to delete the document" />
        </DeleteButton>
        <SaveButton
          disabled={disableAction}
          data-cy="saveDocumentButton"
          onClick={() => saveDocument()}
        >
          <div>
            <img src={saveIcon} alt="Save the document" />
          </div>
          <p>save changes</p>
        </SaveButton>
      </DocOptions>
    </TopBarStyled>
  );
};

export default TopBar;
