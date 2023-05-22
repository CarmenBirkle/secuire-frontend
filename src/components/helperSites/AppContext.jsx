import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCreateDataEntry, setShowCreateDataEntry] = useState(false);

  return (
    <AppContext.Provider
      value={{ showCreateDataEntry, setShowCreateDataEntry }}
    >
      {children}
    </AppContext.Provider>
  );
};
