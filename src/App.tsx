import { useEffect } from 'react';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import { useAppDispatch } from './util/hooks';
import { initializeWelcomeMarkdown } from './redux/document-reducer';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeWelcomeMarkdown());
  }, []);
  return (
    <div>
      <DocumentEdit />
    </div>
  );
}

export default App;
