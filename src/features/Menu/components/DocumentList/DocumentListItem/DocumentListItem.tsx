import fileIcon from '@assets/icon-document.svg';
import {
  displayModal,
  changeDocument,
  applyTargetDoc,
} from '@/redux/document-reducer';
import { SavedDocument } from '@/types/saved-document';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import DocumentListItemStyled, {
  ListItemInfo,
} from './DocumentListItem.styled';

interface DocumentListItemProps {
  documentDate: string;
  documentTitle: string;
}

const DocumentListItem = ({
  documentDate,
  documentTitle,
}: DocumentListItemProps) => {
  const dispatch = useAppDispatch();
  const { document } = useAppSelector((state) => state);
  const switchDocument = () => {
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown) {
      return;
    }

    if (!document) {
      const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
      if (!savedMarkdownObject[documentTitle]) {
        return;
      }

      dispatch(
        changeDocument(
          documentTitle,
          savedMarkdownObject[documentTitle].documentMarkdown
        )
      );
      return;
    } else {
      dispatch(applyTargetDoc(documentTitle));
      dispatch(displayModal('switch'));
    }
  };

  return (
    <DocumentListItemStyled tabIndex={0} onClick={switchDocument}>
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
