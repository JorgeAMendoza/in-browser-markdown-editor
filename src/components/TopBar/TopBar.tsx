import menuIcon from '../../assets/icon-menu.svg';
import logoIcon from '../../assets/logo.svg';
import documentIcon from '../../assets/document-icon.svg';
import deleteIcon from '../../assets/delete-icon.svg';
import saveIcon from '../../assets/save-icon.svg';

const TopBar = () => {
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
            <input type="text" value="welcome.md" />
          </div>
        </div>
      </div>

      <div>
        <div>
          <img src={deleteIcon} alt="Click to delete the document" />
        </div>
        <button>
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
