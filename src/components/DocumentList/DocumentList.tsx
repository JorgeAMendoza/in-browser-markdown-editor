import { useEffect, useState } from 'react';
import DocumentListItem from './DocumentListItem/DocumentListItem';
import { SavedDocument } from '../../types/saved-document';

const DocumentList = () => {
  const [docList, setDocList] = useState<SavedDocument>({});

  useEffect(() => {
    console.log('firing effect');
    const checkLocalStorage = () => {
      const savedMarkdown = localStorage.getItem('savedMarkdown');
      if (savedMarkdown) {
        const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
        console.log(savedMarkdownObject);
        setDocList(savedMarkdownObject);
      }
    };

    checkLocalStorage();

    window.addEventListener('storage', checkLocalStorage);

    return () => {
      window.removeEventListener('storage', checkLocalStorage);
    };
  }, []);

  if (Object.keys(docList).length === 0)
    return (
      <div>
        <p>No Documents</p>
      </div>
    );

  return (
    <ul data-testid="documentList">
      {Object.keys(docList).map((doc) => (
        <DocumentListItem
          key={doc}
          documentDate={docList[doc].date}
          documentTitle={doc}
        />
      ))}
    </ul>
  );
};

export default DocumentList;
