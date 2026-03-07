import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import AddToCartButton from "@/components/AddToCartButton";

const featuredProducts = [
  {
    id: 1,
    name: "Midnight Bloom",
    gender: "Women",
    price: 125.00,
    image: "/products/women-1.jpg" // placeholder
  },
  {
    id: 2,
    name: "Oud Wood Reserve",
    gender: "Men",
    price: 145.00,
    image: "/products/men-1.jpg"
  },
  {
    id: 3,
    name: "Oceanic Vetiver",
    gender: "Men",
    price: 95.00,
    image: "/products/men-2.jpg"
  },
  {
    id: 4,
    name: "Spiced Leather",
    gender: "Men",
    price: 110.00,
    image: "/products/men-3.jpg"
  },
  {
    id: 5,
    name: "Noir Absolute",
    gender: "Men",
    price: 130.00,
    image: "/products/men-4.jpg"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      {/* On mobile: 720x1080 aspect ratio (2/3) */}
      {/* On desktop: 1080x720 aspect ratio (3/2) */}
      <section className="relative w-full overflow-hidden flex items-center bg-gray-900 aspect-[2/3] md:aspect-[3/2] max-h-[85vh]">

        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          {/* Real image will be mounted here 
             <Image src="/hero-image.jpg" alt="Luxury Fragrance Collection" fill className="object-cover -z-10" priority />
          */}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-16 max-w-7xl mx-auto flex flex-col justify-end md:justify-center h-full pb-20 md:pb-0">
          <div className="max-w-xl text-center md:text-left space-y-6">
            <span className="text-gray-300 tracking-[0.3em] text-xs uppercase font-medium">New Arrivals 2026</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-wider leading-tight drop-shadow-lg">
              Discover Your <br className="hidden md:block" /> Signature
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-light drop-shadow-md">
              An exclusive collection of premium fragrances designed to leave a lasting impression.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="#featured" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                Shop Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-widest mb-4">Find Your Signature</h2>
            <div className="w-16 h-1 bg-black mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white p-4 shadow-sm hover:shadow-xl transition-all duration-300">

                {/* Product Image Container */}
                <div className="relative aspect-[3/4] mb-6 bg-gray-100 overflow-hidden cursor-pointer group-hover:opacity-90 transition-opacity">
                  {/* <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" /> */}

                  {/* Placeholder text logic */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif text-xs uppercase tracking-widest">
                    {product.name} <br /> Image
                  </div>

                  {/* Quick Add Overlay */}
                  <AddToCartButton product={product} />
                </div>

                {/* Product Details */}
                <div className="text-center flex-grow flex flex-col justify-end">
                  <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">{product.gender}</span>
                  <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-gray-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
