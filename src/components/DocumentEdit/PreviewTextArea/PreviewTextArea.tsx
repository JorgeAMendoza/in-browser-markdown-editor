import showPreviewIcon from '../../../assets/icon-show-preview.svg';
import { marked } from 'marked';
import { useAppSelector } from '../../../utils/redux-hooks';
import PreviewTextAreaStyled, { PreviewText } from './PreviewTextArea.styled';
import DOMPurify from 'dompurify';

interface PreviewTextAreaProps {
  adjustPreview: () => void;
  fullPreview: boolean;
}

const PreviewTextArea = ({
  adjustPreview,
  fullPreview,
}: PreviewTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const html = marked.parse(documentState.document?.documentMarkdown || '');

  return (
    <PreviewTextAreaStyled data-fullpreview={fullPreview}>
      <div>
        <h1>preview</h1>
        <button onClick={adjustPreview}>
          <img src={showPreviewIcon} />
        </button>
      </div>
      <PreviewText
        data-testid="previewTextArea"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }),
        }}
      ></PreviewText>
    </PreviewTextAreaStyled>
  );
};

export default PreviewTextArea;
