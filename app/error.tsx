"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-3xl font-bold">Something went wrong</h1>
      <p className="text-muted">{error.message || "Unexpected error"}</p>
      <button onClick={reset} className="mt-6 inline-flex rounded-md border border-[var(--border)] px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5">Try again</button>
    </div>
  );
}