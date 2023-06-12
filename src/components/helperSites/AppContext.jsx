import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCreateDataEntry, setShowCreateDataEntry] = useState(false);
  const [calledFromNavbar, setCalledFromNavbar] = useState(false);
  const [shouldRenderCreateDataEntry, setShouldRenderCreateDataEntry] =
    useState(false);

  return (
    <AppContext.Provider
      value={{
        showCreateDataEntry,
        setShowCreateDataEntry,
        shouldRenderCreateDataEntry,
        setShouldRenderCreateDataEntry,
        calledFromNavbar,
        setCalledFromNavbar
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
