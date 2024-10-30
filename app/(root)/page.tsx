"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main>
      <section className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className={`text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Test Task
          </h1>
          <p
            className={`text-xl text-muted-foreground mb-8 transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
            voluptatibus minima ad eos nemo inventore consectetur ut!
            Consequuntur, neque iusto.
          </p>
          <div
            className={`transition-all duration-1000 delay-500 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Button size="lg" className="rounded-full group" asChild>
              <Link href={"/posts"}>
                Get posts
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
