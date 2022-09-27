import { useEffect, useState } from 'react';
import menuIcon from '../../assets/icon-menu.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { SavedDocument } from '../../types/saved-document';
import { updateCurrentDocumentTitle } from '../../redux/document-reducer';

// TopBar is in charge of saving the documnet (takes in the save document), and changing the document title.
// so if a user changes the document title, does this change the local storage immediatly? or should we just set it as a new document? I think the new document may be better, so if the user changes teh title, then the new document state needs to chagne as well.

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
    const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]\.md$/;
    if (!documentState) return;

    if (!validDocumentTitle.test(documentState.currentDocumentTitle)) {
      console.log('invalid document title');
      return;
    }
    console.log('saving the document');
    // now we have access to the document title
    // now we have access to the document content

    // lets

    // SAVING a document with nothing in local storage,
    // we need access to local storage as well, but we can just grab it from here

    if (!savedDocuments)
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify({
          [documentState.currentDocumentTitle]: documentState.documentMarkdown,
        })
      );
    else if (documentState.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (documentState.currentDocumentTitle in savedDocumentsObject)
        console.log('duplicate document found');
      else
        savedDocumentsObject[documentState.currentDocumentTitle] =
          documentState.documentMarkdown;
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify(savedDocumentsObject)
      );
    } else if (!documentState.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      // so first one, if the names were the same, then just simply save.
      if (
        documentState.originalDocumentTitle ===
        documentState.currentDocumentTitle
      )
        savedDocumentsObject[documentState.originalDocumentTitle] =
          documentState.documentMarkdown;
      else if (documentState.currentDocumentTitle in savedDocumentsObject) {
        // here the new title we gave our document is somethign that already exist in local storage.
        // we need prompt here to either ask to ovewrite the other document, or just cancel.
        // note that overwriting here is a bit differnet, since if we just save over the conflicted one, the "original" one will still be there,
        // what we need to do is overwrit ethe conflic, but then delete the original document name as well.
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
