import React, {createContext} from 'react';
import AppView from './components/AppView';

export const themes = {
  light: {
    primary: '#F5F5F5',
    secondary: '#E0E0E0',
    text: '#3C3C3C',
    accent: '#FF5A5F',
  },
  dark: {
    primary: '#2f323a',
    secondary: '#494E5A',
    text: '#ebebeb',
    accent: '#FF5A5F',
  },
};

export const ThemeContext = createContext(themes.light);

const App = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <AppView />
    </ThemeContext.Provider>
  );
};

export default App;
