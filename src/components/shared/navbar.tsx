"use client";

import { useState } from "react";
import Link from "next/link";
import { ProfileSidebar } from "./profile-sidebar";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleLogin = () => {
    // In a real app, this would be an actual auth flow
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-sky-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-900">
              Scrum Poker with JIRA
            </span>
          </Link>

          <div>
            {!isLoggedIn ? (
              <button
                onClick={toggleLogin}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Login
              </button>
            ) : (
              <button
                onClick={toggleSidebar}
                className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white hover:bg-cyan-700 transition-colors"
              >
                <span className="text-sm font-semibold">MK</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar that slides in from right */}
      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
