import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-red-500/30 selection:text-red-500 overflow-x-hidden pt-20">
      {/* Background Glow */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
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
            <Link href="/help" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.1] text-glow">
            Your Digital Identity, <br />
            <span className="text-white">Reimagined.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">
            The Tapifi chip comes on a sleek black card, perfect for your wallet. 
            You can also peel off the chip and stick it to your phone, laptop, or 
            anything else. It instantly shares your contact info, social profiles, 
            websites, and more.
          </p>
          <div className="flex justify-center pt-8">
            <button className="h-16 px-10 bg-[#ff0000] rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,0,0,0.3)] flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.71a2 2 0 0 0 2-1.61l1.71-8.4H5.75"/></svg>
              Get your Tapifi chip
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center space-y-4 mb-20 animate-in fade-in duration-1000">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Why You'll Love Tapifi</h2>
          <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto">Everything you need to make a lasting impression, packed into one smart chip.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl space-y-6 hover:border-red-500/20 transition-all group">
            <div className="w-12 h-12 bg-red-900/10 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h8l-10 10 2-10H3Z"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Instant Sharing</h3>
            <p className="text-slate-400 font-medium leading-relaxed">No apps needed. Just tap your chip on any compatible smartphone to instantly open your profile.</p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl space-y-6 hover:border-red-500/20 transition-all group">
            <div className="w-12 h-12 bg-red-900/10 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Dual Profiles</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Switch between a professional and personal profile on the fly. Keep your work and play separate.</p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl space-y-6 hover:border-red-500/20 transition-all group">
             <div className="w-12 h-12 bg-red-900/10 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Customizable Profile</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Your digital profile is yours to design. Add your contact info, websites, social media links, payment apps, and more.</p>
          </div>

          {/* Card 4 */}
          <div className="p-8 bg-[#0D1117] border border-white/5 rounded-2xl space-y-6 hover:border-red-500/20 transition-all group">
             <div className="w-12 h-12 bg-red-900/10 border border-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9"/><line x1="3" x2="21" y1="15"/><line x1="9" x2="9" y1="3"/><line x1="15" x2="15" y1="3"/></svg>
            </div>
            <h3 className="text-2xl font-bold">Card or Sticker</h3>
            <p className="text-slate-400 font-medium leading-relaxed">Use it as a card for your wallet, or peel off the chip and stick it on your phone, laptop, or anywhere else.</p>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Seamless Integration</h2>
          <p className="text-xl text-slate-400 font-medium leading-relaxed">
            The Tapifi chip comes on a sleek card but can be peeled off and 
            attached to anything. Your phone, your laptop, your badge holder—
            turn any item into your digital business card.
          </p>
          <button className="h-14 px-8 border border-white/10 glass rounded-xl font-bold text-lg hover:border-white/20 hover:scale-105 active:scale-95 transition-all">
            Learn More & Purchase
          </button>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-red-600/10 blur-[100px] rounded-full scale-90 translate-x-12 translate-y-12" />
          <Image
            src="/sticker.png"
            alt="Tapifi Chip as a sticker on a phone"
            width={800}
            height={600}
            className="w-full h-auto rounded-3xl neon-border transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </section>

       {/* Ready Section */}
       <section className="relative z-10 max-w-5xl mx-auto px-6 py-40 text-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">Ready to simplify <br /> your digital life?</h2>
            <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto">
              Join thousands of users who have streamlined their networking and social sharing with Tapifi.
            </p>
            <div className="flex justify-center pt-4">
              <button className="h-16 px-10 bg-[#ff0000] rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,0,0,0.3)]">
                Get Your Tapifi Chip Today
              </button>
            </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
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
