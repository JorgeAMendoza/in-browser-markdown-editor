import { useEffect, useState } from 'react';
import menuIcon from '@assets/icon-menu.svg';
import closeMenuIcon from '@assets/icon-close.svg';
import logoIcon from '@assets/logo.svg';
import documentIcon from '@assets/icon-document.svg';
import deleteIcon from '@assets/icon-delete.svg';
import saveIcon from '@assets/icon-save.svg';
import { useAppSelector } from '@/hooks/redux-hooks';
import TopBarStyled, {
  DocOptions,
  DocumentName,
  MarkdownLogo,
  MenuButton,
  SaveButton,
  DeleteButton,
} from './TopBar.styled';
import { useDocumentAction } from '@/hooks/document-actions';

interface TopBarProps {
  showMenu: boolean;
  setShowMenu: React.Dispatch<boolean>;
}

export const TopBar = ({ showMenu, setShowMenu }: TopBarProps) => {
  const [disableAction, setDisableAction] = useState(false);
  const { document } = useAppSelector((state) => state);
  const { saveDoc, updateDocTitle, deleteDoc } = useDocumentAction();

  useEffect(() => {
    if (!document) setDisableAction(true);
    else setDisableAction(false);
  }, [document]);

  return (
    <TopBarStyled>
      <div>
        <MenuButton>
          <button
            data-cy="menuButton"
            onClick={() => {
              if (showMenu) setShowMenu(false);
              else setShowMenu(true);
            }}
          >
            {showMenu ? (
              <img
                src={closeMenuIcon}
                alt="Close Menu Icon"
                aria-label="Close the menu"
              />
            ) : (
              <img src={menuIcon} alt="Menu Icon" aria-label="Open the menu" />
            )}
          </button>
        </MenuButton>

        <MarkdownLogo>
          <img src={logoIcon} alt="Logo Icon" />
        </MarkdownLogo>

        {!document ? null : (
          <DocumentName>
            <div>
              <img src={documentIcon} alt="Document icon" />
            </div>
            <div>
              <p>document name</p>
              <input
                data-cy="documentName"
                type="text"
                value={document?.currentDocumentTitle || ''}
                onChange={({ target }) => updateDocTitle(target.value)}
                onBlur={({ target }) => updateDocTitle(target.value)}
              />
            </div>
          </DocumentName>
        )}
      </div>

      <DocOptions>
        <DeleteButton disabled={disableAction} onClick={() => deleteDoc()}>
          <img src={deleteIcon} alt="Click to delete the document" />
        </DeleteButton>
        <SaveButton
          disabled={disableAction}
          data-cy="saveDocumentButton"
          onClick={() => saveDoc()}
        >
          <div>
            <img src={saveIcon} alt="Save the document" />
          </div>
          <p>save changes</p>
        </SaveButton>
      </DocOptions>
    </TopBarStyled>
  );
};
