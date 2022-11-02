import darkIcon from '../../assets/icon-dark-mode.svg';
import lightIcon from '../../assets/icon-light-mode.svg';

interface ThemeToggleProps {
  setTheme: React.Dispatch<'light' | 'dark'>;
  theme: 'light' | 'dark';
}

const ThemeToggle = ({ setTheme, theme }: ThemeToggleProps) => {
  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
    console.log('changing theme');
  };
  return (
    <div>
      <div>
        <img src={darkIcon} alt="dark icon theme toggle" />
      </div>
      <div data-theme={theme}>
        <button
          onClick={toggleTheme}
          aria-label={`toggle theme to ${theme === 'dark' ? 'light' : 'dark'}`}
          style={{ width: '50px', height: '50px' }}
        ></button>
      </div>
      <div>
        <img src={lightIcon} alt="light icon theme toggle" />
      </div>
    </div>
  );
};

export default ThemeToggle;
