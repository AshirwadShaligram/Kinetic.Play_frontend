"use client";

import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks/authHooks";
import { refreshUser } from "../slice/authSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
