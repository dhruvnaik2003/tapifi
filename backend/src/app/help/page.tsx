import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-red-500/30 selection:text-red-500 pt-20">
      {/* Background Glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-sky-600/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
             <svg 
              width="28" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ff0000" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.5 16.1a5 5 0 0 1 7 0" />
            </svg>
            <span className="text-xl font-black tracking-tighter text-[#ff0000] uppercase italic">
              Tapifi
            </span>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/help" className="text-sm font-medium text-white transition-colors underline decoration-red-500 underline-offset-8">
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Help Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative z-10">
        <div className="text-center space-y-6 mb-12 animate-in fade-in duration-700">
           <svg 
              width="48" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ff0000" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mx-auto mb-8 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.5 16.1a5 5 0 0 1 7 0" />
            </svg>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Help & Support</h1>
          <p className="text-xl text-slate-400 font-medium">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="w-full max-w-2xl p-12 bg-[#0D1117] border border-white/5 shadow-2xl rounded-[2.5rem] text-center space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
          <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
            For any questions, support requests, or feedback, please reach out to our team at:  <br />
            <span className="block mt-4 text-[#ff0000] font-black text-2xl md:text-3xl hover:scale-105 transition-transform cursor-default">
              support@tapifi.in
            </span>
          </p>
          <p className="text-lg text-slate-500 font-medium">
            Our support team will get back to you as soon as possible.
          </p>
          
          <div className="pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 active:scale-95 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-white/5 bg-[#020617]">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex items-center gap-3">
             <svg 
              width="24" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ff0000" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.5 16.1a5 5 0 0 1 7 0" />
            </svg>
            <span className="text-2xl font-black tracking-tighter text-[#ff0000] uppercase italic">
              Tapifi
            </span>
          </div>
          <div className="flex items-center gap-12 text-sm font-bold text-zinc-500 tracking-wider uppercase">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/help" className="hover:text-white transition-colors">Support</Link>
          </div>
        </div>
        <div className="text-center mt-12 text-zinc-600 text-xs font-medium">
          © 2026 Tapifi. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
