import DocumentList from '../DocumentList/DocumentList';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import MenuStyled from './Menu.styled';
import { useAppDispatch, useAppSelector } from '../../util/hooks';
import { displayModal } from '../../redux/document-reducer';

interface MenuProps {
  showMenu: boolean;
}

const Menu = ({ showMenu }: MenuProps) => {
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const newDocumentToggle = () => {
    if (!document) return;
    if (document.isNewDocument) dispatch(displayModal('discardNew'));
    else dispatch(displayModal('discardSaved'));
  };
  return (
    <MenuStyled menuVisible={showMenu}>
      <h2>my documents</h2>
      <button onClick={newDocumentToggle}>+ new document</button>

      <DocumentList />
      <ThemeToggle />
    </MenuStyled>
  );
};

export default Menu;
