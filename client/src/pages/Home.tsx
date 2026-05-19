import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { MessageCircle, Search, ShoppingCart } from "lucide-react";

const WHATSAPP_NUMBER = "+234 802 540 6439";
const WHATSAPP_LINK = "https://wa.me/2348025406439";

const CATEGORIES = ["Panels", "Inverters", "Batteries", "CCTV", "Accessories"] as const;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all products
  const { data: allProducts = [], isLoading } = trpc.products.all.useQuery();

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, searchQuery]);

  const generateWhatsAppMessage = (product: typeof allProducts[0]) => {
    const message = `Hi Btech Energy! I'm interested in the following product:\n\n*${product.name}*\nBrand: ${product.brand}\nPrice: ₦${product.price.toLocaleString()}\n\nPlease provide more details and availability.`;
    return encodeURIComponent(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Btech Energy"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-slate-900">Btech Energy</h1>
              <p className="text-xs text-slate-500">Solar Solutions</p>
            </div>
          </div>
          <a
            href={`${WHATSAPP_LINK}?text=Hello%20Btech%20Energy!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Contact Us</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Premium Solar Energy Solutions
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover high-quality solar panels, inverters, batteries, and CCTV systems
            from trusted brands. Power your future with Btech Energy.
          </p>
          <Button
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Shop Now
          </Button>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b border-slate-200 py-6 sticky top-[72px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search by product name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-2 w-full"
              />
            </div>

            {/* Category Tabs */}
            <Tabs
              value={selectedCategory || "all"}
              onValueChange={(value) =>
                setSelectedCategory(value === "all" ? null : value)
              }
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                {CATEGORIES.map((cat) => (
                  <TabsTrigger key={cat} value={cat}>
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
            {selectedCategory ? `${selectedCategory}` : "All Products"}
            {searchQuery && ` - Search: "${searchQuery}"`}
          </h3>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No products found. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Product Image */}
                  {product.image && (
                    <div className="relative w-full h-48 bg-slate-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  )}

                  {/* Product Info */}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {product.brand}
                        </CardDescription>
                      </div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                        {product.category}
                      </span>
                    </div>
                  </CardHeader>

                  {/* Product Description */}
                  {product.description && (
                    <CardContent className="pb-3">
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {product.description}
                      </p>
                    </CardContent>
                  )}

                  {/* Price and Action */}
                  <div className="mt-auto px-6 pb-6 pt-3 border-t border-slate-200">
                    <div className="mb-4">
                      <p className="text-2xl font-bold text-green-600">
                        ₦{product.price.toLocaleString()}
                      </p>
                      {product.inStock === 0 && (
                        <p className="text-sm text-red-600 font-semibold mt-1">
                          Out of Stock
                        </p>
                      )}
                    </div>
                    <a
                      href={`${WHATSAPP_LINK}?text=${generateWhatsAppMessage(product)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        disabled={product.inStock === 0}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Order on WhatsApp
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">About Btech Energy</h3>
              <p className="text-slate-300 mb-4">
                Btech Energy is your trusted partner for premium solar energy solutions.
                We provide high-quality solar panels, inverters, batteries, and CCTV systems
                from leading global brands at competitive prices.
              </p>
              <p className="text-slate-300 mb-6">
                Our mission is to make renewable energy accessible and affordable for
                homes and businesses across Nigeria.
              </p>
              <div className="space-y-3">
                <p className="text-lg">
                  <span className="font-semibold">WhatsApp:</span> {WHATSAPP_NUMBER}
                </p>
                <p className="text-slate-300">
                  Available 24/7 for inquiries and support
                </p>
              </div>
            </div>
            <div className="bg-slate-800 rounded-lg p-8 text-center">
              <img
                src="/logo.jpg"
                alt="Btech Energy Logo"
                className="h-32 w-auto mx-auto mb-6"
              />
              <h4 className="text-xl font-bold mb-3">Get in Touch</h4>
              <a
                href={`${WHATSAPP_LINK}?text=Hello%20Btech%20Energy!%20I%20would%20like%20to%20know%20more%20about%20your%20products%20and%20services.`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.jpg"
                alt="Btech Energy"
                className="h-8 w-auto"
              />
              <span className="font-semibold text-white">Btech Energy</span>
            </div>
            <p className="text-sm">
              © 2026 Btech Energy. All rights reserved.
            </p>
            <p className="text-sm">
              WhatsApp: <a href={WHATSAPP_LINK} className="text-green-400 hover:text-green-300">
                {WHATSAPP_NUMBER}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
