import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Weight } from "lucide-react";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  console.log("ProductCard rendered for product:", product.name);

  const handleAddToCart = () => {
    console.log("Add to cart clicked for product:", product.name);
    onAddToCart(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-green-600">
          ${product.price.toFixed(2)}
        </Badge>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{product.name}</CardTitle>
        <CardDescription className="text-gray-600">
          {product.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Weight className="h-4 w-4" />
          <span>{product.weight}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};