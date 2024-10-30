import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <div className="space-y-2">
        <h1 className="text-8xl font-bold tracking-tighter text-primary/30">
          404
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">
          Page not found
        </h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/" className="gap-2">
          <HomeIcon className="h-4 w-4" />
          Back to home
        </Link>
      </Button>
    </div>
  );
}
