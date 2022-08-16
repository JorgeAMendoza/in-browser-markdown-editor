import { useState } from 'react';
import Menu from './components/Menu/Menu';
import TopBar from './components/TopBar/TopBar';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import welcomeMarkdownText from './util/welcome-markdown';
import { SavedDocument } from './types/saved-document';

function App() {
  const [documentMarkdown, setDocumentMarkdown] = useState(welcomeMarkdownText);
  const [documentTitle, setDocumentTitle] = useState('welcome.md');
  const [isNewDocument, setIsNewDocument] = useState(true);
  const [lastSavedDocument, setLastSavedDocument] = useState('');

  // possilby another use effect for saving document! local storage will be needed then

  // const changeDocument = () => {
  //   // this funciton is going to be used to change the method
  // };

  const saveDocument = () => {
    const savedDocument = localStorage.getItem('savedDocuments');
    if (isNewDocument) {
      if (savedDocument === null)
        localStorage.setItem(
          'savedDocuments',
          JSON.stringify({ [documentTitle]: documentMarkdown })
        );
      else {
        const savedDocumentObject = JSON.parse(savedDocument) as SavedDocument;

        if (savedDocumentObject[documentTitle]) {
          console.log(
            'Document already exist, need to bring up the prompt to notify the user to change or overwrite'
          );
          return;
        } else {
          savedDocumentObject[documentTitle] = documentMarkdown;
          localStorage.setItem(
            'savedDocuments',
            JSON.stringify(savedDocumentObject)
          );
        }
      }
      setLastSavedDocument(documentTitle);
      setIsNewDocument(false);
    } else {
      const savedDocumentObject = JSON.parse(
        savedDocument as string
      ) as SavedDocument;
      if (documentTitle === lastSavedDocument)
        savedDocumentObject[documentTitle] = documentMarkdown;
      else {
        delete savedDocumentObject[lastSavedDocument];
        savedDocumentObject[documentTitle] = documentMarkdown;
        setLastSavedDocument(documentTitle);
      }
      localStorage.setItem(
        'savedDocuments',
        JSON.stringify(savedDocumentObject)
      );
    }
  };
  return (
    <div>
      <TopBar
        documentTitle={documentTitle}
        setDocumentTitle={setDocumentTitle}
        saveDocument={saveDocument}
      />
      <Menu />
      <DocumentEdit
        markdownText={documentMarkdown}
        setMarkdownText={setDocumentMarkdown}
      />
    </div>
  );
}

export default App;
