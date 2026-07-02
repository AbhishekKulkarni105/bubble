/** Replaces Bubble sidebar reusable; menu items gated by Sidebar Menu_opt role. */
export function Sidebar() {
  return (
    <aside className="w-60 border-r bg-gray-50 p-4">
      <nav className="flex flex-col gap-1 text-sm">
        <a href="/dashboard">Dashboard</a>
        <a href="/quotes">Quotes</a>
        <a href="/policies">Policies</a>
        <a href="/insureds">Insureds</a>
        <a href="/prospects">Prospects</a>
        <a href="/agency">Agency</a>
      </nav>
    </aside>
  );
}
