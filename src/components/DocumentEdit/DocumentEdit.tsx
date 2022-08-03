import { useState } from 'react';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';

const DocumentEdit = () => {
  const [markdownText, setMarkdownText] = useState('');
  return (
    <main>
      <MarkdownTextArea setMarkdownText={setMarkdownText} />
      <PreviewTextArea markdownText={markdownText} />
    </main>
  );
};

export default DocumentEdit;

// we are going to add ways to goggle view and all that, but this will be the base structure
