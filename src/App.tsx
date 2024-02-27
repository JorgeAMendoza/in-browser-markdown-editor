import { DocumentEdit } from '@features/DocumentEdit';
import { Menu } from '@features/Menu';
import { TopBar } from '@features/TopBar';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import AppStyled, { DocumentEditContainer } from './App.styled';
import { Modal } from './features/Modal';
import { GlobalStyles } from './styles/Global.styled';
import { darkTheme, lightTheme } from './styles/theme';
import { useAppSelector } from './hooks/redux-hooks';

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { modalInformation } = useAppSelector((state) => state);
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else setTheme('light');
  }, []);

  useEffect(() => {
    if (modalInformation === null) setShowMenu(false);
  }, [modalInformation, setShowMenu]);

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyles />
        <AppStyled menuVisible={showMenu}>
          {modalInformation && <Modal showMenu={showMenu} />}

          <Menu showMenu={showMenu} setTheme={setTheme} theme={theme} />

          <DocumentEditContainer>
            <TopBar showMenu={showMenu} setShowMenu={setShowMenu} />
            <DocumentEdit />
          </DocumentEditContainer>
        </AppStyled>
      </ThemeProvider>
    </>
  );
}

export default App;
