"use client";
import React from "react";
import Sidebar from "../../components/Sidebar";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6">Transcription Records</h1>
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">No records yet.</div>
      </main>
    </div>
  );
}
