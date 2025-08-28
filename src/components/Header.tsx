import { Leaf } from "lucide-react";

export const Header = () => {
  console.log("Header component rendered");
  
  return (
    <header className="bg-white shadow-sm border-b border-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">AguacateStore</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#products" className="text-gray-600 hover:text-green-600 transition-colors">
              Productos
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              Sobre Nosotros
            </a>
            <a href="#" className="text-gray-600 hover:text-green-600 transition-colors">
              Contacto
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};