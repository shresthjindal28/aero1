"use client";
import React, { useRef, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function ProfilePage() {
  const profileRaw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
  const initial = profileRaw ? JSON.parse(profileRaw) : {};
  const [name, setName] = useState<string>(initial.name ?? "");
  const [role, setRole] = useState<string>(initial.role ?? "");
  const [email, setEmail] = useState<string>(initial.email ?? "");
  const [phone, setPhone] = useState<string>(initial.phone ?? "");
  const [address, setAddress] = useState<string>(initial.address ?? "");
  const [avatar, setAvatar] = useState<string | null>(initial.avatar ?? null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onPickFile = () => fileInputRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setAvatar(url);
    };
    reader.readAsDataURL(file);
  };

  const save = () => {
    try {
      localStorage.setItem("profile", JSON.stringify({ name, role, email, phone, address, avatar }));
      alert("Profile saved.");
    } catch {}
  };

  return (
    <div className="min-h-screen w-full flex bg-black text-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">Profile</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-8 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            {avatar ? (
              <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-semibold text-white text-xl">
                {(name || "U").slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <button onClick={onPickFile} className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700">Upload Avatar</button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Address</label>
              <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border bg-gray-950 text-gray-100 border-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={save} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save</button>
          </div>
        </div>
      </main>
    </div>
  );
}