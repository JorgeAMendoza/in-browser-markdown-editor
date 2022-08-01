import darkIcon from '../../assets/icon-dark.svg';
import lightIcon from '../../assets/icon-light.svg';

const ThemeToggle = () => {
  return (
    <div>
      <label htmlFor="darkTheme">
        <img src={darkIcon} alt="dark icon theme toggle" />
      </label>
      <div>
        <input
          aria-label="toggle dark theme"
          type="radio"
          id="darkTheme"
          name="theme-select"
        />
        <input
          aria-label="toggle light theme"
          type="radio"
          id="lightTheme"
          name="theme-select"
        />
      </div>
      <label htmlFor="lightTheme">
        <img src={lightIcon} alt="light icon theme toggle" />
      </label>
    </div>
  );
};

export default ThemeToggle;
