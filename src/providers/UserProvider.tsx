"use client";

import { DASHBOARD_ROUTE } from "@/constants";
import { revalidate } from "@/lib/actions/revalidate.action";
import { fetchUser } from "@/lib/auth/client";
import { UserType } from "@/types/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: UserType | undefined;
  registerUser: (user: UserType) => void;
  deleteUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | undefined>();

  const getUser = async () => {
    try {
      const { user } = await fetchUser();
      setUser(user);
    } catch (error) {
      setUser(undefined);
    }
  };

  const registerUser = (user: UserType) => {
    setUser(user);

    // This is done so the dashboard page is revalidated when a new user logs in
    // so it avoids viewing previous content (makes more sense when using RBAC)
    revalidate(DASHBOARD_ROUTE);
  };

  const deleteUser = () => {
    setUser(undefined);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        registerUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
