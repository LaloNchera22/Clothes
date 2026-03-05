import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-mono">
      <Link href="/" className="text-xs font-mono border-b border-black pb-1 hover:text-stone-500 transition-colors uppercase block mb-12 w-fit">
        &lt; Return
      </Link>
      <div className="max-w-xl mx-auto space-y-8 mt-24">
        <h1 className="text-2xl font-bold tracking-widest uppercase">Account Authentication</h1>
        <p className="text-sm">Enter your credentials to manage your digital ecosystem presence.</p>
        <form className="space-y-6">
          <input type="text" placeholder="ID_IDENTIFIER" className="w-full border-b border-black bg-transparent p-2 outline-none uppercase text-sm placeholder:text-stone-400" />
          <input type="password" placeholder="SECURITY_KEY" className="w-full border-b border-black bg-transparent p-2 outline-none uppercase text-sm placeholder:text-stone-400" />
          <button type="button" className="bg-black text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors">Authenticate</button>
        </form>
      </div>
    </div>
  );
}