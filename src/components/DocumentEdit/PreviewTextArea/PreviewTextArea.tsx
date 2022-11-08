import markdownIt from 'markdown-it';
import showPreviewIcon from '../../../assets/icon-show-preview.svg';
import ReactHtmlParser from 'react-html-parser';
import { useAppSelector } from '../../../util/hooks';
import PreviewTextAreaStyled, { PreviewText } from './PreviewTextArea.styled';

interface PreviewTextAreaProps {
  adjustPreview: () => void;
}

const md = new markdownIt();

const PreviewTextArea = ({ adjustPreview }: PreviewTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const html = md.render(documentState.document?.documentMarkdown || '');

  return (
    <PreviewTextAreaStyled>
      <div>
        <h1>preview</h1>
        <button onClick={adjustPreview}>
          <img src={showPreviewIcon} />
        </button>
      </div>
      <PreviewText data-testid="previewTextArea">
        {ReactHtmlParser(html)}
      </PreviewText>
    </PreviewTextAreaStyled>
  );
};

export default PreviewTextArea;
