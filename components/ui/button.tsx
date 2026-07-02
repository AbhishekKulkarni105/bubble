import { cn } from "@/lib/utils/cn";

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center rounded-md bg-black px-4 py-2 text-sm text-white disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
