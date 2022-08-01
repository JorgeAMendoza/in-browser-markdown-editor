import DocumentList from '../DocumentList/DocumentList';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
const Menu = () => {
  return (
    <section>
      <h2>my documents</h2>
      <button>+ new document</button>

      <DocumentList />
      <ThemeToggle />
    </section>
  );
};

export default Menu;
