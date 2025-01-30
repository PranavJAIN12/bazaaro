"use client";
import React from "react";
import { Provider as ReduxProvider } from "react-redux"; // Rename imported Provider
import Store from "./Store"; // Ensure correct store usage

const ProviderWrapper = ({ children }) => {
  return (
    <ReduxProvider store={Store}>
      {children}
    </ReduxProvider>
  );
};

export default ProviderWrapper;
