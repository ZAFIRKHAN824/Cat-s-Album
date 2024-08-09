import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [breedDetail, setBreedDetail] = useState([]);

  return (
    <AuthContext.Provider value={[breedDetail, setBreedDetail]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
