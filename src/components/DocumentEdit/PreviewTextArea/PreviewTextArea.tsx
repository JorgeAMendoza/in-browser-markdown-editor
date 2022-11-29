import showPreviewIcon from '../../../assets/icon-show-preview.svg';
import { useAppSelector } from '../../../utils/redux-hooks';
import PreviewTextAreaStyled, { PreviewText } from './PreviewTextArea.styled';

interface PreviewTextAreaProps {
  adjustPreview: () => void;
  fullPreview: boolean;
}

const PreviewTextArea = ({
  adjustPreview,
  fullPreview,
}: PreviewTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  // const html = md.render(documentState.document?.documentMarkdown || '');

  return (
    <PreviewTextAreaStyled data-fullpreview={fullPreview}>
      <div>
        <h1>preview</h1>
        <button onClick={adjustPreview}>
          <img src={showPreviewIcon} />
        </button>
      </div>
      <PreviewText data-testid="previewTextArea">
        <p>some text</p>
      </PreviewText>
    </PreviewTextAreaStyled>
  );
};

export default PreviewTextArea;
