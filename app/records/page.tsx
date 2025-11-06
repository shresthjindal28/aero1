"use client";
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen w-full flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-black border-b border-gray-800 flex items-center justify-between px-4 h-14">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded hover:bg-gray-800 text-gray-200"
          aria-label="Open sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <span className="font-semibold text-white">Records</span>
        <span className="w-10" />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 md:ml-64 p-4 pt-20 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Transcription Records</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">No records yet.</div>
      </main>
    </div>
  );
}
