import fileIcon from '../../../assets/icon-document.svg';

const DocumentListItem = () => {
  return (
    <li>
      <div>
        <img src={fileIcon} alt="file icon" />
      </div>
      <div>
        <p>document</p>
        <h4>document-name.md</h4>
      </div>
    </li>
  );
};

export default DocumentListItem;
