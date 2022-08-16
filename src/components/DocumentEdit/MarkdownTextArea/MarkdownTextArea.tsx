import { MarkdownTextAreaProps } from '../../../types/prop-types';

const MarkdownTextArea = ({
  markdownText,
  setMarkdownText,
}: MarkdownTextAreaProps) => {
  return (
    <section>
      <div>
        <h1>markdown</h1>
      </div>
      <div>
        <textarea
          defaultValue={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
          onBlur={(e) => setMarkdownText(e.target.value)}
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
