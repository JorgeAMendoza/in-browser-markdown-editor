import darkIcon from '../../assets/icon-dark-mode.svg';
import lightIcon from '../../assets/icon-light-mode.svg';
import lightIconActive from '../../assets/icon-light-mode-active.svg';
import darkIconActive from '../../assets/icon-dark-mode-active.svg';
import ThemeToggleStyled, { Toggle } from './ThemeToggle.styled';

interface ThemeToggleProps {
  setTheme: React.Dispatch<'light' | 'dark'>;
  theme: 'light' | 'dark';
}

const ThemeToggle = ({ setTheme, theme }: ThemeToggleProps) => {
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };
  return (
    <ThemeToggleStyled>
      <div>
        <img
          src={theme === 'dark' ? darkIconActive : darkIcon}
          alt="dark icon theme toggle"
        />
      </div>
      <div data-theme={theme}>
        <Toggle
          onClick={toggleTheme}
          aria-label={`toggle theme to ${theme === 'dark' ? 'light' : 'dark'}`}
          style={{ width: '50px', height: '50px' }}
          data-toggle={theme}
        ></Toggle>
      </div>
      <div>
        <img
          src={theme === 'light' ? lightIconActive : lightIcon}
          alt="light icon theme toggle"
        />
      </div>
    </ThemeToggleStyled>
  );
};

export default ThemeToggle;
