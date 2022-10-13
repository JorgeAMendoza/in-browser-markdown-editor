import DocumentList from '../DocumentList/DocumentList';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MenuStyled from './Menu.styled';
const Menu = () => {
  return (
    <MenuStyled>
      <h2>my documents</h2>
      <button>+ new document</button>

      <DocumentList />
      <ThemeToggle />
    </MenuStyled>
  );
};

export default Menu;
