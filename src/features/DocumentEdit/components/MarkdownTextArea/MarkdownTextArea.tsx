import showPreviewIcon from '@assets/icon-show-preview.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { updateMarkdown } from '@/redux/document-reducer';
import MarkdownTextAreaStyled from './MarkdownTextArea.styled';

interface MarkdownTextAreaProps {
  adjustPreview: () => void;
}

export const MarkdownTextArea = ({ adjustPreview }: MarkdownTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

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
          value={documentState.document?.documentMarkdown || ''}
          onChange={(e) => dispatch(updateMarkdown(e.target.value))}
          onBlur={(e) => dispatch(updateMarkdown(e.target.value))}
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
              dispatch(updateMarkdown(textArea.value));
            }
          }}
        />
      </div>
    </MarkdownTextAreaStyled>
  );
};
