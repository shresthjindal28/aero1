"use client";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/Sidebar"; // Assuming correct path

// Icon components (unchanged)
const IconMicrophone = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="22"></line>
  </svg>
);

const IconStopCircle = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <rect x="9" y="9" width="6" height="6"></rect>
  </svg>
);

const IconUploadCloud = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
    <path d="M12 12v9"></path>
    <path d="m16 16-4-4-4 4"></path>
  </svg>
);

const IconDownload = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconPrinter = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 6 2 18 2 18 9"></polyline>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <rect x="6" y="14" width="12" height="8"></rect>
  </svg>
);

export default function Page() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  // NEW: capture extra data from API
  const [languageCode, setLanguageCode] = useState<string | null>(null);
  const [entities, setEntities] = useState<MedicalEntities | null>(null);
  // NEW: doctor details (loaded from localStorage profile if available)
  const [doctorName, setDoctorName] = useState<string>("");
  const [doctorRole, setDoctorRole] = useState<string>("");
  const [doctorEmail, setDoctorEmail] = useState<string>("");
  const [doctorPhone, setDoctorPhone] = useState<string>("");
  const [doctorAddress, setDoctorAddress] = useState<string>("");
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Define strict types for backend medical entities
  type OtherEntity = { word: string; type: string; confidence?: number };
  interface MedicalEntities {
    diseases?: string[];
    medications?: string[];
    symptoms?: string[];
    procedures?: string[];
    other?: OtherEntity[];
  }

  useEffect(() => {
    return () => {
      try {
        const mr = mediaRecorderRef.current;
        if (mr && mr.state === "recording") {
          mr.stop();
        }
      } catch {}
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, []);
  // NEW: load doctor details from profile
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("profile") : null;
      if (raw) {
        const p = JSON.parse(raw);
        if (p?.name) setDoctorName(p.name);
        if (p?.role) setDoctorRole(p.role);
        if (p?.email) setDoctorEmail(p.email);
        if (p?.phone) setDoctorPhone(p.phone);
        if (p?.address) setDoctorAddress(p.address);
      }
    } catch {}
  }, []);

  const startRecording = async () => {
    if (recording || processing) return;
    setError(null);
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      setError("Failed to access microphone.");
      return;
    }

    audioChunksRef.current = [];

    const types = ["audio/webm", "audio/mp4", "audio/ogg"];
    const isSupported = (type: string) =>
      typeof MediaRecorder !== "undefined" && typeof MediaRecorder.isTypeSupported === "function"
        ? MediaRecorder.isTypeSupported(type)
        : true;
    const mimeType = types.find(isSupported) || "";

    const recorder = mimeType ? new MediaRecorder(streamRef.current!, { mimeType }) : new MediaRecorder(streamRef.current!);
    recorder.ondataavailable = (e: BlobEvent) => {
      if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
    };
    recorder.onerror = (_e: Event) => {
      setError("Recording error occurred.");
      setRecording(false);
    };
    try {
      recorder.start();
    } catch (e) {
      setError("Failed to start recording.");
      return;
    }
    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = async () => {
    const mr = mediaRecorderRef.current;
    if (!mr || mr.state !== "recording") return;
    mr.onstop = async () => {
      const chunks = audioChunksRef.current.slice();
      audioChunksRef.current = [];

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      mediaRecorderRef.current = null;

      if (!chunks.length) {
        setError("No audio captured.");
        setRecording(false);
        return;
      }

      const blobType = mr.mimeType || "audio/webm";
      const blob = new Blob(chunks, { type: blobType });
      const ext = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
      const file = new File([blob], `recording.${ext}`, { type: blob.type });

      setProcessing(true);
      const fd = new FormData();
      fd.append("file", file);
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5050";
        const res = await fetch(`${backendUrl}/process_audio`, { method: "POST", body: fd });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error((data && data.message) || `Backend error: ${res.status}`);
        setText(data?.transcription?.text || "");
        setLanguageCode(data?.transcription?.language_code || null);
        setEntities(data?.medical_entities || null);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setProcessing(false);
      }
    };
    try {
      mr.stop();
    } catch {
      // ignore
    }
    setRecording(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setSelectedFile(f);
  };

  const uploadSelectedFile = async () => {
    if (!selectedFile) return setError("Please select a file");
    setProcessing(true);
    const fd = new FormData();
    fd.append("file", selectedFile, selectedFile.name);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5050";
      const res = await fetch(`${backendUrl}/process_audio`, { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error((data && data.message) || `Backend error: ${res.status}`);
      setText(data?.transcription?.text || "");
      setLanguageCode(data?.transcription?.language_code || null);
      setEntities(data?.medical_entities || null);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setSelectedFile(null);
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const buildPrescriptionHtml = () => {
    const safeText = (text || "").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const meds: string[] = entities?.medications || [];
    const symptoms: string[] = entities?.symptoms || [];
    const diseases: string[] = entities?.diseases || [];
    const procedures: string[] = entities?.procedures || [];
    const others: OtherEntity[] = entities?.other || [];
    const today = new Date().toLocaleString();
    const rows = others.map(o => `<tr><td>${o.word}</td><td>${o.type}</td><td>${typeof o.confidence === 'number' ? (o.confidence * 100).toFixed(1) + '%' : '-'}</td></tr>`).join("");
    return `<!doctype html><html><head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background: #fff; color: #111; margin: 24px; }
        .header { display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid #222; padding-bottom: 12px; }
        .doctor { line-height:1.2; }
        .doctor h1 { margin:0; font-size: 20px; }
        .doctor p { margin:2px 0; font-size: 12px; color:#444; }
        .title { text-align:center; margin:16px 0; font-weight:700; font-size:18px; }
        .meta { font-size: 12px; color:#444; margin-bottom: 16px; }
        .section { margin: 12px 0; }
        .section h2 { font-size: 14px; border-bottom: 1px solid #ddd; padding-bottom: 6px; margin-bottom: 8px; }
        ul { margin: 6px 0; padding-left: 18px; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background: #f7f7f7; }
        .foot { margin-top: 24px; font-size: 11px; color:#555; }
      </style>
    </head><body>
      <div class="header">
        <div class="doctor">
          <h1>${doctorName}</h1>
          <p>${doctorRole}</p>
          <p>Email: ${doctorEmail}</p>
          <p>Contact: ${doctorPhone}</p>
          <p>Address: ${doctorAddress}</p>
        </div>
        <div class="meta">
          <div>Date: ${today}</div>
          ${languageCode ? `<div>Transcription Language: ${languageCode}</div>` : ""}
        </div>
      </div>
      <div class="title">Prescription</div>
      <div class="section">
        <h2>Patient Narrative</h2>
        <div style="white-space:pre-wrap">${safeText}</div>
      </div>
      <div class="section"><h2>Diseases</h2>${diseases.length ? `<ul>${diseases.map(d=>`<li>${d}</li>`).join('')}</ul>` : '<div>None detected.</div>'}</div>
      <div class="section"><h2>Symptoms</h2>${symptoms.length ? `<ul>${symptoms.map(s=>`<li>${s}</li>`).join('')}</ul>` : '<div>None detected.</div>'}</div>
      <div class="section"><h2>Medications</h2>${meds.length ? `<ul>${meds.map(m=>`<li>${m}</li>`).join('')}</ul>` : '<div>None detected.</div>'}</div>
      <div class="section"><h2>Procedures</h2>${procedures.length ? `<ul>${procedures.map(p=>`<li>${p}</li>`).join('')}</ul>` : '<div>None detected.</div>'}</div>
      <div class="section">
        <h2>Other Entities (with confidence)</h2>
        ${others.length ? `<table><thead><tr><th>Word</th><th>Type</th><th>Confidence</th></tr></thead><tbody>${rows}</tbody></table>` : '<div>None.</div>'}
      </div>
      <div class="foot">This document is based solely on the provided audio transcription and extracted entities.</div>
    </body></html>`;
  };

  const handlePrint = () => {
    if (!text) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<!doctype html><html><head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
      <style>
        body { font-family: "Roboto", sans-serif; background-color: #1a202c; color: #e2e8f0; }
        pre { white-space: pre-wrap; }
      </style>
    </head><body>
      <pre>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
    </body></html>`);
    w.document.close();
    w.print();
    w.close();
  };
  
  const handlePrintPrescription = () => {
    if (!text) return;
    const html = buildPrescriptionHtml();
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };
  const handleDownloadPrescription = () => {
    if (!text) return;
    const html = buildPrescriptionHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "prescription.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

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
        <span className="font-semibold text-white">Transcribe</span>
        <span className="w-10" />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="flex-1 md:ml-64 p-4 pt-20 md:p-8 max-w-4xl mx-auto" aria-busy={processing}>
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">New Transcription</h1> {/* Green accent */}
        {error && <div className="mb-4 text-red-500 bg-red-900/20 p-3 rounded">{error}</div>} {/* Error styling */}
        {processing && <div className="mb-4 text-emerald-400 bg-emerald-900/20 p-3 rounded">Processing...</div>} {/* Processing styling */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Record Audio Card */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700"> {/* Darker card, subtle border */}
            <h2 className="font-semibold text-lg mb-4 text-gray-200">Record Audio</h2>
            {!recording ? (
              <button
                onClick={startRecording}
                disabled={processing}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <IconMicrophone className="w-5 h-5" /> Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                disabled={processing}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <IconStopCircle className="w-5 h-5" /> Stop Recording
              </button>
            )}
          </div>

          {/* Upload File Card (Uncommented and styled) */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <h2 className="font-semibold text-lg mb-4 text-gray-200">Upload File</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="file"
                accept="audio/*,.wav,.mp3,.ogg,.webm"
                onChange={handleFileChange}
                ref={fileInputRef}
                disabled={processing}
                className="block w-full text-sm text-gray-400
                           file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0
                           file:text-sm file:font-semibold
                           file:bg-gray-700 file:text-white
                           hover:file:bg-gray-600 cursor-pointer transition-colors duration-200"
              />
              <button
                onClick={uploadSelectedFile}
                disabled={!selectedFile || processing}
                className={`w-full font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200
                            ${!selectedFile || processing ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
              >
                <IconUploadCloud className="w-5 h-5" /> Process File
              </button>
            </div>
          </div>
        </div>

        {/* NER Word • Type • Confidence (placed before text as requested) */}
        {(entities?.other?.length || 0) > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-gray-200">Word • Type • Confidence</h3>
              <button onClick={handlePrintPrescription} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <IconPrinter className="w-4 h-4" /> Print Prescription
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-gray-400">
                    <th className="text-left py-2 border-b border-gray-700 pr-4">Word</th>
                    <th className="text-left py-2 border-b border-gray-700 pr-4">Type</th>
                    <th className="text-right py-2 border-b border-gray-700">Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {(entities?.other || []).map((it: OtherEntity, idx: number) => (
                    <tr key={idx} className="text-gray-100">
                      <td className="py-2 border-b border-gray-800 pr-4">{it.word}</td>
                      <td className="py-2 border-b border-gray-800 pr-4">{it.type}</td>
                      <td className="py-2 border-b border-gray-800 text-right">{typeof it.confidence === 'number' ? `${(it.confidence * 100).toFixed(1)}%` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Prescription Preview */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <h3 className="font-semibold text-lg text-emerald-400">Prescription</h3>
              <div className="mt-1 text-sm text-gray-300">
                <div className="font-medium">{doctorName}{doctorRole ? `, ${doctorRole}` : ""}</div>
                {doctorEmail && <div className="text-gray-400">{doctorEmail}</div>}
                {doctorPhone && <div className="text-gray-400">{doctorPhone}</div>}
                {doctorAddress && <div className="text-gray-400">{doctorAddress}</div>}
              </div>
            </div>
            <div>
              <button onClick={handlePrintPrescription} className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 bg-gray-700 hover:bg-gray-600 text-gray-200">
                <IconPrinter className="w-4 h-4" /> Print Prescription
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-400 mb-2">Symptoms</p>
              <p className="text-gray-100">{entities?.symptoms?.length ? entities!.symptoms!.join(", ") : "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Medications</p>
              <p className="text-gray-100">{entities?.medications?.length ? entities!.medications!.join(", ") : "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Diseases</p>
              <p className="text-gray-100">{entities?.diseases?.length ? entities!.diseases!.join(", ") : "—"}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-2">Procedures</p>
              <p className="text-gray-100">{entities?.procedures?.length ? entities!.procedures!.join(", ") : "—"}</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-400 mb-2">Transcribed Notes</p>
            <div className="roboto-transcript w-full p-4 bg-gray-900 border border-gray-700 rounded-md text-gray-100">
              {(text || "").split("\n").map((line, i) => (
                <p key={i} className="mb-1">{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Transcript Editor */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          {/* --- MODIFIED FOR RESPONSIVENESS --- */}
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
            <h3 className="font-semibold text-lg text-gray-200">Transcript Editor</h3>
            {/* This button group now wraps and aligns left on mobile, right on desktop */}
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              <button
                onClick={handleDownload}
                disabled={!text || processing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${!text || processing ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 text-gray-200"}`}
              >
                <IconDownload className="w-4 h-4" /> Download
              </button>
              <button
                onClick={handlePrint}
                disabled={!text || processing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${!text || processing ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-700 hover:bg-gray-600 text-gray-200"}`}
              >
                <IconPrinter className="w-4 h-4" /> Print
              </button>
              {/* NEW: Prescription actions */}
              <button
                onClick={handleDownloadPrescription}
                disabled={!text || processing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${!text || processing ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
              >
                <IconDownload className="w-4 h-4" /> Prescription (Download)
              </button>
              <button
                onClick={handlePrintPrescription}
                disabled={!text || processing}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                            ${!text || processing ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700 text-white"}`}
              >
                <IconPrinter className="w-4 h-4" /> Prescription (Print)
              </button>
            </div>
          </div>
          {/* --- END OF MODIFICATION --- */}
          
          {/* NEW: Entities summary shown before text */}
          <div className="space-y-3 mb-4">
            {languageCode && (
              <div className="text-xs text-gray-400">Language: {languageCode}</div>
            )}
            {entities && (
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-300">Diseases</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(entities.diseases || []).length ? (entities.diseases || []).map((d: string, i: number) => (
                      <span key={`d-${i}`} className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-200">{d}</span>
                    )) : <span className="text-xs text-gray-500">None</span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Symptoms</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(entities.symptoms || []).length ? (entities.symptoms || []).map((s: string, i: number) => (
                      <span key={`s-${i}`} className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-200">{s}</span>
                    )) : <span className="text-xs text-gray-500">None</span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Medications</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(entities.medications || []).length ? (entities.medications || []).map((m: string, i: number) => (
                      <span key={`m-${i}`} className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-200">{m}</span>
                    )) : <span className="text-xs text-gray-500">None</span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Procedures</p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {(entities.procedures || []).length ? (entities.procedures || []).map((p: string, i: number) => (
                      <span key={`p-${i}`} className="px-2 py-1 text-xs rounded bg-gray-700 text-gray-200">{p}</span>
                    )) : <span className="text-xs text-gray-500">None</span>}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Other Entities (Word • Type • Confidence)</p>
                  <div className="mt-2 overflow-x-auto">
                    <table className="min-w-full text-xs text-left">
                      <thead>
                        <tr className="text-gray-400">
                          <th className="py-2 pr-4">Word</th>
                          <th className="py-2 pr-4">Type</th>
                          <th className="py-2 pr-4">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(entities.other || []).length ? (entities.other || []).map((o: OtherEntity, i: number) => (
                          <tr key={`o-${i}`} className="border-t border-gray-700">
                            <td className="py-2 pr-4 text-gray-200">{o.word}</td>
                            <td className="py-2 pr-4 text-gray-200">{o.type}</td>
                            <td className="py-2 pr-4 text-gray-200">{typeof o.confidence === 'number' ? `${(o.confidence * 100).toFixed(1)}%` : '-'}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td className="py-2 pr-4 text-gray-500" colSpan={3}>None</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="roboto-transcript w-full h-80 p-4 bg-gray-900 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-y"
            placeholder="Your transcribed text will appear here..."
          />
        </div>
      </main>
    </div>
  );
}