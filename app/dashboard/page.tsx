"use client";
import React, { useState } from "react"; // Consolidated imports

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

// --- Sidebar Component (Inlined) ---
function Sidebar() {
  // const pathname = usePathname(); // Removed: Next.js hook not available in preview
  
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, href: "/dashboard" },
    { name: "Transcribe", icon: <IconFileText />, href: "/transcribe" },
    { name: "Records", icon: <IconFolderArchive />, href: "/records" },
    { name: "Settings", icon: <IconSettings />, href: "/settings" },
  ];

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
    <nav className="w-64 bg-black border-r border-gray-800 flex flex-col fixed h-full">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">MediScript</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          // const isActive = pathname.startsWith(item.href); // Removed
          const isActive = false; // Set to false for preview
          return (
            <a // Changed from <Link> to <a>
              key={item.name}
              href={item.href} // Standard href
              className={`group flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-gray-900 text-white" // Active state
                  : "text-gray-400 hover:bg-gray-900 hover:text-white" // Inactive state
              }`}
            >
              <span
                className={`mr-3 transition-colors ${
                  isActive
                    ? "text-cyan-400" // Active icon color
                    : "text-gray-500 group-hover:text-gray-300" // Inactive icon color
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
  );
}


// --- SVG Icons for Dashboard Stat Cards ---
const IconCalendar = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconFileCheck = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path>
  </svg>
);

const IconBarChart = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const IconClock = ({ className = "w-8 h-8" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
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
  return (
    <div className="min-h-screen w-full flex bg-black text-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 space-y-8">
        {/* --- Header --- */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">Doctor&apos;s Dashboard</h1>
            <p className="text-sm text-gray-400 mt-1">Welcome back.</p>
          </div>
          <div className="flex gap-3">
            <a href="/transcribe"> {/* Changed from <Link> to <a> */}
              <button className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-200">
                New Transcription
              </button>
            </a>
            <button className="px-5 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
              View All Patients
            </button>
          </div>
        </div>

        {/* --- Stat Cards --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Today's Appointments" value="14" delta="2 remaining" icon={<IconCalendar />} />
          <StatCard title="Pending Reviews" value="3" delta="1 overdue" icon={<IconFileCheck className="text-yellow-700" />} />
          <StatCard title="Transcriptions (Week)" value="42" delta="+5 from last week" icon={<IconBarChart />} />
          <StatCard title="Avg. Transcription" value="3m 45s" delta="-12s from last week" icon={<IconClock />} />
        </section>

        {/* --- Main Content Grid --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Upcoming Appointments (Main) --- */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg">
            <div className="p-5 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Upcoming Appointments</h2>
            </div>
            <ul className="divide-y divide-gray-800">
              {mockAppointments.map((appt) => (
                <li key={appt.id} className="p-4 flex items-center hover:bg-gray-800/50 transition-colors duration-150">
                  <div className="w-10 h-10 rounded-full bg-emerald-800 text-emerald-200 flex items-center justify-center font-bold text-lg">
                    {appt.name.charAt(0)}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium text-white">{appt.name}</p>
                    <p className="text-sm text-gray-400">{appt.time} • {appt.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm rounded-md border border-gray-700 text-gray-300 hover:bg-gray-700 transition-colors">View Chart</button>
                    <a href="/transcribe"> {/* Changed from <Link> to <a> */}
                      <button className="px-3 py-1 text-sm rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">Transcribe</button>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 border-t border-gray-800 text-center">
              <a href="#" className="text-sm font-medium text-emerald-400 hover:text-emerald-300">View Full Schedule</a>
            </div>
          </div>

          {/* --- Pending Reviews (Side) --- */}
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

        {/* --- Secondary Content Grid --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Weekly Activity Chart --- */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-semibold text-white mb-4">Weekly Activity (Transcriptions)</h2>
            <div className="h-56 flex items-end justify-around pt-4">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="flex flex-col items-center w-10">
                  <div 
                    className="w-8 bg-emerald-600 rounded-t-sm hover:bg-emerald-500 transition-all duration-200"
                    style={{ height: `${day.value}%` }}
                    title={`${day.day}: ${Math.round(day.value / 100 * 50)} items`} // Simple tooltip
                  >
                  </div>
                  <span className="text-xs text-gray-400 mt-2">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* --- Quick Links & System Health --- */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-200">Start New Recording</button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-200">Manage Templates</button>
              <button className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-200">Patient Database</button>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-3">System Health</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">API Status</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-green-400">Healthy</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Transcription Queue</span>
                  <span className="text-sm text-gray-300">Normal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Database Latency</span>
                  <span className="text-sm text-gray-300">8ms</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}