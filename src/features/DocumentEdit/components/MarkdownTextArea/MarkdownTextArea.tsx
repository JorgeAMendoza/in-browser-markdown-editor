import showPreviewIcon from '@assets/icon-show-preview.svg';
import { useAppSelector } from '@/hooks/redux-hooks';
import MarkdownTextAreaStyled from './MarkdownTextArea.styled';
import { useDocumentAction } from '@/hooks/document-actions';

interface MarkdownTextAreaProps {
  adjustPreview: () => void;
}

export const MarkdownTextArea = ({ adjustPreview }: MarkdownTextAreaProps) => {
  const document = useAppSelector((state) => state.document);
  const { updateDoc } = useDocumentAction();

  return (
    <MarkdownTextAreaStyled>
      <div>
        <h1>markdown</h1>
        <button onClick={adjustPreview} aria-label="toggle fullscreen preview">
          <img src={showPreviewIcon} alt="" />
        </button>
      </div>
      <div>
        <textarea
          data-cy="markdownTextArea"
          value={document?.documentMarkdown || ''}
          onChange={(e) => updateDoc(e.target.value)}
          onBlur={(e) => updateDoc(e.target.value)}
          onKeyDown={(e) => {
            const textArea = e.target;
            if (!(textArea instanceof HTMLTextAreaElement)) return;
            if (e.key == 'Tab') {
              e.preventDefault();
              const start = textArea.selectionStart;
              const end = textArea.selectionEnd;

              textArea.value =
                textArea.value.substring(0, start) +
                '   ' +
                textArea.value.substring(end);

              textArea.selectionStart = textArea.selectionEnd = start + 3;
              updateDoc(textArea.value);
            }
          }}
        />
      </div>
    </MarkdownTextAreaStyled>
  );
};
