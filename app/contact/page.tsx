import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-mono">
      <Link href="/" className="text-xs font-mono border-b border-black pb-1 hover:text-stone-500 transition-colors uppercase block mb-12 w-fit">
        &lt; Return
      </Link>
      <div className="max-w-xl mx-auto space-y-8 mt-24">
        <h1 className="text-2xl font-bold tracking-widest uppercase">Contact</h1>
        <p className="text-sm">For inquiries regarding the archive, access protocols, or general support, reach out securely.</p>
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-stone-500">Email: transmission@0xbad.com</p>
          <p className="text-xs uppercase tracking-widest text-stone-500">Signal: +1 000 000 0000</p>
        </div>
      </div>
    </div>
  );
}