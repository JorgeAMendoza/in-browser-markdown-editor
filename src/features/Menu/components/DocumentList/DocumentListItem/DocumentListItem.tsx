import fileIcon from '@assets/icon-document.svg';
import DocumentListItemStyled, {
  ListItemInfo,
} from './DocumentListItem.styled';
import { useDocumentAction } from '@/hooks/document-actions';

interface DocumentListItemProps {
  documentDate: string;
  documentTitle: string;
}

const DocumentListItem = ({
  documentDate,
  documentTitle,
}: DocumentListItemProps) => {
  const { switchDoc } = useDocumentAction();

  return (
    <DocumentListItemStyled
      tabIndex={0}
      onClick={() => switchDoc(documentTitle)}
    >
      <div>
        <img src={fileIcon} alt="file icon" />
      </div>
      <ListItemInfo>
        <p>{documentDate}</p>
        <h4>{documentTitle}</h4>
      </ListItemInfo>
    </DocumentListItemStyled>
  );
};

export default DocumentListItem;
