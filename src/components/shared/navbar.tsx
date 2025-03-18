import Link from "next/link";
import SessionActionWrapper from "./session-action-wrapper";

export function Navbar() {
  return (
    <>
      <nav className="bg-sky-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-900">
              Scrum Poker with JIRA
            </span>
          </Link>

          <SessionActionWrapper />
        </div>
      </nav>
    </>
  );
}
