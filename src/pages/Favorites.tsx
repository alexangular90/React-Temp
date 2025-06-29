import { useState, useEffect } from 'react';
import { Heart, Star, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface FavoritePizza {
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
  addedAt: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoritePizza[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { state: authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [authState.isAuthenticated]);

  const loadFavorites = async () => {
    try {
      // Моковые избранные товары
      const mockFavorites: FavoritePizza[] = [
        {
          _id: '1',
          name: 'Маргарита',
          description: 'Классическая итальянская пицца с томатным соусом, моцареллой и базиликом',
          ingredients: ['Томатный соус', 'Моцарелла', 'Базилик', 'Оливковое масло'],
          sizes: [
            { size: 'Маленькая', price: 450, diameter: 25 },
            { size: 'Средняя', price: 650, diameter: 30 },
            { size: 'Большая', price: 850, diameter: 35 }
          ],
          category: 'Вегетарианские',
          image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
          rating: 4.5,
          reviewCount: 128,
          addedAt: '2024-01-15'
        },
        {
          _id: '2',
          name: 'Пепперони',
          description: 'Острая пицца с пикантной колбасой пепперони и сыром моцарелла',
          ingredients: ['Томатный соус', 'Моцарелла', 'Пепперони'],
          sizes: [
            { size: 'Маленькая', price: 550, diameter: 25 },
            { size: 'Средняя', price: 750, diameter: 30 },
            { size: 'Большая', price: 950, diameter: 35 }
          ],
          category: 'Острые',
          image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
          rating: 4.7,
          reviewCount: 95,
          addedAt: '2024-01-10'
        }
      ];
      
      setFavorites(mockFavorites);
    } catch (error) {
      console.error('Ошибка при загрузке избранного:', error);
      toast.error('Ошибка при загрузке избранного');
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = (pizzaId: string) => {
    setFavorites(prev => prev.filter(pizza => pizza._id !== pizzaId));
    toast.success('Удалено из избранного');
  };

  const addToCart = (pizza: FavoritePizza) => {
    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: `${pizza.sizes[0].size} (${pizza.sizes[0].diameter}см)`,
      price: pizza.sizes[0].price,
      quantity: 1,
      image: pizza.image
    });
    toast.success(`${pizza.name} добавлена в корзину!`);
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Войдите в систему</h2>
            <p className="text-gray-600 mb-6">Чтобы просматривать избранные товары, необходимо войти в систему</p>
            <Button className="bg-red-600 hover:bg-red-700">
              Войти в систему
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Heart className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-900">Избранные товары</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <p className="mt-2 text-gray-600">Загрузка избранного...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Нет избранных товаров</h2>
            <p className="text-gray-600 mb-6">Добавьте пиццы в избранное, чтобы быстро найти их позже</p>
            <Button asChild className="bg-red-600 hover:bg-red-700">
              <a href="/menu">Перейти к меню</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                У вас {favorites.length} {favorites.length === 1 ? 'избранный товар' : 'избранных товаров'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((pizza) => (
                <Card key={pizza._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={pizza.image}
                      alt={pizza.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-600">
                      {pizza.category}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600"
                      onClick={() => removeFromFavorites(pizza._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {pizza.ingredients.join(', ')}
                      </p>
                    </div>

                    <div className="text-xs text-gray-500">
                      Добавлено: {new Date(pizza.addedAt).toLocaleDateString('ru-RU')}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <span className="text-xl font-bold text-red-600">
                          от {pizza.sizes[0].price} ₽
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addToCart(pizza)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          В корзину
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          <Plus className="h-4 w-4 mr-1" />
                          Настроить
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Рекомендации */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Рекомендуем также</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={`https://images.pexels.com/photos/${1146760 + i}/pexels-photo-${1146760 + i}.jpeg`}
                        alt="Рекомендуемая пицца"
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Четыре сыра</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Изысканная пицца с четырьмя видами сыра
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-red-600">от 650 ₽</span>
                        <Button size="sm" variant="outline">
                          <Heart className="h-4 w-4 mr-1" />
                          В избранное
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;