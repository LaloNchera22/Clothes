import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="w-full shrink-0 flex justify-between items-center px-8 lg:px-16 py-4 z-20 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-primary"></div>
          <h1 className="text-[10px] font-black tracking-[0.5em] uppercase">A0_BADX PROYECT COMPANY</h1>
        </div>
        <nav className="hidden md:flex gap-16">
          <Link className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-stone-400 transition-colors" href="/archive">Archive</Link>
          <Link className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-stone-400 transition-colors" href="/contact">Contact</Link>
          <Link className="text-[10px] font-bold uppercase tracking-[0.3em] hover:text-stone-400 transition-colors" href="/account">Account</Link>
        </nav>
      </header>

      <main className="flex-1 min-h-0 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-[1400px] h-full flex flex-col items-center justify-center gap-8 lg:gap-16 bg-white">

          <div className="flex flex-col items-center text-center justify-center p-4 lg:p-8 bg-white min-h-0">
            <div className="space-y-8 flex flex-col items-center">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-stone-400 block">Access</span>
              </div>
              <div className="w-12 h-[2px] bg-primary"></div>
              <p className="text-[12px] lg:text-[14px] font-normal leading-loose text-stone-500 max-w-[600px] mx-auto text-center">
                Access to the complete repertoire of our limited-time monthly release is granted exclusively through a purchase code. Upon purchasing a product, you will receive 3 codes. We produce only 100 units of each drop, and the sole continuously available item is the beanie.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4">
              <Link href="/archive" className="group relative flex items-center justify-between w-full bg-primary text-white py-6 px-8 overflow-hidden transition-all hover:bg-stone-900 block">
                <span className="text-[11px] font-black tracking-[0.4em] uppercase relative z-10">Acquire Access</span>
                <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-2 relative z-10">arrow_forward</span>
              </Link>
              <div className="flex justify-between items-center px-2">
                <Link href="/details" className="flex items-center py-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors text-stone-400 hover:text-primary block">
                  Details
                </Link>
                <Link href="/terms" className="flex items-center py-2 text-[10px] font-bold uppercase tracking-[0.4em] transition-colors text-stone-400 hover:text-primary block">
                  Terms
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="w-full shrink-0 flex flex-col md:flex-row justify-between items-center px-8 lg:px-16 py-4 text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase bg-white z-20">
        <div className="flex gap-16 items-center mb-6 md:mb-0">
          <span className="text-primary">© 24 A0_BADX PROYECT COMPANY</span>
          <span className="hidden md:inline">Universal Access Protocol</span>
        </div>
        <div className="flex gap-12 items-center">
          <a className="hover:text-primary transition-colors" href="#">IG</a>
          <a className="hover:text-primary transition-colors" href="#">TW</a>
          <div className="flex items-center gap-3 ml-4 border-l brutalist-border-light pl-8">
            <span className="material-symbols-outlined text-[14px] text-primary">lock</span>
            <span className="text-primary">Secured</span>
          </div>
        </div>
      </footer>
    </>
  );
}
