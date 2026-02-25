import ProductGrid, { Product } from '@/components/ProductGrid'
import { supabase } from '@/utils/supabase/server'

export const revalidate = 0

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('code', { ascending: true })

  if (error) {
    console.error('Error fetching products:', error)
  }

  // Fallback if no data (e.g. connection error with mock keys) to ensure UI renders for demo
  // But strictly we rely on DB.
  const productList = (products as Product[]) || []

  return (
    <main className="min-h-screen bg-white">
      <ProductGrid products={productList} />
    </main>
  )
}
