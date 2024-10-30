"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import useMediaQuery from "@/hooks/use-media";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  return (
    <header className="bg-background shadow-sm">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex h-16 items-center justify-between">
          {!isMobile && (
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="sr-only">Company name</span>
                <svg
                  className="h-8 w-auto text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </Link>
            </div>
          )}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <SignedOut>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
              <Button variant={"outline"} asChild>
                <Link href={"/sign-in"}>Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href={"/sign-up"}>Sign Up</Link>
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-primary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <SignedOut>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="px-3 space-y-3">
                <Button className="w-full" variant={"outline"} asChild>
                  <Link href={"/sign-in"}>Sign In</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Button>
              </div>
            </div>
          </SignedOut>
        </div>
      )}
    </header>
  );
}
