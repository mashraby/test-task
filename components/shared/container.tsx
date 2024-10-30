import { Children } from "@/types";
import React from "react";

const Container = ({ children }: Children) => {
  return <div className="container mx-auto max-w-5xl">{children}</div>;
};

export default Container;
