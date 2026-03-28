'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ScannedChip {
  uid: string;
  timestamp: string;
  success: boolean;
  message: string;
}

export default function InventoryPage() {
  const [uid, setUid] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState<ScannedChip[]>([]);
  const [feedback, setFeedback] = useState<'success' | 'error' | 'idle'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep input focused at all times for the scanner
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    
    // Periodically refocus in case of misclicks
    const interval = setInterval(focusInput, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid.trim() || isSaving) return;

    setIsSaving(true);
    const scannedUid = uid.trim();
    setUid(''); // Clear immediately for next scan

    try {
      const res = await fetch('/api/nfc/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: scannedUid }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback('success');
        setHistory((prev) => [
          { uid: scannedUid, timestamp: new Date().toLocaleTimeString(), success: true, message: 'Saved' },
          ...prev.slice(0, 9),
        ]);
      } else {
        setFeedback('error');
        setHistory((prev) => [
          { uid: scannedUid, timestamp: new Date().toLocaleTimeString(), success: false, message: data.error || 'Failed' },
          ...prev.slice(0, 9),
        ]);
      }
    } catch (err) {
      setFeedback('error');
    } finally {
      setIsSaving(false);
      // Reset feedback flash after 1 second
      setTimeout(() => setFeedback('idle'), 1000);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      feedback === 'success' ? 'bg-green-100' : 
      feedback === 'error' ? 'bg-red-100' : 
      'bg-zinc-50 dark:bg-zinc-950'
    }`}>
      <div className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Tapifi Inventory Manager
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Connect your USB scanner and start tapping chips to register them into the system.
          </p>
        </header>

        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 p-8 shadow-xl mb-12">
          <form onSubmit={handleSubmit} className="relative">
            <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">
              Ready to Scan...
            </label>
            <input
              ref={inputRef}
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="TAP CHIP NOW"
              className="w-full text-3xl font-mono tracking-widest p-6 rounded-2xl border-2 border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-all uppercase placeholder:opacity-20"
              autoComplete="off"
            />
            {isSaving && (
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-zinc-900 dark:border-white"></div>
              </div>
            )}
          </form>
          
          <div className="mt-8 flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Scanner Active</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Target Database: production</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-6 flex items-center justify-between text-zinc-900 dark:text-white">
            Recent Scans
            <span className="text-xs font-normal text-zinc-500">{history.length} in this session</span>
          </h2>
          
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
            {history.length > 0 ? (
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">UID</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Time</th>
                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {history.map((item, idx) => (
                    <tr key={idx} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-zinc-900 dark:text-white">{item.uid}</td>
                      <td className="px-6 py-4 text-zinc-500 text-sm">{item.timestamp}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.success ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {item.message}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-zinc-500 dark:text-zinc-600">
                Waiting for the first scan...
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
