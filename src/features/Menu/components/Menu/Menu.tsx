import { DocumentList } from '../DocumentList/';
import { ThemeToggle } from '../ThemeToggle';
import MenuStyled, { MenuDocButton, MenuLogo, MenuTitle } from './Menu.styled';
import MarkdownLogo from '@assets/logo.svg';
import { useDocumentAction } from '@/hooks/document-actions';

interface MenuProps {
  showMenu: boolean;
  setTheme: React.Dispatch<'light' | 'dark'>;
  theme: 'light' | 'dark';
}

export const Menu = ({ showMenu, setTheme, theme }: MenuProps) => {
  const { newDoc } = useDocumentAction();

  return (
    <MenuStyled menuVisible={showMenu}>
      <MenuLogo>
        <img src={MarkdownLogo} alt="Markdown logo" />
      </MenuLogo>
      <MenuTitle>my documents</MenuTitle>
      <MenuDocButton onClick={newDoc} data-cy="newDocumentButton">
        + new document
      </MenuDocButton>

      <DocumentList />
      <ThemeToggle setTheme={setTheme} theme={theme} />
    </MenuStyled>
  );
};
