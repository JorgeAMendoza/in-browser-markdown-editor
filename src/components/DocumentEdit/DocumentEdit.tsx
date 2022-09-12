import { useAppSelector } from '../../util/hooks';
import { useState, useEffect } from 'react';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';

const DocumentEdit = () => {
  const [markdown, setMarkdown] = useState('');
  const documentState = useAppSelector((state) => state);

  useEffect(() => {
    if (!documentState) {
      setMarkdown('');
      return;
    }  
    setMarkdown(documentState.documentMarkdown);
  }, [documentState?.documentMarkdown]);

  if (!documentState) return null;
  return (
    <main>
      <MarkdownTextArea setMarkdownText={setMarkdown} markdownText={markdown} />
      <PreviewTextArea markdownText={markdown} />
    </main>
  );
};

export default DocumentEdit;
