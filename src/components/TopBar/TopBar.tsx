import { useEffect, useState } from 'react';
import menuIcon from '../../assets/icon-menu.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { SavedDocument } from '../../types/saved-document';
import {
  updateCurrentDocumentTitle,
  saveDocumentInformation,
} from '../../redux/document-reducer';

const TopBar = () => {
  const [disableSave, setDisableSave] = useState(false);
  const documentState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!documentState) setDisableSave(true);
    else setDisableSave(false);
  }, [documentState]);

  const saveDocument = () => {
    const savedDocuments = localStorage.getItem('savedMarkdown');
    const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]+\.md$/;
    if (!documentState) return;

    if (!validDocumentTitle.test(documentState.currentDocumentTitle)) {
      console.log('invalid document title');
      return;
    }

    if (!savedDocuments) {
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify({
          [documentState.currentDocumentTitle]: documentState.documentMarkdown,
        })
      );
      dispatch(saveDocumentInformation());
    } else if (documentState.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (documentState.currentDocumentTitle in savedDocumentsObject)
        console.log('duplicate document found');
      else {
        savedDocumentsObject[documentState.currentDocumentTitle] =
          documentState.documentMarkdown;
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation());
      }
    } else if (!documentState.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (
        documentState.originalDocumentTitle ===
        documentState.currentDocumentTitle
      ) {
        savedDocumentsObject[documentState.originalDocumentTitle] =
          documentState.documentMarkdown;
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation);
      } else {
        if (!(documentState.currentDocumentTitle in savedDocumentsObject)) {
          savedDocumentsObject[documentState.currentDocumentTitle] =
            documentState.documentMarkdown;
          delete savedDocumentsObject[documentState.originalDocumentTitle];
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
    console.log('deleting the document');
  };
  return (
    <header>
      <div>
        <div>
          <button>
            <img src={menuIcon} alt="Menu Icon" />
          </button>
        </div>

        <div>
          <img src={logoIcon} alt="Logo Icon" />
        </div>

        <div>
          <div>
            <img src={documentIcon} alt="Document icon" />
          </div>
          {!documentState ? null : (
            <div>
              <p>document name</p>
              <input
                type="text"
                value={documentState.currentDocumentTitle || ''}
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
        <button onClick={deleteDocument}>
          <img src={deleteIcon} alt="Click to delete the document" />
        </button>
        <button disabled={disableSave} onClick={() => saveDocument()}>
          <div>
            <img src={saveIcon} alt="Save the document" />
            <p>save changes</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
