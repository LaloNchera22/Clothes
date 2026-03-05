import ProductGrid, { Product } from "../../components/ProductGrid";

const mockProducts: Product[] = [
  { id: '1', code: 'BEANIE-01', name: 'Initial Beanie', price: 20.00, is_restricted: false, image: '/Gemini_Generated_Image_lbbn0tlbbn0tlbbn.png' },
  { id: '2', code: 'AW24-JKT', name: 'Nylon Shell', price: 150.00, is_restricted: true, image: '/Gemini_Generated_Image_isfjitisfjitisfj.png' },
  { id: '3', code: 'AW24-PNT', name: 'Cargo Pants', price: 120.00, is_restricted: true, image: '/Gemini_Generated_Image_8ytcdw8ytcdw8ytc.png' },
];

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-white text-black relative">
      <ProductGrid products={mockProducts} />
    </div>
  );
}
