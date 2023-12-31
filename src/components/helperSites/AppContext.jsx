/**
* @fileOverview
* React context provider component for managing the application state.
* Provides the AppContext and related state variables to its children components.
*/

import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showCreateDataEntry, setShowCreateDataEntry] = useState(false);
  const [calledFromNavbar, setCalledFromNavbar] = useState(false);
  const [shouldRenderCreateDataEntry, setShouldRenderCreateDataEntry] =
    useState(false);
  const [logIn, setLogIn] = useState(false);

  return (
    <AppContext.Provider
    value={{
      showCreateDataEntry,
      setShowCreateDataEntry,
      shouldRenderCreateDataEntry,
      setShouldRenderCreateDataEntry,
      calledFromNavbar,
      setCalledFromNavbar,
      logIn,
      setLogIn
    }}
    >
      {children}
    </AppContext.Provider>
  );
};
