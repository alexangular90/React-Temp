import { useState } from 'react';
import { Star, Plus, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

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
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDough, setSelectedDough] = useState('традиционное');
  const [selectedCrust, setSelectedCrust] = useState('обычный');
  const { addItem } = useCart();

  const doughOptions = [
    { value: 'традиционное', label: 'Традиционное', price: 0 },
    { value: 'тонкое', label: 'Тонкое', price: 0 },
    { value: 'пышное', label: 'Пышное', price: 50 }
  ];

  const crustOptions = [
    { value: 'обычный', label: 'Обычный', price: 0 },
    { value: 'сырный', label: 'Сырный', price: 100 },
    { value: 'чесночный', label: 'Чесночный', price: 80 }
  ];

  const handleAddToCart = () => {
    const selectedSizeData = pizza.sizes[selectedSize];
    const doughPrice = doughOptions.find(d => d.value === selectedDough)?.price || 0;
    const crustPrice = crustOptions.find(c => c.value === selectedCrust)?.price || 0;
    const totalPrice = selectedSizeData.price + doughPrice + crustPrice;

    const sizeLabel = `${selectedSizeData.size} (${selectedSizeData.diameter}см)`;
    const optionsLabel = selectedDough !== 'традиционное' || selectedCrust !== 'обычный' 
      ? ` • ${selectedDough} тесто • ${selectedCrust} край`
      : '';

    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: sizeLabel + optionsLabel,
      price: totalPrice,
      quantity: 1,
      image: pizza.image
    });
    
    toast.success(`${pizza.name} добавлена в корзину!`);
    setShowDetails(false);
  };

  const quickAddToCart = () => {
    const selectedSizeData = pizza.sizes[selectedSize];
    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: `${selectedSizeData.size} (${selectedSizeData.diameter}см)`,
      price: selectedSizeData.price,
      quantity: 1,
      image: pizza.image
    });
    
    toast.success(`${pizza.name} добавлена в корзину!`);
  };

  const getCurrentPrice = () => {
    const selectedSizeData = pizza.sizes[selectedSize];
    const doughPrice = doughOptions.find(d => d.value === selectedDough)?.price || 0;
    const crustPrice = crustOptions.find(c => c.value === selectedCrust)?.price || 0;
    return selectedSizeData.price + doughPrice + crustPrice;
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative">
          <Link to={`/pizza/${pizza._id}`}>
            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>
          <Badge className="absolute top-2 left-2 bg-red-600">
            {pizza.category}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 bg-white/90 hover:bg-white"
            onClick={() => setShowDetails(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Link to={`/pizza/${pizza._id}`}>
              <h3 className="text-lg font-semibold hover:text-red-600 transition-colors">
                {pizza.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">
                {pizza.rating} ({pizza.reviewCount})
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
            {pizza.description}
          </p>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Ингредиенты:</p>
            <p className="text-sm text-gray-700 line-clamp-2">
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
                от {pizza.sizes[selectedSize].price} ₽
              </span>
            </div>
            <div className="flex space-x-2">
              <Link to={`/pizza/${pizza._id}`}>
                <Button 
                  variant="outline" 
                  size="sm"
                >
                  Подробнее
                </Button>
              </Link>
              <Button 
                onClick={quickAddToCart} 
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                В корзину
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* Модальное окно с деталями */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{pizza.name}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Изображение и основная информация */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className="bg-red-600">{pizza.category}</Badge>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">
                      {pizza.rating} ({pizza.reviewCount} отзывов)
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{pizza.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Ингредиенты:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pizza.ingredients.map((ingredient, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <h4 className="font-semibold mb-3">Выберите размер:</h4>
              <div className="grid grid-cols-3 gap-3">
                {pizza.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedSize === index
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{size.size}</div>
                    <div className="text-sm text-gray-500">{size.diameter} см</div>
                    <div className="font-bold text-red-600">{size.price} ₽</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор теста */}
            <div>
              <h4 className="font-semibold mb-3">Тип теста:</h4>
              <div className="grid grid-cols-3 gap-3">
                {doughOptions.map((dough) => (
                  <button
                    key={dough.value}
                    onClick={() => setSelectedDough(dough.value)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedDough === dough.value
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{dough.label}</div>
                    {dough.price > 0 && (
                      <div className="text-sm text-red-600">+{dough.price} ₽</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор края */}
            <div>
              <h4 className="font-semibold mb-3">Тип края:</h4>
              <div className="grid grid-cols-3 gap-3">
                {crustOptions.map((crust) => (
                  <button
                    key={crust.value}
                    onClick={() => setSelectedCrust(crust.value)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedCrust === crust.value
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{crust.label}</div>
                    {crust.price > 0 && (
                      <div className="text-sm text-red-600">+{crust.price} ₽</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Рекомендуемые дополнения */}
            <div>
              <h4 className="font-semibold mb-3">Рекомендуем добавить:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Кока-кола 0.5л</div>
                  <div className="text-sm text-gray-600">Освежающий напиток</div>
                  <div className="text-red-600 font-bold">120 ₽</div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">Чесночный соус</div>
                  <div className="text-sm text-gray-600">Идеально к пицце</div>
                  <div className="text-red-600 font-bold">50 ₽</div>
                </div>
              </div>
            </div>

            {/* Итоговая цена и кнопка */}
            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {getCurrentPrice()} ₽
                </div>
                <div className="text-sm text-gray-600">
                  {pizza.sizes[selectedSize].size} • {selectedDough} тесто • {selectedCrust} край
                </div>
              </div>
              <div className="flex space-x-2">
                <Link to={`/pizza/${pizza._id}`}>
                  <Button variant="outline">
                    Подробнее
                  </Button>
                </Link>
                <Button 
                  onClick={handleAddToCart}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PizzaCard;