import { useState } from 'react';
import { useAppSelector } from '@/hooks/redux-hooks';
import { MarkdownTextArea } from '../MarkdownTextArea';
import { PreviewTextArea } from '../PreviewTextArea';
import DocumentEditStyled, { NoDocumentContainer } from './DocumentEdit.styled';
import DocumentIcon from '@/components/Icons/DocumentIcon';

export const DocumentEdit = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { document } = useAppSelector((state) => state);

  const adjustPreview = () => {
    if (showPreview) setShowPreview(false);
    else setShowPreview(true);
  };

  return (
    <DocumentEditStyled data-fullpreview={showPreview}>
      {document ? (
        <>
          <MarkdownTextArea adjustPreview={adjustPreview} />
          <PreviewTextArea
            adjustPreview={adjustPreview}
            fullPreview={showPreview}
          />
        </>
      ) : (
        <NoDocumentContainer>
          <p>Open a saved document or create a new document!</p>
          <div>
            <DocumentIcon />
          </div>
        </NoDocumentContainer>
      )}
    </DocumentEditStyled>
  );
};
