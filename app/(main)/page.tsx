"use client";

import { useAppSelector } from "@/redux/hooks/authHooks";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    console.log("User: ", user);
  }, []);

  return <div>Home</div>;
};

export default Home;
