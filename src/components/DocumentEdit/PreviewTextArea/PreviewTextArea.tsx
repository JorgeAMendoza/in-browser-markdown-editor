import markdownIt from 'markdown-it';
import resizeIcon from '../../../assets/icon-resize.svg';
import ReactHtmlParser from 'react-html-parser';
import { PreviewTextAreaProps } from '../../../types/prop-types';

const md = new markdownIt();

const PreviewTextArea = ({ markdownText }: PreviewTextAreaProps) => {
  const html = md.render(markdownText);
  return (
    <section>
      <div>
        <h1>preview</h1>
        <div>
          <img src={resizeIcon} />
        </div>
      </div>
      <div>{ReactHtmlParser(html)}</div>
    </section>
  );
};

export default PreviewTextArea;
