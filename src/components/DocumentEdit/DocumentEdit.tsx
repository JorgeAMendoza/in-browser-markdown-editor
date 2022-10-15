import { useAppSelector } from '../../util/hooks';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';
import DocumentEditStyled from './DocumentEdit.styled';

const DocumentEdit = () => {
  const documentState = useAppSelector((state) => state);

  // if null, eventually return component that renders message.
  if (!documentState) return null;
  return (
    <DocumentEditStyled>
      <MarkdownTextArea />
      <PreviewTextArea />
    </DocumentEditStyled>
  );
};

export default DocumentEdit;
