import Header from "@/components/shared/header";
import { Children } from "@/types";
import React from "react";

const AppLayout = ({ children }: Children) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
