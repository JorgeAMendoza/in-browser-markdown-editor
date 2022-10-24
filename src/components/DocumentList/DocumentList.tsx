import DocumentListItem from './DocumentListItem/DocumentListItem';

const DocumentList = () => {
  return (
    <ul data-testid="documentList">
      {/* Here we use a map function to go over all the files in the local storage */}
      <DocumentListItem />
      <DocumentListItem />
    </ul>
  );
};

export default DocumentList;
