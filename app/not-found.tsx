import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-2 text-4xl font-bold">404 – Page not found</h1>
      <p className="text-muted">The page you are looking for doesn’t exist or has been moved.</p>
      <Link href="/" className="mt-6 inline-flex rounded-md border border-[var(--border)] px-4 py-2 hover:bg-black/5 dark:hover:bg-white/5">Go Home</Link>
    </div>
  );
}