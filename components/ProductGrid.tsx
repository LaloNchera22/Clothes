'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface Product {
  id: string
  code: string
  name: string
  price: number
  is_restricted: boolean
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [secretCode, setSecretCode] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter()

  const handleProductClick = (product: Product) => {
    if (product.code === 'BEANIE-01') {
      setIsModalOpen(true)
    } else if (isUnlocked && product.is_restricted) {
      // Allow purchase logic for restricted items
      alert('Purchasing restricted item: ' + product.code)
    }
  }

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Call API to create Stripe session
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'BEANIE-01' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create checkout session', data)
        alert('Checkout failed: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      alert('Error connecting to checkout service')
    } finally {
        setLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secretCode) return

    setVerifying(true)
    try {
        const res = await fetch('/api/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: secretCode }),
        })
        const data = await res.json()

        if (data.valid) {
             setIsUnlocked(true)
             alert('ACCESS GRANTED')
        } else {
            alert('INVALID CODE')
        }
    } catch (error) {
        console.error('Error verifying code:', error)
        alert('System Error')
    } finally {
        setVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black font-mono p-0">
      <header className="p-4 flex justify-between items-center border-b border-black">
        <h1 className="text-xl font-bold tracking-tighter">0xBAD CLOTHES</h1>
        <form onSubmit={handleCodeSubmit} className="flex gap-2 items-center">
            <span className="text-xs hidden md:inline">ENTER_ACCESS_CODE:</span>
          <input
            type="text"
            placeholder="______"
            value={secretCode}
            onChange={(e) => setSecretCode(e.target.value.toUpperCase())}
            disabled={verifying}
            maxLength={6}
            className="border-b border-black p-1 text-sm outline-none placeholder:text-gray-400 w-24 bg-transparent focus:bg-black focus:text-white transition-colors text-center uppercase disabled:opacity-50"
          />
        </form>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black">
        {products.map((product, index) => {
            const isClickable = product.code === 'BEANIE-01' || (isUnlocked && product.is_restricted)
            return (
                <div
                    key={product.id}
                    className={`
                    relative p-8 border-r border-black h-64 flex flex-col justify-between group
                    ${(index + 1) % 3 === 0 ? 'md:border-r-0' : ''}
                    ${index === products.length - 1 ? 'border-b-0' : 'border-b md:border-b-0'}
                    /* Mobile: all have bottom border except last. Desktop: bottom border handled by grid wrapper? No, handled by individual cells usually */
                    border-b md:border-b-0
                    ${isClickable ? 'cursor-pointer hover:bg-black hover:text-white' : 'cursor-default'}
                    transition-colors duration-0
                    `}
                    onClick={() => handleProductClick(product)}
                >
                    <div className="text-2xl font-bold tracking-widest">{product.code}</div>

                    <div className="flex justify-between items-end w-full">
                        <span className="text-sm uppercase">{product.name}</span>
                        <span className="text-sm font-bold">
                            {product.is_restricted && !isUnlocked ? 'LOCKED' : `$${product.price}`}
                        </span>
                    </div>
                </div>
            )
        })}
      </div>

        {/* Footer / Status Line */}
        <div className="p-4 text-xs border-t border-black flex justify-between">
            <span>STATUS: ONLINE</span>
            <span>{isUnlocked ? 'ACCESS: GRANTED' : 'ACCESS: RESTRICTED'}</span>
        </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-[2px] flex items-center justify-center z-50" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white border-[1px] border-black p-6 w-full max-w-md shadow-none relative" onClick={(e) => e.stopPropagation()}>
            <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-xl leading-none hover:text-gray-500"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 font-mono tracking-tighter">PURCHASE_BEANIE-01</h2>
            <div className="space-y-4 mb-8 text-sm font-mono">
                <p>ITEM: BEANIE-01</p>
                <p>PRICE: $20.00</p>
                <p className="pt-4 border-t border-dashed border-black">
                    NOTE: PURCHASING THIS ITEM WILL GRANT YOU 2 UNIQUE ACCESS CODES TO UNLOCK THE RESTRICTED ARCHIVE.
                </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-black text-white py-4 hover:bg-white hover:text-black border border-black transition-colors font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'PROCESSING...' : 'INITIATE_TRANSACTION'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
