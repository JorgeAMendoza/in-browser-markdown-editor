interface MarkdownTextAreaProps {
  setMarkdownText: React.Dispatch<string>;
}

const MarkdownTextArea = ({ setMarkdownText }: MarkdownTextAreaProps) => {
  return (
    <section>
      <div>
        <h1>markdown</h1>
      </div>

      <div>
        <textarea
          onChange={(e) => setMarkdownText(e.target.value)}
          onBlur={(e) => setMarkdownText(e.target.value)}
        />
      </div>
    </section>
  );
};

export default MarkdownTextArea;
