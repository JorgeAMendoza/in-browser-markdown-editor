import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';
import { DocumentEditProps } from '../../types/prop-types';

const DocumentEdit = ({ markdownText, setMarkdownText }: DocumentEditProps) => {
  return (
    <main>
      <MarkdownTextArea
        setMarkdownText={setMarkdownText}
        markdownText={markdownText}
      />
      <PreviewTextArea markdownText={markdownText} />
    </main>
  );
};

export default DocumentEdit;

// we are going to add ways to goggle view and all that, but this will be the base structure
