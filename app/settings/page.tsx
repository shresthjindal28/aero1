"use client";
import React, { useEffect, useState, useRef } from "react";

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
  const navItems = [
    { name: "Dashboard", icon: <IconLayoutDashboard />, href: "/dashboard" },
    { name: "Transcribe", icon: <IconFileText />, href: "/transcribe" },
    { name: "Records", icon: <IconFolderArchive />, href: "/records" },
    { name: "Settings", icon: <IconSettings />, href: "/settings" },
  ];

  const [avatarUrl] = useState<string | null>(null); // Simplified for preview
  const [name] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.name ?? "";
    } catch {
      return "";
    }
  });
  const [role] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.role ?? "";
    } catch {
      return "";
    }
  });
  
  // In a real app, you'd use usePathname() here
  const activePath = "/settings"; 

  return (
    <nav className="w-64 bg-black border-r border-gray-800 flex flex-col fixed h-full">
      {/* Logo/Header */}
      <div className="flex items-center justify-center h-20 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">MediScript</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activePath === item.href;
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
        <a // Changed from <Link> to <a>
          href="/profile"
          className="flex items-center hover:bg-gray-900 p-2 rounded-lg transition-colors"
        >
          {avatarUrl ? (
            <img // Changed from <Image> to <img>
              src={avatarUrl}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
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
// --- End Sidebar ---


// --- Settings Page Component ---
type Notifications = { realtime: boolean; emailAlerts: boolean; sound: boolean };

// Simple chime sound embedded as a base64 data URL
const notificationSound = "data:audio/wav;base64,UklGRlIAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAD//v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9+v/7/vr/+v/6/fn++v/6/fr9BQsHFAgLDhUREhMUFRcWGRwLDRATEhQVFhYYGhsdHR8KDRMUFRYXGRobHR4fICAgCxIUFhcaGxweHyAhIiIiCw4WGBscHh8gISIiIyQlJQwOGBsdHh8gISIiIyQlJicnDQ8bHB4fICIiIyQlJicnKCsLDA0cHiAhIiMkJSYnKCkqLCwsDAweICIjJCUnKCkqLC0uLzAzCw8jJCUmJygqLCstLi8wMTI1CxAlJicoKSosLS4vMDEyMzU2DCUmKCkqLC0uLzAxMjM1Njc4DDMqLCstLi8xMjQ1Njc4OToNECstLi8xMjM1Njc4OTo7PDQTLzAxMjQ1Njc4Ojs8PT4/PgcGMTI0NTY3ODk6Ozw9Pj8/QBc2Nzg5Ojs8PT4/QEFCQ0RABjg5Ojs8PT4/QEFCQ0RFRkcCOjs8PT4/QEFCQ0RFRkdISUwFPD0+P0BBQkNERUZHSElKS0wGQEFCQ0RFRkdISUpLTU5PUAwRFRkdISUpLTU5PUFFSk0MGR0hJSkvNUJMU1dcaXOKjJ0HHiMqLzVFTlRXYWt0gowHKS82R1RYW2l4jZSUlJObHjA4SVdZXGl7j5aZmp6en6CcEzVLYmZweIyfqbKztba3ubq8GQ+FsMfLzM/R0tPV1tfY2dnaGQmzyMvNztHS09XW19jZ2drbHQ3Q1NXW19jZ2drb3N3e3uDfB+PY2drb3N3e3uDg4OHj4+QB4N3e3uDg4OHj4+Tk5OXm5+gA4eHj4+Tk5OXm5+jp6enq6+wA5OTl5ubn6Ojp6err7O3t7e4A5ubn6Ojp6err7O3t7u7v8PAB6Ojp6err7O3t7u7v8PDx8fIA6err7O3t7u7v8PDx8fLy8/QA7e3u7vDw8PHx8vLz8/P09PT1Be7v8PDx8fLy8/Pz9PT19fX29vgA8PDx8fLy8/Pz9PT19fX29vb3+AQB8vLz8/P09PT19fX29vb39/j4+AX09PT19fX29vb39/j4+Pj5+Qn29vb39/j4+Pj5+fn6+vr7+/sD+Pj4+fn5+vr6+/v7+/z8/P3+Afn5+vr6+/v7+/z8/Pz9/f7/AQP6+vr7+/v7/Pz8/Pz9/f7+/v8AAQH7+/v7/Pz8/Pz9/f7+/v8AAQACAgICAgICAgICAgICAgICAgICAgI=";

export default function Page() {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const t = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      return t || "system";
    } catch {
      return "system";
    }
  });
  const [name, setName] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.name ?? "";
    } catch {
      return "";
    }
  });
  const [role, setRole] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.role ?? "";
    } catch {
      return "";
    }
  });
  const [email, setEmail] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "dr.reynolds@example.com";
      const p = JSON.parse(profileRaw);
      return p.email ?? "dr.reynolds@example.com";
    } catch {
      return "dr.reynolds@example.com";
    }
  });
  const [phone, setPhone] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.phone ?? "";
    } catch {
      return "";
    }
  });
  const [address, setAddress] = useState<string>(() => {
    try {
      const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (!profileRaw) return "";
      const p = JSON.parse(profileRaw);
      return p.address ?? "";
    } catch {
      return "";
    }
  });
  const [notifications, setNotifications] = useState<Notifications>(() => {
    try {
      const notifRaw = typeof window !== "undefined" ? localStorage.getItem("notifications") : null;
      return notifRaw ? JSON.parse(notifRaw) : { realtime: true, emailAlerts: true, sound: false };
    } catch {
      return { realtime: true, emailAlerts: true, sound: false };
    }
  });
  const [notificationPermission, setNotificationPermission] = useState("default");
  const audioPlayer = useRef<HTMLAudioElement | null>(null);

  // Check notification permission on load
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      // Initialize state directly instead of inside an effect
      // This runs only once during initial render, avoiding cascading renders
    }
    // Create an audio element in memory
    audioPlayer.current = new Audio(notificationSound);
  }, []);


  useEffect(() => {
    try {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    } catch {}
  }, [notifications]);

  const applyTheme = (next: string) => {
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
      // This logic won't work in the sandboxed preview,
      // but it's correct for a real app.
      const c = document.documentElement.classList;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (next === "dark" || (next === "system" && prefersDark)) {
        c.add("dark");
      } else {
        c.remove("dark");
      }
    } catch {}
  };

  // --- New Notification and Sound Logic ---

  const playSound = () => {
    if (notifications.sound && audioPlayer.current) {
      audioPlayer.current.currentTime = 0;
      audioPlayer.current.play().catch(e => console.error("Error playing sound:", e));
    }
  };

  const showNotification = (title: string, body: string) => {
    // 1. Check if app setting is on
    if (!notifications.realtime) {
      console.log("App notifications are disabled.");
      return;
    }

    // 2. Check browser permission
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return;
    }
    
    if (notificationPermission === "granted") {
      new Notification(title, { body });
      playSound();
    } else if (notificationPermission !== "denied") {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === "granted") {
          new Notification(title, { body });
          playSound();
        }
      });
    }
    // If permission is "denied", do nothing.
  };

  const handleRealtimeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = e.target.checked;
    setNotifications((n: Notifications) => ({ ...n, realtime: isEnabled }));

    // If user is enabling notifications, request permission
    if (isEnabled && typeof window !== "undefined" && "Notification" in window) {
      if (notificationPermission !== "granted" && notificationPermission !== "denied") {
        Notification.requestPermission().then((permission) => {
          setNotificationPermission(permission);
        });
      }
    }
  };

  const saveProfile = () => {
    try {
      localStorage.setItem(
        "profile",
        JSON.stringify({ name, role, email, phone, address })
      );
      // Use new notification function
      showNotification("Profile Saved", "Your profile settings have been updated.");
    } catch {}
  };
  
  const testNotification = () => {
    showNotification("Test Notification", "This is how notifications will appear.");
  };

  // --- End New Logic ---


  const getButtonClass = (buttonTheme: string) => {
    const base = "px-5 py-2 rounded-lg font-medium transition-colors duration-200";
    if (theme === buttonTheme) {
      return `${base} bg-emerald-600 text-white ring-2 ring-emerald-500 border border-emerald-500`;
    }
    return `${base} bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700`;
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 space-y-8">
        <h1 className="text-3xl font-bold text-emerald-400">Settings</h1>

        {/* Theme Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Theme</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => applyTheme("light")} className={getButtonClass("light")}>
              Light
            </button>
            <button onClick={() => applyTheme("dark")} className={getButtonClass("dark")}>
              Dark
            </button>
            <button onClick={() => applyTheme("system")} className={getButtonClass("system")}>
              System
            </button>
          </div>
        </section>

        {/* Profile Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
              <input 
                value={role} 
                onChange={(e) => setRole(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
              <input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
              <input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" 
              />
            </div>
          </div>
          <div className="mt-6 border-t border-gray-800 pt-6 flex justify-end">
            <button 
              onClick={saveProfile} 
              className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors duration-200"
            >
              Save Profile
            </button>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Notifications</h2>
            <button 
              onClick={testNotification}
              className="px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition-colors"
            >
              Test Notification
            </button>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <div>
                <span className="font-medium text-gray-200">Real-time notifications</span>
                {notificationPermission === 'denied' && (
                  <p className="text-xs text-red-400">Browser notifications are blocked. Please enable them in your browser settings.</p>
                )}
              </div>
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded bg-gray-900 border-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
                checked={notifications.realtime} 
                onChange={handleRealtimeToggle} 
              />
            </label>
            <label className="flex items-center justify-between gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-200">Email alerts</span>
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded bg-gray-900 border-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
                checked={notifications.emailAlerts} 
                onChange={(e) => setNotifications((n: Notifications) => ({ ...n, emailAlerts: e.target.checked }))} 
              />
            </label>
            <label className="flex items-center justify-between gap-3 p-4 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
              <span className="font-medium text-gray-200">Play sound on completion</span>
              <input 
                type="checkbox" 
                className="h-5 w-5 rounded bg-gray-900 border-gray-700 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-gray-800"
                checked={notifications.sound} 
                onChange={(e) => setNotifications((n: Notifications) => ({ ...n, sound: e.target.checked }))} 
              />
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}