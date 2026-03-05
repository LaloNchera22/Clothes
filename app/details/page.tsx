import Link from "next/link";

export default function DetailsPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-mono">
      <Link href="/" className="text-xs font-mono border-b border-black pb-1 hover:text-stone-500 transition-colors uppercase block mb-12 w-fit">
        &lt; Return
      </Link>
      <div className="max-w-xl mx-auto space-y-8 mt-24">
        <h1 className="text-2xl font-bold tracking-widest uppercase">System Details</h1>
        <div className="space-y-4 text-sm leading-relaxed">
          <p>The A0_BADX architecture is an experimental protocol bridging physical artifacts with digital access. Access to the complete repertoire of our limited-time monthly release is granted exclusively through a purchase code. Upon purchasing a product, you will receive 3 codes. We produce only 100 units of each drop, and the sole continuously available item is the beanie. Access codes are single-use and non-transferable.</p>
        </div>
      </div>
    </div>
  );
}