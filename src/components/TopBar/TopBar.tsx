import { useEffect, useState } from 'react';
import menuIcon from '../../assets/icon-menu.svg';
import closeMenuIcon from '../../assets/icon-close.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { SavedDocument } from '../../types/saved-document';
import {
  updateCurrentDocumentTitle,
  saveDocumentInformation,
  displayModal,
} from '../../redux/document-reducer';
import TopBarStyled from './TopBar.styled';
import createSaveDate from '../../util/creat-save-date';

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
    } else if (document.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (document.currentDocumentTitle in savedDocumentsObject)
        dispatch(displayModal('overwrite'));
      else {
        savedDocumentsObject[document.currentDocumentTitle].documentMarkdown =
          document.documentMarkdown;
        savedDocumentsObject[document.currentDocumentTitle].date =
          createSaveDate(new Date());
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation());
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
      } else {
        if (!(document.currentDocumentTitle in savedDocumentsObject)) {
          savedDocumentsObject[document.currentDocumentTitle].documentMarkdown =
            document.documentMarkdown;
          savedDocumentsObject[document.currentDocumentTitle].date =
            createSaveDate(new Date());
          delete savedDocumentsObject[document.originalDocumentTitle];
          localStorage.setItem(
            'savedMarkdown',
            JSON.stringify(savedDocumentsObject)
          );
          dispatch(saveDocumentInformation());
        } else {
          console.log('conflict with changed name found');
        }
      }
    }
  };

  const deleteDocument = () => {
    dispatch(displayModal('delete'));
  };
  return (
    <TopBarStyled>
      <div>
        <div>
          <button
            data-testid="menuButton"
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
        </div>

        <div>
          <img src={logoIcon} alt="Logo Icon" />
        </div>

        <div>
          <div>
            <img src={documentIcon} alt="Document icon" />
          </div>
          {!document ? null : (
            <div>
              <p>document name</p>
              <input
                data-testid="documentName"
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
          )}
        </div>
      </div>

      <div>
        <button disabled={disableAction} onClick={deleteDocument}>
          <img src={deleteIcon} alt="Click to delete the document" />
        </button>
        <button
          disabled={disableAction}
          data-testid="saveDocumentButton"
          onClick={() => saveDocument()}
        >
          <div>
            <img src={saveIcon} alt="Save the document" />
            <p>save changes</p>
          </div>
        </button>
      </div>
    </TopBarStyled>
  );
};

export default TopBar;
