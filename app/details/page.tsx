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
          <p>La arquitectura A0_BADX es un protocolo experimental que une artefactos físicos con acceso digital. Para acceder a todo el repertorio del lanzamiento mensual por tiempo limitado es solo con un código de compra. Al comprar un producto te llegan 3 códigos. Solo producimos 100 de cada drop y el único que se repite siempre es el gorro. Los códigos de acceso son de un solo uso e intransferibles.</p>
        </div>
      </div>
    </div>
  );
}