import menuIcon from '../../assets/icon-menu.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/icon-document.svg';
import deleteIcon from '../../assets/icon-delete.svg';
import saveIcon from '../../assets/icon-save.svg';
import { TopBarProps } from '../../types/prop-types';

// TopBar is in charge of saving the documnet (takes in the save document), and changing the document title.
// so if a user changes the document title, does this change the local storage immediatly? or should we just set it as a new document? I think the new document may be better, so if the user changes teh title, then the new document state needs to chagne as well.

const TopBar = ({
  documentTitle,
  setDocumentTitle,
  saveDocument,
}: TopBarProps) => {
  return (
    <header>
      <div>
        <div>
          <button>
            <img src={menuIcon} alt="Menu Icon" />
          </button>
        </div>

        <div>
          <img src={logoIcon} alt="Logo Icon" />
        </div>

        <div>
          <div>
            <img src={documentIcon} alt="Document icon" />
          </div>
          <div>
            <p>document name</p>
            <input
              type="text"
              value={documentTitle}
              onChange={({ target }) => setDocumentTitle(target.value)}
              onBlur={({ target }) => setDocumentTitle(target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <img src={deleteIcon} alt="Click to delete the document" />
        </div>
        <button onClick={() => saveDocument()}>
          <div>
            <img src={saveIcon} alt="Save the document" />
            <p>save changes</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
