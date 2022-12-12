import { useEffect, useState } from 'react';
import DocumentListItem from './DocumentListItem/DocumentListItem';
import { SavedDocument } from '../../types/saved-document';
import DocumentListStyled from './DocumentList.styled';

const DocumentList = () => {
  const [docList, setDocList] = useState<SavedDocument>({});

  useEffect(() => {
    const checkLocalStorage = () => {
      const savedMarkdown = localStorage.getItem('savedMarkdown');
      if (savedMarkdown) {
        const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
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
    <DocumentListStyled data-cy="documentList">
      {Object.keys(docList).map((doc) => (
        <DocumentListItem
          key={doc}
          documentDate={docList[doc].date}
          documentTitle={doc}
        />
      ))}
    </DocumentListStyled>
  );
};

export default DocumentList;
