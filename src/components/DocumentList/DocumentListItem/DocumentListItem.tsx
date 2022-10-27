import fileIcon from '../../../assets/icon-document.svg';

interface DocumentListItemProps {
  documentDate: string;
  documentTitle: string;
}

const DocumentListItem = ({
  documentDate,
  documentTitle,
}: DocumentListItemProps) => {
  return (
    <li>
      <div>
        <img src={fileIcon} alt="file icon" />
      </div>
      <div>
        <p>{documentDate}</p>
        <h4>{documentTitle}</h4>
      </div>
    </li>
  );
};

export default DocumentListItem;
