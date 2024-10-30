import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const handleError = (error: unknown) => {
  console.error(error);
  if (typeof error === "string") {
    throw new Error(error);
  } else if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(JSON.stringify(error));
  }
};

export { cn, handleError };
