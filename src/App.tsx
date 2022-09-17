import { useEffect } from 'react';
import DocumentEdit from './components/DocumentEdit/DocumentEdit';
import { useAppDispatch } from './util/hooks';
import { initializeWelcomeMarkdown } from './redux/document-reducer';
import TopBar from './components/TopBar/TopBar';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeWelcomeMarkdown());
  }, []);
  return (
    <div>
      <TopBar />
    <DocumentEdit />
    </div>
  );
}

export default App;
