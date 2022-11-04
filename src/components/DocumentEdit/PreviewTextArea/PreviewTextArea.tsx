import markdownIt from 'markdown-it';
import showPreviewIcon from '../../../assets/icon-show-preview.svg';
import ReactHtmlParser from 'react-html-parser';
import { useAppSelector } from '../../../util/hooks';
import PreviewTextAreaStyled from './PreviewTextArea.styled';

const md = new markdownIt();

const PreviewTextArea = () => {
  const documentState = useAppSelector((state) => state);
  const html = md.render(documentState.document?.documentMarkdown || '');
  return (
    <PreviewTextAreaStyled>
      <div>
        <h1>preview</h1>
        <button>
          <img src={showPreviewIcon} />
        </button>
      </div>
      <div data-testid="previewTextArea">{ReactHtmlParser(html)}</div>
    </PreviewTextAreaStyled>
  );
};

export default PreviewTextArea;
