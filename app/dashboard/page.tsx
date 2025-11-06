"use client";
import React, { useState } from "react";

// --- SVG Icons for Sidebar ---
const IconLayoutDashboard: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const IconFileText: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconFolderArchive: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    <line x1="12" y1="11" x2="12" y2="17"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
  </svg>
);

const IconSettings: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// --- Sidebar Component (Responsive) ---
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, href: "/dashboard" },
    { name: "Transcribe", icon: <IconFileText />, href: "/transcribe" },
    { name: "Records", icon: <IconFolderArchive />, href: "/records" },
    { name: "Settings", icon: <IconSettings />, href: "/settings" },
  ];

  const activePath = typeof window !== "undefined" ? window.location.pathname : "";

  const [avatarUrl] = useState<string | null>(null);
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
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <nav
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-gray-800 flex flex-col h-full transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-center h-20 border-b border-gray-800 relative">
          <h1 className="text-2xl font-bold text-cyan-400">MediScript</h1>
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 md:hidden p-2 rounded hover:bg-gray-800 text-gray-300"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activePath === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive ? "bg-gray-900 text-white" : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
              >
                <span
                  className={`mr-3 transition-colors ${
                    isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                  }`}
                >
                  {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-800">
          <a href="/profile" className="flex items-center hover:bg-gray-900 p-2 rounded-lg transition-colors">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-semibold text-white text-lg">
                {(name || "U").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm font-medium text-white">{name}</p>
              <p className="text-xs text-gray-400">{role}</p>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
}

// --- SVG Icons for Dashboard Stat Cards ---
const IconCalendar = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconFileCheck = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
  </svg>
);

const IconBarChart = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const IconClock = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// --- Re-styled StatCard ---
function StatCard({ title, value, delta, icon }: { title: string; value: string; delta?: string; icon?: React.ReactNode }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-400">{title}</div>
        <div className="text-3xl font-bold text-white mt-1">{value}</div>
        {delta && <div className="text-sm text-emerald-400 mt-2">{delta}</div>}
      </div>
      <div className="text-gray-700">{icon}</div>
    </div>
  );
}

// --- Mock Data ---
const mockAppointments = [
  { id: 1, name: "Robert Johnson", time: "09:00 AM", reason: "Annual Check-up" },
  { id: 2, name: "Maria Garcia", time: "09:30 AM", reason: "Follow-up" },
  { id: 3, name: "James Smith", time: "10:15 AM", reason: "New Patient Consultation" },
  { id: 4, name: "Patricia Williams", time: "11:00 AM", reason: "Test Results" },
];

const mockReviews = [
  { id: 1, patient: "Maria Garcia", date: "2023-10-27 | 09:35 AM" },
  { id: 2, patient: "David Brown", date: "2023-10-26 | 04:12 PM" },
  { id: 3, patient: "Linda Davis", date: "2023-10-26 | 02:30 PM" },
];

const weeklyActivity = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 80 },
  { day: "Thu", value: 60 },
  { day: "Fri", value: 75 },
  { day: "Sat", value: 50 },
  { day: "Sun", value: 30 },
];

export default function Page() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen w-full flex bg-black text-gray-100">
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
        <span className="font-semibold text-white">Dashboard</span>
        <span className="w-10" />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 md:ml-64 p-4 pt-20 md:p-8 space-y-8">
        
        {/* --- Header (MODIFIED for Responsiveness) --- */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">Doctor&apos;s Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Welcome back.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a href="/transcribe" className="w-full sm:w-auto">
              <button className="w-full px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-200">
                New Transcription
              </button>
            </a>
            <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
              View All Patients
            </button>
          </div>
        </div>

        {/* --- Stat Cards (Already Responsive) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Today&apos;s Appointments" value="14" delta="2 remaining" icon={<IconCalendar />} />
          <StatCard title="Pending Reviews" value="3" delta="1 overdue" icon={<IconFileCheck className="text-yellow-700" />} />
          <StatCard title="Transcriptions (Week)" value="42" delta="+5 from last week" icon={<IconBarChart />} />
          <StatCard title="Avg. Transcription" value="3m 45s" delta="-12s from last week" icon={<IconClock />} />
        </section>

        {/* --- Main Content Grid (Already Responsive) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Upcoming Appointments (Main) --- */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Upcoming Appointments</h2>
            </div>
            <ul className="divide-y divide-gray-800">
              {mockAppointments.map((appt) => (
                // --- List Item (MODIFIED for Responsiveness) ---
                <li key={appt.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-gray-800/50 transition-colors duration-150">
                  <div className="flex items-center flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-lg">
                      {appt.name.charAt(0)}
                    </div>
                    <div className="ml-4 flex-1 sm:hidden">
                      <p className="font-medium text-white">{appt.name}</p>
                      <p className="text-sm text-gray-400">{appt.time} • {appt.reason}</p>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-4 flex-1 hidden sm:block">
                    <p className="font-medium text-white">{appt.name}</p>
                    <p className="text-sm text-gray-400">{appt.time} • {appt.reason}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-3 py-1 text-sm rounded-md border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors">View Chart</button>
                    <a href="/transcribe" className="flex-1 sm:flex-none">
                      <button className="w-full px-3 py-1 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">Transcribe</button>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-gray-800 text-center">
              <a href="#" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View Full Schedule</a>
            </div>
          </div>

          {/* --- Pending Reviews (Side) (Already Responsive) --- */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Pending Reviews</h2>
            </div>
            <ul className="divide-y divide-gray-800">
              {mockReviews.map((review) => (
                <li key={review.id} className="p-4 flex items-center hover:bg-gray-800/50 transition-colors duration-150">
                  <div className="flex-1">
                    <p className="font-medium text-white">{review.patient}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                  <button className="ml-auto px-4 py-1 text-sm rounded-md bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors">Review</button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* --- Secondary Content Grid (Already Responsive) --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Weekly Activity (Already Responsive) --- */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Weekly Activity</h2>
              <button className="text-sm px-3 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700">Export</button>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-3">
              {weeklyActivity.map((item) => (
                <div key={item.day} className="flex flex-col items-center">
                  <div className="text-xs text-gray-400 mb-1">{item.day}</div>
                  {/* Added min-h-[1px] to ensure bar is visible even with 0 value */}
                  <div className="w-6 bg-emerald-700 min-h-[1px]" style={{ height: `${item.value / 2}px` }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* --- Quick Actions (Already Responsive) --- */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button className="px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">New Patient</button>
              <button className="px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700">Create Report</button>
              <button className="px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700">Schedule</button>
              <a href="/transcribe">
                <button className="w-full px-4 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Transcribe</button>
              </a>
            </div>
          </div>

          {/* --- Notifications --- */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
            <ul className="mt-3 space-y-3">
              {/* --- List Item (MODIFIED for Responsiveness) --- */}
              <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-300">Test results ready for Maria Garcia</span>
                <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 flex-shrink-0">View</button>
              </li>
              <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-300">New patient registration: David Brown</span>
                <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 flex-shrink-0">View</button>
              </li>
              <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-sm text-gray-300">Appointment confirmed: Patricia Williams</span>
                <button className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 flex-shrink-0">View</button>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}