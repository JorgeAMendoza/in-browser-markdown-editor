import markdownIt from 'markdown-it';
import resizeIcon from '../../../assets/icon-resize.svg';
import ReactHtmlParser from 'react-html-parser';
import { useAppSelector } from '../../../util/hooks';

const md = new markdownIt();

const PreviewTextArea = () => {
  const documentState = useAppSelector((state) => state);
  const html = md.render(documentState.document?.documentMarkdown || '');
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
