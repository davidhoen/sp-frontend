"use client";

import React from "react";
import { UserProvider } from "./UserProvider";

interface ParentProviderProps {
  children: React.ReactNode;
}

const ParentProvider = ({ children }: ParentProviderProps) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default ParentProvider;
