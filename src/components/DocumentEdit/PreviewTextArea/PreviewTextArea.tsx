import resizeIcon from '../../../assets/icon-resize.svg';

const PreviewTextArea = () => {
  return (
    <section>
      <div>
        <h1>preview</h1>
        <div>
          <img src={resizeIcon} />
        </div>
      </div>
      <div>{/* markdown text area turned into action markdown here */}</div>
    </section>
  );
};

export default PreviewTextArea;
