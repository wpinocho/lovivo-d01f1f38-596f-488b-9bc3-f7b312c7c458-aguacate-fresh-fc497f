import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  weight: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Aguacate Hass Premium",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    description: "Aguacates Hass de primera calidad, cremosos y perfectos para cualquier ocasión.",
    weight: "200-250g"
  },
  {
    id: 2,
    name: "Aguacate Orgánico",
    price: 3.20,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&h=300&fit=crop",
    description: "Aguacates cultivados orgánicamente, sin pesticidas ni químicos.",
    weight: "180-220g"
  },
  {
    id: 3,
    name: "Aguacate Jumbo",
    price: 4.00,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    description: "Aguacates de tamaño extra grande, ideales para compartir.",
    weight: "300-400g"
  },
  {
    id: 4,
    name: "Pack Familiar",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    description: "Pack de 6 aguacates Hass seleccionados para toda la familia.",
    weight: "6 unidades"
  },
  {
    id: 5,
    name: "Aguacate Baby",
    price: 1.80,
    image: "https://images.unsplash.com/photo-1583286814049-c7e17c8b4b0c?w=400&h=300&fit=crop",
    description: "Aguacates pequeños perfectos para porciones individuales.",
    weight: "120-150g"
  },
  {
    id: 6,
    name: "Aguacate Maduro",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    description: "Aguacates en punto perfecto de maduración, listos para consumir.",
    weight: "200-250g"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log("Index component rendered with cart items:", cartItems);

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Updated cart items (existing item):", updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log("Updated cart items (new item):", newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Removing product from cart:", productId);
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log("Updated cart items after removal:", updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log("Updating quantity for product:", productId, "to:", quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      );
      console.log("Updated cart items after quantity change:", updatedItems);
      return updatedItems;
    });
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">🥑 AguacateStore</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Los mejores aguacates frescos y orgánicos, directamente del huerto a tu mesa
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-800 hover:bg-green-50"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Productos
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Productos</h2>
              <p className="text-gray-600 text-lg">Selección premium de aguacates frescos</p>
            </div>
            
            {/* Cart Button */}
            <Button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Carrito ({getTotalItems()})
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">🥑 AguacateStore</h3>
          <p className="text-green-200 mb-4">
            Comprometidos con la calidad y frescura de nuestros productos
          </p>
          <p className="text-green-300">
            © 2024 AguacateStore. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;