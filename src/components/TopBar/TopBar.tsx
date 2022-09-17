import menuIcon from '../../assets/icon-menu.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { useAppSelector } from '../../util/hooks';
import { useEffect, useState } from 'react';
import { SavedDocument } from '../../types/saved-document';

// TopBar is in charge of saving the documnet (takes in the save document), and changing the document title.
// so if a user changes the document title, does this change the local storage immediatly? or should we just set it as a new document? I think the new document may be better, so if the user changes teh title, then the new document state needs to chagne as well.

const TopBar = () => {
  const [documentTitle, setDocumentTitle] = useState('');
  const documentState = useAppSelector((state) => state);

  useEffect(() => {
    if (!documentState) {
      setDocumentTitle('');
      return;
    }
    setDocumentTitle(documentState?.currentDocumentTitle);
  }, [documentState?.currentDocumentTitle]);

  const saveDocument = () => {
    const savedDocuments = localStorage.getItem('savedMarkdown');

    console.log('saving the document');
    // now we have access to the document title
    // now we have access to the document content

    // lets

    // SAVING a document with nothing in local storage,
    // we need access to local storage as well, but we can just grab it from here

    // ANYTIME WE SAVE
    // check if the current document name is valid, for now let it go
    // TODO: CHECK DOCUMENT NAME

    if (!savedDocuments)
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify({
          [documentTitle]: documentState?.documentMarkdown,
        })
      );
    else if (savedDocuments && documentState?.isNewDocument) {
      const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
      if (documentTitle in savedDocumentsObject)
        console.log('duplicate document found');
      else savedDocumentsObject[documentTitle] = documentState.documentMarkdown;
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify(savedDocumentsObject)
      );
    } else if (savedDocuments && !documentState?.isNewDocument) {
      // if the current doucment name matches the one that is in the context, then save
      // if the current document name is one that is already in local storge, ask to ovwrite 
      // if yes, 
    }
  };

  const deleteDocument = () => {
    console.log('deleting the document');
  };
  // so it makes sense here for a local state becuase the title will only be modified here, it only needs to be checked here, the document edit should only be worried about the content, here the title really matters
  // we also need to account for when we have the wrong type of title, dont worry about duplicate for now, I wnat to ensure that we get the format right and we check for it,
  // remember I said not to make that check until the save.
  // next time, apply the local state for hte title,
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
          <div>
            <p>document name</p>
            <input
              type="text"
              value={documentTitle}
              onChange={({ target }) => setDocumentTitle(target.value)}
              onBlur={({ target }) => setDocumentTitle(target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button onClick={deleteDocument}>
          <img src={deleteIcon} alt="Click to delete the document" />
        </button>
        <button onClick={() => saveDocument()}>
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
