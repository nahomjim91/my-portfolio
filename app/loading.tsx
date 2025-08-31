export default function Loading() {
  return (
    <div className="container grid gap-6 py-24 md:grid-cols-2">
      <div className="space-y-4">
        <div className="h-6 w-2/3 animate-shimmer rounded bg-[var(--border)] bg-[linear-gradient(110deg,rgba(0,0,0,0)_40%,rgba(0,0,0,.08)_50%,rgba(0,0,0,0)_60%)] bg-[length:200%_100%]" />
        <div className="h-4 w-full animate-shimmer rounded bg-[var(--border)] bg-[linear-gradient(110deg,rgba(0,0,0,0)_40%,rgba(0,0,0,.08)_50%,rgba(0,0,0,0)_60%)] bg-[length:200%_100%]" />
        <div className="h-4 w-5/6 animate-shimmer rounded bg-[var(--border)] bg-[linear-gradient(110deg,rgba(0,0,0,0)_40%,rgba(0,0,0,.08)_50%,rgba(0,0,0,0)_60%)] bg-[length:200%_100%]" />
      </div>
      <div className="aspect-square w-full animate-pulse rounded-3xl border border-[var(--border)]" />
    </div>
  );
}