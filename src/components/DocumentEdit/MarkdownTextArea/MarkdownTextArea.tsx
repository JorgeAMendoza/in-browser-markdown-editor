import { useAppDispatch, useAppSelector } from '../../../util/hooks';
import { updateMarkdown } from '../../../redux/document-reducer';

const MarkdownTextArea = () => {
  const documentState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <section>
      <div>
        <h1>markdown</h1>
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
    </section>
  );
};

export default MarkdownTextArea;
