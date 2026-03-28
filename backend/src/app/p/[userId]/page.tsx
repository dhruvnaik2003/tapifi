import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Phone, MessageCircle, Mail, Globe, Music, Link as LinkIcon } from 'lucide-react';

const BrandInstagram = ({ className }: any) => (
  <img 
    src="/brands/instagram.svg" 
    alt="Instagram Logo" 
    className={className || "w-[32px] h-[32px]"} 
    style={{ objectFit: 'contain' }}
  />
);

const BrandSnapchat = ({ className }: any) => (
  <img 
    src="/brands/snapchat.svg" 
    alt="Snapchat Logo" 
    className={className || "w-[32px] h-[32px]"} 
    style={{ objectFit: 'contain' }}
  />
);

const BrandWhatsApp = ({ className }: any) => (
  <img 
    src="/brands/whatsapp.svg" 
    alt="WhatsApp Logo" 
    className={className || "w-[32px] h-[32px]"} 
    style={{ objectFit: 'contain' }}
  />
);

const BrandSpotify = ({ className }: any) => (
  <img 
    src="/brands/spotify.svg" 
    alt="Spotify Logo" 
    className={className || "w-[32px] h-[32px]"} 
    style={{ objectFit: 'contain' }}
  />
);

const BrandFacebook = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="12" r="10" fill="#1877F2"/>
    <path d="M13 10h2l-.5 3h-1.5v7h-3v-7h-1.5v-3h1.5v-1.5c0-1.5 1-2.5 2.5-2.5h2v3h-1c-.5 0-1 .5-1 1V10z" fill="#FFF"/>
  </svg>
);

const BrandLinkedin = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#0A66C2"/>
    <path d="M8 19H5V10h3v9zM6.5 8.5A1.5 1.5 0 1 1 8 7a1.5 1.5 0 0 1-1.5 1.5zM19 19h-3v-4.5c0-1.2-.5-2-1.5-2s-1.5.8-1.5 2V19h-3V10h3v1.5c.5-1 2-1.5 3-1.5 2 0 3 1.5 3 4.5V19z" fill="#FFF"/>
  </svg>
);

const BrandTwitter = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#000" stroke="#333" strokeWidth="1"/>
    <path d="M15 7h2L12 11.5 17 17h-4.5l-3-4-3.5 4H4l4.5-5L4 7h4l2.5 3.5L15 7z" fill="#FFF"/>
  </svg>
);

const BrandYoutube = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000"/>
    <polygon points="10 9 15.5 12 10 15 10 9" fill="#FFF"/>
  </svg>
);

const BrandGithub = (props: any) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 2A10 10 0 0 0 8.8 21.5c.5.1.7-.2.7-.5v-2c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1 .6-1.3-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.2-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a10 10 0 0 1 5 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.5.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.5 5 .3.3.6.8.6 1.6v2.4c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="#FFF"/>
  </svg>
);

const getPlatformIcon = (platform: string, className: string) => {
  const props = { className, strokeWidth: 2 };
  switch (platform) {
    case 'phone': return <Phone {...props} />;
    case 'whatsapp': return <BrandWhatsApp {...props} />;
    case 'email': return <Mail {...props} />;
    case 'instagram': return <BrandInstagram {...props} />;
    case 'facebook': return <BrandFacebook {...props} />;
    case 'linkedin': return <BrandLinkedin {...props} />;
    case 'twitter': return <BrandTwitter {...props} />;
    case 'youtube': return <BrandYoutube {...props} />;
    case 'snapchat': return <BrandSnapchat {...props} />;
    case 'spotify': return <BrandSpotify {...props} />;
    case 'github': return <BrandGithub {...props} />;
    case 'customurl': return <Globe {...props} />;
    default: return <LinkIcon {...props} />;
  }
};

type Props = {
  params: Promise<{ userId: string }>;
};

