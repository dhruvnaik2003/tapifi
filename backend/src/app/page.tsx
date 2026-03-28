import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0D0D0F] text-white selection:bg-red-500/30 selection:text-red-500 overflow-x-hidden">
      {/* Abstract Background Glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0D0D0F]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center justify-center translate-y-1">
              <svg 
                width="32" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ff0000" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.5 16.1a5 5 0 0 1 7 0" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#ff0000] uppercase italic">
              Tapifi
            </span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/admin/inventory" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Inventory
            </Link>
            <Link 
              href="#download" 
              className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-colors"
            >
              Get the App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 text-xs font-bold uppercase tracking-widest leading-none">
              The Future of Networking
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              Tap. Connect. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Share Anytime.</span>
            </h1>
            <p className="max-w-md text-lg text-zinc-400 leading-relaxed font-medium">
              Swap business cards with a single tap. Tapifi is the smartest, fastest, and only eco-friendly way to connect on the go.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="h-14 px-8 bg-red-600 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] hover:scale-[1.02] active:scale-95">
                Download Tapifi
              </button>
              <button className="h-14 px-8 border border-white/10 glass rounded-2xl font-bold text-lg hover:border-white/20 transition-all hover:scale-[1.02] active:scale-95">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-150">
            <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full scale-75 translate-x-12 translate-y-12" />
            <div className="relative group perspective-1000">
               <Image
                src="/hero.png"
                alt="Tapifi Product Mockup"
                width={800}
                height={600}
                className="w-full h-auto rounded-3xl neon-border transition-transform duration-500 hover:scale-[1.01]"
                priority
              />
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <section className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-3 gap-8">
          <div className="p-10 glass rounded-[2.5rem] border-white/5 space-y-4 hover:border-red-500/20 transition-colors duration-500 group">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 className="text-2xl font-bold">No App Needed</h3>
            <p className="text-zinc-400 font-medium">Recipients can see your profile instantly just by tapping your chip. No extra hardware or app software required.</p>
          </div>

          <div className="p-10 glass rounded-[2.5rem] border-white/5 space-y-4 hover:border-red-500/20 transition-colors duration-500 group">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Encrypted Profiles</h3>
            <p className="text-zinc-400 font-medium">Your data is yours. Manage what you share and who you share it with using our industry-leading encryption.</p>
          </div>

          <div className="p-10 glass rounded-[2.5rem] border-white/5 space-y-4 hover:border-red-500/20 transition-colors duration-500 group">
            <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Smart Switching</h3>
            <p className="text-zinc-400 font-medium">Instantly switch between your Personal and Professional profiles with a single click in the Tapifi app.</p>
          </div>
        </section>

        {/* Call to Action Section */}
        <section id="download" className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="p-16 neon-border bg-gradient-to-b from-red-600/10 to-transparent rounded-[3rem] space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to join the future <br /> of networking?</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Download the Tapifi App on iOS and Android to manage your smart chips and customize your digital presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
              <div className="h-14 w-44 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center font-bold text-sm hover:border-white/20 transition-all cursor-pointer">
                App Store
              </div>
              <div className="h-14 w-44 bg-zinc-900 border border-white/10 rounded-xl flex items-center justify-center font-bold text-sm hover:border-white/20 transition-all cursor-pointer">
                Google Play
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-[#0D0D0F]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            <svg 
              width="24" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#ff0000" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.5 16.1a5 5 0 0 1 7 0" />
            </svg>
            <span className="text-lg font-black tracking-tighter text-[#ff0000] uppercase italic">
              Tapifi
            </span>
            <div className="text-zinc-500 font-medium text-xs ml-2">
              © 2026 Smart Products
            </div>
          </div>
          <div className="flex gap-8 text-zinc-500 font-medium text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
