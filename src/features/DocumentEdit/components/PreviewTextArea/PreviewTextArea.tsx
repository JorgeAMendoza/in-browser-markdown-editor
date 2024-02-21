import showPreviewIcon from '@assets/icon-show-preview.svg';
import { marked } from 'marked';
import { useAppSelector } from '@/hooks/redux-hooks';
import PreviewTextAreaStyled, { PreviewText } from './PreviewTextArea.styled';
import DOMPurify from 'dompurify';

interface PreviewTextAreaProps {
  adjustPreview: () => void;
  fullPreview: boolean;
}

export const PreviewTextArea = ({
  adjustPreview,
  fullPreview,
}: PreviewTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const html = marked.parse(documentState.document?.documentMarkdown || '');

  return (
    <PreviewTextAreaStyled data-fullpreview={fullPreview}>
      <div>
        <h1>preview</h1>
        <button onClick={adjustPreview} aria-label="toggle full screen preview">
          <img src={showPreviewIcon} alt="" />
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
