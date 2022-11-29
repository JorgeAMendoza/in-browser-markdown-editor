import { useState } from 'react';
import { useAppSelector } from '../../utils/redux-hooks';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';
import DocumentEditStyled from './DocumentEdit.styled';

const DocumentEdit = () => {
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
        <p>Open a saved document or create a new document!</p>
      )}
    </DocumentEditStyled>
  );
};

export default DocumentEdit;
