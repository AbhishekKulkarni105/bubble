import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

/** Authenticated app shell — replaces Bubble `index` page + sidebar/header reusables. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
