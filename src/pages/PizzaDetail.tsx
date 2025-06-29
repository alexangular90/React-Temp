import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Plus, Minus, Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PizzaCard from '@/components/PizzaCard';
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

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const PizzaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [similarPizzas, setSimilarPizzas] = useState<Pizza[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedDough, setSelectedDough] = useState('традиционное');
  const [selectedCrust, setSelectedCrust] = useState('обычный');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });
  const { addItem } = useCart();

  // Дополнительные изображения (в реальном проекте будут из API)
  const additionalImages = [
    'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
    'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
    'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg'
  ];

  const doughOptions = [
    { value: 'традиционное', label: 'Традиционное', price: 0, description: 'Классическое тесто средней толщины' },
    { value: 'тонкое', label: 'Тонкое', price: 0, description: 'Хрустящее тонкое тесто' },
    { value: 'пышное', label: 'Пышное', price: 50, description: 'Воздушное толстое тесто' }
  ];

  const crustOptions = [
    { value: 'обычный', label: 'Обычный', price: 0, description: 'Стандартный край' },
    { value: 'сырный', label: 'Сырный', price: 100, description: 'Край с расплавленным сыром' },
    { value: 'чесночный', label: 'Чесночный', price: 80, description: 'Край с чесночным соусом' }
  ];

  useEffect(() => {
    if (id) {
      fetchPizza();
      fetchSimilarPizzas();
      fetchReviews();
    }
  }, [id]);

  const fetchPizza = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPizza(data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке пиццы:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pizzas');
      const data = await response.json();
      // Берем случайные 4 пиццы как похожие
      const shuffled = data.sort(() => 0.5 - Math.random());
      setSimilarPizzas(shuffled.slice(0, 4));
    } catch (error) {
      console.error('Ошибка при загрузке похожих пицц:', error);
    }
  };

  const fetchReviews = () => {
    // Моковые отзывы
    const mockReviews: Review[] = [
      {
        id: '1',
        userName: 'Анна П.',
        rating: 5,
        comment: 'Отличная пицца! Очень вкусная, горячая доставка. Буду заказывать еще!',
        date: '2024-01-15',
        helpful: 12
      },
      {
        id: '2',
        userName: 'Михаил С.',
        rating: 4,
        comment: 'Хорошая пицца, но немного пересолена. В целом доволен.',
        date: '2024-01-10',
        helpful: 8
      },
      {
        id: '3',
        userName: 'Елена К.',
        rating: 5,
        comment: 'Моя любимая пицца! Заказываю постоянно, качество всегда на высоте.',
        date: '2024-01-08',
        helpful: 15
      }
    ];
    setReviews(mockReviews);
  };

  const handleAddToCart = () => {
    if (!pizza) return;

    const selectedSizeData = pizza.sizes[selectedSize];
    const doughPrice = doughOptions.find(d => d.value === selectedDough)?.price || 0;
    const crustPrice = crustOptions.find(c => c.value === selectedCrust)?.price || 0;
    const totalPrice = (selectedSizeData.price + doughPrice + crustPrice) * quantity;

    const sizeLabel = `${selectedSizeData.size} (${selectedSizeData.diameter}см)`;
    const optionsLabel = selectedDough !== 'традиционное' || selectedCrust !== 'обычный' 
      ? ` • ${selectedDough} тесто • ${selectedCrust} край`
      : '';

    addItem({
      pizzaId: pizza._id,
      name: pizza.name,
      size: sizeLabel + optionsLabel,
      price: totalPrice / quantity,
      quantity: quantity,
      image: pizza.image
    });
    
    toast.success(`${pizza.name} добавлена в корзину!`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка отзыва на сервер
    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };
    setReviews(prev => [review, ...prev]);
    setNewReview({ userName: '', rating: 5, comment: '' });
    toast.success('Отзыв добавлен!');
  };

  const getCurrentPrice = () => {
    if (!pizza) return 0;
    const selectedSizeData = pizza.sizes[selectedSize];
    const doughPrice = doughOptions.find(d => d.value === selectedDough)?.price || 0;
    const crustPrice = crustOptions.find(c => c.value === selectedCrust)?.price || 0;
    return (selectedSizeData.price + doughPrice + crustPrice) * quantity;
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Пицца не найдена</h1>
            <Link to="/menu">
              <Button>Вернуться к меню</Button>
            </Link>
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
        {/* Навигация */}
        <div className="mb-6">
          <Link to="/menu" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к каталогу
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={additionalImages[selectedImageIndex]}
                alt={pizza.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button variant="outline" size="sm" className="bg-white/90">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="bg-white/90">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Миниатюры */}
            <div className="grid grid-cols-4 gap-2">
              {additionalImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${pizza.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Информация о пицце */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-red-600">{pizza.category}</Badge>
                <div className="flex items-center space-x-1">
                  {renderStars(pizza.rating)}
                  <span className="text-sm text-gray-600">
                    {pizza.rating} ({pizza.reviewCount} отзывов)
                  </span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{pizza.name}</h1>
              <p className="text-gray-700 text-lg">{pizza.description}</p>
            </div>

            {/* Ингредиенты */}
            <div>
              <h3 className="font-semibold mb-3">Ингредиенты:</h3>
              <div className="flex flex-wrap gap-2">
                {pizza.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <h3 className="font-semibold mb-3">Размер:</h3>
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
              <h3 className="font-semibold mb-3">Тип теста:</h3>
              <div className="space-y-2">
                {doughOptions.map((dough) => (
                  <button
                    key={dough.value}
                    onClick={() => setSelectedDough(dough.value)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedDough === dough.value
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{dough.label}</div>
                        <div className="text-sm text-gray-600">{dough.description}</div>
                      </div>
                      {dough.price > 0 && (
                        <div className="text-red-600 font-medium">+{dough.price} ₽</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор края */}
            <div>
              <h3 className="font-semibold mb-3">Тип края:</h3>
              <div className="space-y-2">
                {crustOptions.map((crust) => (
                  <button
                    key={crust.value}
                    onClick={() => setSelectedCrust(crust.value)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedCrust === crust.value
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{crust.label}</div>
                        <div className="text-sm text-gray-600">{crust.description}</div>
                      </div>
                      {crust.price > 0 && (
                        <div className="text-red-600 font-medium">+{crust.price} ₽</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Количество и добавление в корзину */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {getCurrentPrice()} ₽
                  </div>
                  <div className="text-sm text-gray-600">
                    {pizza.sizes[selectedSize].size} • {selectedDough} тесто • {selectedCrust} край
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Добавить в корзину
              </Button>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="nutrition">Пищевая ценность</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Подробное описание</h3>
                <p className="text-gray-700 mb-4">
                  {pizza.description} Эта пицца готовится из отборных ингредиентов по традиционному рецепту. 
                  Мы используем только свежие продукты и готовим каждую пиццу на заказ в дровяной печи.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Особенности приготовления:</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Тесто готовится ежедневно</li>
                      <li>• Выпекается в дровяной печи при 400°C</li>
                      <li>• Время приготовления: 15-20 минут</li>
                      <li>• Подается горячей</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Рекомендации:</h4>
                    <ul className="text-gray-700 space-y-1">
                      <li>• Лучше всего сочетается с колой</li>
                      <li>• Подходит для семейного ужина</li>
                      <li>• Можно разогреть в духовке</li>
                      <li>• Хранить в холодильнике до 2 дней</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Пищевая ценность (на 100г)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">245</div>
                    <div className="text-sm text-gray-600">ккал</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">12г</div>
                    <div className="text-sm text-gray-600">белки</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8г</div>
                    <div className="text-sm text-gray-600">жиры</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">28г</div>
                    <div className="text-sm text-gray-600">углеводы</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Аллергены:</h4>
                  <p className="text-sm text-gray-700">
                    Содержит глютен, молочные продукты. Может содержать следы орехов и сои.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {/* Форма добавления отзыва */}
              <Card>
                <CardHeader>
                  <CardTitle>Оставить отзыв</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="userName">Ваше имя</Label>
                        <Input
                          id="userName"
                          value={newReview.userName}
                          onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="rating">Оценка</Label>
                        <Select 
                          value={newReview.rating.toString()} 
                          onValueChange={(value) => setNewReview(prev => ({ ...prev, rating: Number(value) }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 звезд - Отлично</SelectItem>
                            <SelectItem value="4">4 звезды - Хорошо</SelectItem>
                            <SelectItem value="3">3 звезды - Нормально</SelectItem>
                            <SelectItem value="2">2 звезды - Плохо</SelectItem>
                            <SelectItem value="1">1 звезда - Ужасно</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="comment">Комментарий</Label>
                      <Textarea
                        id="comment"
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Поделитесь своим мнением о пицце..."
                        required
                      />
                    </div>
                    <Button type="submit" className="bg-red-600 hover:bg-red-700">
                      Отправить отзыв
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Список отзывов */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold">{review.userName}</div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <button className="hover:text-gray-900">
                          👍 Полезно ({review.helpful})
                        </button>
                        <button className="hover:text-gray-900">
                          Ответить
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Похожие товары */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие пиццы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarPizzas.map((similarPizza) => (
              <PizzaCard key={similarPizza._id} pizza={similarPizza} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default PizzaDetail;