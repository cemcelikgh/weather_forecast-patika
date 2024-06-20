import { createContext, useState } from 'react';

export const CityContext = createContext(null);

function CityProvider({ children }) {

  const [selectedCity, setSelectedCity] = useState('34');

  return (
    <CityContext.Provider value={ { selectedCity, setSelectedCity } }>
      {children}
    </CityContext.Provider>
  );
};

export default CityProvider;
