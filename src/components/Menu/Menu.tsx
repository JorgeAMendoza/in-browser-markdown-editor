import DocumentList from '../DocumentList/DocumentList';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MenuStyled from './Menu.styled';

interface MenuProps {
  showMenu: boolean;
}

const Menu = ({ showMenu }: MenuProps) => {
  return (
    <MenuStyled menuVisible={showMenu}>
      <h2>my documents</h2>
      <button>+ new document</button>

      <DocumentList />
      <ThemeToggle />
    </MenuStyled>
  );
};

export default Menu;
