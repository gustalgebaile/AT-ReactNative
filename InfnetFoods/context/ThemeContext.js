import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const lightMode = {
  backgroundColor: '#FAFAFA',
  color: '#202124',
  borderColor: '#C0C0C0',
  cardBackgroundColor: 'lightgray',
  cardBorderColor: '#E0E0E0',
  linkColor: 'steelblue',
  buttonBackgroundColor: 'steelblue',
  buttonTextColor: '#FFFFFF', 
  errorColor: 'red',
};

const darkMode = {
  backgroundColor: '#181818',
  color: '#E0E0E0',
  cardBackgroundColor: '#2C2C2C',
  cardBorderColor: '#303030',
  linkColor: 'steelblue',
  buttonBackgroundColor: 'steelblue', 
  buttonTextColor: '#FFFFFF', 
  errorColor: 'red',
};


export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(darkMode);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === darkMode ? lightMode : darkMode));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};