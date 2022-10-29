import fileIcon from '../../../assets/icon-document.svg';
import { displayModal } from '../../../redux/document-reducer';
import { useAppDispatch } from '../../../util/hooks';

interface DocumentListItemProps {
  documentDate: string;
  documentTitle: string;
}

const DocumentListItem = ({
  documentDate,
  documentTitle,
}: DocumentListItemProps) => {
  const dispatch = useAppDispatch();
  const switchDocument = () => {
    dispatch(displayModal('switch'));
  };

  return (
    <li tabIndex={0} onClick={switchDocument}>
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
