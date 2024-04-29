import React from "react";

export const initialContext = {
  data: {
    login: {},
    employees: [],
    requests: [],
  },
};

export const Context = React.createContext(initialContext);
