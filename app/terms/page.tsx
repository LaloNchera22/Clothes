import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-mono">
      <Link href="/" className="text-xs font-mono border-b border-black pb-1 hover:text-stone-500 transition-colors uppercase block mb-12 w-fit">
        &lt; Return
      </Link>
      <div className="max-w-xl mx-auto space-y-8 mt-24">
        <h1 className="text-2xl font-bold tracking-widest uppercase">Terms & Conditions</h1>
        <div className="space-y-4 text-sm leading-relaxed text-stone-600">
          <p>By engaging with the A0_BADX PROYECT COMPANY infrastructure, you agree to abide by the following stipulations:</p>
          <ul className="list-disc pl-5 space-y-2">
             <li>The digital or physical reproduction of artifacts is strictly prohibited.</li>
             <li>Access codes cannot be shared or sold. Breach of this protocol will lead to instant termination of network access.</li>
             <li>The archive&apos;s content remains the intellectual property of A0_BADX PROYECT COMPANY.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}