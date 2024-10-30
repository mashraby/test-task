import { Children } from "@/types";
import React from "react";

export default function AuthLayout({ children }: Children) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      {children}
    </main>
  );
}
