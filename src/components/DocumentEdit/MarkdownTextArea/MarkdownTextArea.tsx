import showPreviewIcon from '../../../assets/icon-show-preview.svg';
import { useAppDispatch, useAppSelector } from '../../../util/hooks';
import { updateMarkdown } from '../../../redux/document-reducer';
import MarkdownTextAreaStyled from './MarkdownTextArea.styled';

const MarkdownTextArea = () => {
  const documentState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <MarkdownTextAreaStyled>
      <div>
        <h1>markdown</h1>
        <button>
          <img src={showPreviewIcon} />
        </button>
      </div>
      <div>
        <textarea
          data-testid="markdownTextArea"
          value={documentState.document?.documentMarkdown || ''}
          onChange={(e) => dispatch(updateMarkdown(e.target.value))}
          onBlur={(e) => dispatch(updateMarkdown(e.target.value))}
          onKeyDown={(e) => {
            const textArea = e.target;
            if (e.key === 'Tab') {
              e.preventDefault();
              const start = e.target.selectionStart;
              const end = e.target.selectionEnd;

              textArea.value =
                textArea.value.substring(0, start) +
                '\t' +
                textArea.value.substring(end);

              textArea.selectionStart = start + 1;
            }
          }}
        />
      </div>
    </MarkdownTextAreaStyled>
  );
};

export default MarkdownTextArea;
