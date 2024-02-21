import { DocumentList } from '../DocumentList/';
import { ThemeToggle } from '../ThemeToggle';
import MenuStyled, { MenuDocButton, MenuLogo, MenuTitle } from './Menu.styled';
import MarkdownLogo from '@assets/logo.svg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { displayModal, setNewDocument } from '@/redux/document-reducer';

interface MenuProps {
  showMenu: boolean;
  setTheme: React.Dispatch<'light' | 'dark'>;
  theme: 'light' | 'dark';
}

export const Menu = ({ showMenu, setTheme, theme }: MenuProps) => {
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
      <MenuTitle>my documents</MenuTitle>
      <MenuDocButton onClick={newDocumentToggle} data-cy="newDocumentButton">
        + new document
      </MenuDocButton>

      <DocumentList />
      <ThemeToggle setTheme={setTheme} theme={theme} />
    </MenuStyled>
  );
};
