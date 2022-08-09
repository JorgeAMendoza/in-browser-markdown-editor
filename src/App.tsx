import { useEffect, useState } from 'react';
import Menu from './components/Menu/Menu';
import TopBar from './components/TopBar/TopBar';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import welcomeMarkdownText from './util/welcome-markdown';

function App() {
  const [documentMarkdown, setDocumentMarkdown] = useState('');
  const [documentTitle, setDocumentTitle] = useState('');
  const [isNewDocument, setIsNewDocument] = useState(true);

  useEffect(() => {
    setDocumentMarkdown(welcomeMarkdownText);
    setDocumentTitle('welcome.md');
  }, []);

  // possilby another use effect for saving document! local storage will be needed then

  const changeDocument = () => {
    // this funciton is going to be used to change the method
  };
  return (
    <div>
      <TopBar />
      <Menu />
      <DocumentEdit
        markdownText={documentMarkdown}
        setMarkdownText={setDocumentMarkdown}
      />
    </div>
  );
}

export default App;
