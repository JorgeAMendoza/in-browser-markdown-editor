import DocumentList from '../DocumentList/DocumentList';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MenuStyled, { MenuLogo } from './Menu.styled';
import MarkdownLogo from '../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { displayModal, setNewDocument } from '../../redux/document-reducer';

interface MenuProps {
  showMenu: boolean;
  setTheme: React.Dispatch<'light' | 'dark'>;
  theme: 'light' | 'dark';
}

const Menu = ({ showMenu, setTheme, theme }: MenuProps) => {
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const newDocumentToggle = () => {
    if (!document) dispatch(setNewDocument());
    else if (document.isNewDocument) dispatch(displayModal('discardNew'));
    else dispatch(displayModal('discardSaved'));
  };
  return (
    <MenuStyled menuVisible={showMenu}>
      <MenuLogo>
        <img src={MarkdownLogo} alt="Markdown logo" />
      </MenuLogo>
      <h2>my documents</h2>
      <button onClick={newDocumentToggle} data-testid="newDocumentButton">
        + new document
      </button>

      <DocumentList />
      <ThemeToggle setTheme={setTheme} theme={theme} />
    </MenuStyled>
  );
};

export default Menu;
