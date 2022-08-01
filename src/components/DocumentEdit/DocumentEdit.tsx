import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';

const DocumentEdit = () => {
  return (
    <main>
      <MarkdownTextArea />
      <PreviewTextArea />
    </main>
  );
};

export default DocumentEdit;

// we are going to add ways to goggle view and all that, but this will be the base structure
