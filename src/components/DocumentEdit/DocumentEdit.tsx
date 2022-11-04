import { useState } from 'react';
import { useAppSelector } from '../../util/hooks';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';
import DocumentEditStyled from './DocumentEdit.styled';

const DocumentEdit = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { document } = useAppSelector((state) => state);

  // if null, eventually return component that renders message.
  return (
    <DocumentEditStyled>
      {document ? (
        <>
          <MarkdownTextArea />
          <PreviewTextArea />
        </>
      ) : (
        <p>Open a saved document or create a new document!</p>
      )}
    </DocumentEditStyled>
  );
};

export default DocumentEdit;
