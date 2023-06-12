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
<<<<<<< HEAD
        <button onClick={adjustPreview} aria-label="toggle full screen preview">
          <img src={showPreviewIcon} alt="" />
=======
        <button onClick={adjustPreview}>
          <img src={showPreviewIcon} />
>>>>>>> 69b235e9750ca4cbf83aad8121f024708bfd2e07
        </button>
      </div>
      <PreviewText
        data-cy="previewTextArea"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }),
        }}
      ></PreviewText>
    </PreviewTextAreaStyled>
  );
};

export default PreviewTextArea;
