// CsrfTokenContext.js
import { createContext, useContext, useState } from 'react';

const CsrfTokenContext = createContext();

export const useCsrfToken = () => {
  return useContext(CsrfTokenContext);
};

export const CsrfTokenProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState(null);

  return (
    <CsrfTokenContext.Provider value={{ csrfToken, setCsrfToken }}>
      {children}
    </CsrfTokenContext.Provider>
  );
};

export default CsrfTokenContext;
