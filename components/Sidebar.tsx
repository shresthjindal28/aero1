"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

function IconLayoutDashboard({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );
}
function IconFileText({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );
}
function IconFolderArchive({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
      <line x1="12" y1="11" x2="12" y2="17"></line>
      <line x1="9" y1="14" x2="15" y2="14"></line>
    </svg>
  );
}
function IconSettings({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 1v2"></path>
      <path d="M12 21v2"></path>
      <path d="M4.22 4.22l1.42 1.42"></path>
      <path d="M18.36 18.36l1.42 1.42"></path>
      <path d="M1 12h2"></path>
      <path d="M21 12h2"></path>
      <path d="M4.22 19.78l1.42-1.42"></path>
      <path d="M18.36 5.64l1.42-1.42"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, href: "/dashboard" },
    { name: "Transcribe", icon: <IconFileText />, href: "/transcribe" },
    { name: "Records", icon: <IconFolderArchive />, href: "/records" },
    { name: "Settings", icon: <IconSettings />, href: "/settings" },
  ];

  // Load profile without mock defaults
  const [avatarUrl] = useState<string | null>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!raw) return null;
      const p = JSON.parse(raw);
      return p?.avatar ?? null;
    } catch {
      return null;
    }
  });
  const [name] = useState<string>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!raw) return "";
      const p = JSON.parse(raw);
      return p?.name ?? "";
    } catch {
      return "";
    }
  });
  const [role] = useState<string>(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!raw) return "";
      const p = JSON.parse(raw);
      return p?.role ?? "";
    } catch {
      return "";
    }
  });

  return (
    <nav className="w-64 bg-black border-r border-gray-800 flex flex-col fixed h-full">
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-emerald-400">MediScript</h1>
      </div>
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <a key={item.name} href={item.href} className={`group flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${isActive ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"}`}>
              <span className={`mr-3 transition-colors ${isActive ? "text-emerald-400" : "text-gray-500 group-hover:text-gray-300"}`}>{React.cloneElement(item.icon, { className: "w-5 h-5" })}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </a>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-800">
        <a href="/profile" className="flex items-center hover:bg-gray-900 p-2 rounded-lg transition-colors">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="Avatar" width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-semibold text-white text-lg">
              {(name || "U").slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{name || "—"}</p>
            <p className="text-xs text-gray-400">{role || "—"}</p>
          </div>
        </a>
      </div>
    </nav>
  );
}