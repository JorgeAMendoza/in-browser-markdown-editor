import fileIcon from '../../../assets/file-icon.svg';

const DocumentListItem = () => {
  return (
    <li>
      <div>
        <img src={fileIcon} alt="file icon" />
      </div>
      <div>
        <p>document</p>
        <p>document-name.md</p>
      </div>
    </li>
  );
};

export default DocumentListItem;