// Generate dynamic metadata for SEO and rich link previews
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const user = await prisma.user.findUnique({ where: { id: resolvedParams.userId } });
  if (!user) return { title: 'Not Found | Tapifi' };
  
  return {
    title: `${user.firstName} ${user.lastName} | Tapifi`,
    description: user.bio || `Check out ${user.firstName}'s digital profile on Tapifi.`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const resolvedParams = await params;
  const user = await prisma.user.findUnique({
    where: { id: resolvedParams.userId },
    include: { links: true },
  });

  if (!user) {
    return notFound();
  }

  // Gatekeeping Private Profiles
  if (!user.isProfileActive) {
    return (
      <main className="min-h-[100dvh] bg-[#111111] text-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-[#1A1A1C] border border-[#2C2C2E] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-black/50">
          <svg className="w-8 h-8 text-[#A0A0A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h1 className="text-2xl font-bold mb-2">Profile Private</h1>
        <p className="text-[#A0A0A0] text-center max-w-[260px]">This Tapifi profile is currently hidden by the owner.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-[#111111] text-white py-16 px-6 flex flex-col items-center">
      <div 
        className="w-full max-w-sm flex flex-col items-center" 
        style={{ animation: 'fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Avatar Area with Glow */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-[#E50914] rounded-full blur-[24px] opacity-25"></div>
          {user.pfpUrl ? (
            <img 
              src={user.pfpUrl} 
              alt={user.firstName} 
              className="w-[110px] h-[110px] rounded-full border border-[#2C2C2E] object-cover relative z-10 shadow-2xl" 
            />
          ) : (
            <div className="w-[110px] h-[110px] rounded-full border border-[#2C2C2E] bg-[#1A1A1C] flex items-center justify-center relative z-10 shadow-2xl">
              <span className="text-4xl font-bold text-white tracking-tight">{user.firstName[0]}{user.lastName[0]}</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <h1 className="text-[28px] font-bold mb-1 tracking-tight text-center">{user.firstName} {user.lastName}</h1>
        {user.bio ? (
          <p className="text-[#A0A0A0] text-center mb-8 px-2 leading-relaxed text-[15px]">{user.bio}</p>
        ) : (
          <div className="mb-8"></div>
        )}

        {/* Dynamic Interactive Link Cards */}
        <div className="w-full flex flex-col gap-[14px] mb-16">
          {user.links.length === 0 ? (
            <p className="text-[#A0A0A0] text-center italic text-sm py-4">No public links added yet.</p>
          ) : (
            user.links
              .filter(link => 
                user.activeProfile === 'professional' ? link.showInProfessionalProfile : link.showInPersonalProfile
              )
              .map((link) => (
                <a 
                  key={link.id} 
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full bg-[#1A1A1C] border border-[#2C2C2E] hover:border-[#E50914]/40 rounded-2xl p-[14px] px-4 flex items-center justify-between transition-all duration-300 hover:bg-[#1f1f21] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111111] border border-[#2C2C2E] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                      {/* Platform Logo */}
                      {getPlatformIcon(link.platform, "w-[32px] h-[32px]")}
                    </div>
                    <span className="font-semibold text-[15px] text-[#F3F3F3] tracking-wide mt-1 capitalize">{link.displayName || link.platform}</span>
                  </div>
                  <svg className="w-5 h-5 text-[#505050] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </a>
            ))
          )}
        </div>

        {/* TAPIFI Sales CTA & Footer */}
        <div className="mt-8 w-full flex flex-col items-center pt-8 border-t border-[#2C2C2E]/40">
          <h3 className="text-[15px] font-semibold text-[#F3F3F3] mb-4 tracking-wide text-center">
            Get your TAPIFI Chip now
          </h3>
          <a 
            href="https://tapifi.in"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[240px] bg-[#E50914] text-white font-bold text-[13px] tracking-widest text-center py-3.5 rounded-full hover:bg-[#ff1520] transition-colors shadow-lg shadow-[#E50914]/20 active:scale-95"
          >
            BUY NOW
          </a>
          
          {/* Subtle Branding */}
          <div className="mt-8 flex flex-col items-center">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#A0A0A0] mb-2 opacity-50">Powered By</span>
            <img src="/logo.png" alt="Tapifi Logo" className="w-[100px] h-auto opacity-90" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </main>
  );
}
