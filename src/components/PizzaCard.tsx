import { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Pizza {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  sizes: Array<{
    size: string;
    price: number;
    diameter: number;
  }>;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
}

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard = ({ pizza }: PizzaCardProps) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const selectedSizeData = pizza.sizes[selectedSize];
    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: selectedSizeData.size,
      price: selectedSizeData.price,
      quantity: 1,
      image: pizza.image
    });
    
    toast.success(`${pizza.name} (${selectedSizeData.size}) добавлена в корзину!`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 left-2 bg-red-600">
          {pizza.category}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{pizza.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {pizza.rating} ({pizza.reviewCount})
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {pizza.description}
        </p>
        
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Ингредиенты:</p>
          <p className="text-sm text-gray-700">
            {pizza.ingredients.join(', ')}
          </p>
        </div>
        
        {/* Выбор размера */}
        <div className="mb-4">
          <div className="grid grid-cols-3 gap-2">
            {pizza.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => setSelectedSize(index)}
                className={`p-2 text-xs rounded-md border transition-colors ${
                  selectedSize === index
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium">{size.size}</div>
                <div className="text-gray-500">{size.diameter} см</div>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div>
            <span className="text-xl font-bold text-red-600">
              {pizza.sizes[selectedSize].price} ₽
            </span>
          </div>
          <Button onClick={handleAddToCart} className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-1" />
            В корзину
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PizzaCard;