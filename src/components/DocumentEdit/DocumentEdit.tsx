import { useAppSelector } from '../../util/hooks';
import MarkdownTextArea from './MarkdownTextArea/MarkdownTextArea';
import PreviewTextArea from './PreviewTextArea/PreviewTextArea';

const DocumentEdit = () => {
  const documentState = useAppSelector((state) => state);

  // if null, eventually return component that renders message.
  if (!documentState) return null;
  return (
    <main>
      <MarkdownTextArea />
      <PreviewTextArea />
    </main>
  );
};

export default DocumentEdit;
