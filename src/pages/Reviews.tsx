import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, Filter, Search, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Review {
  id: string;
  customerName: string;
  customerAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  pizzaName?: string;
  orderNumber?: string;
  helpful: number;
  replies: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
    isAdmin: boolean;
  }>;
  verified: boolean;
}

const Reviews = () => {
  const { state: authState } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    pizzaName: ''
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // Моковые отзывы
      const mockReviews: Review[] = [
        {
          id: '1',
          customerName: 'Анна Петрова',
          customerAvatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          rating: 5,
          title: 'Лучшая пицца в городе!',
          comment: 'Заказываю здесь уже несколько лет. Качество всегда на высоте, доставка быстрая, персонал вежливый. Особенно нравится Маргарита - тесто тонкое, ингредиенты свежие. Рекомендую всем!',
          date: '2024-01-20',
          pizzaName:  'Маргарита',
          orderNumber: 'ORD-123456',
          helpful: 15,
          replies: [
            {
              id: 'r1',
              author: 'PizzaExpress',
              text: 'Спасибо за отзыв, Анна! Очень приятно слышать такие слова. Будем и дальше радовать вас вкусной пиццей!',
              date: '2024-01-21',
              isAdmin: true
            }
          ],
          verified: true
        },
        {
          id: '2',
          customerName: 'Михаил Сидоров',
          rating: 4,
          title: 'Хорошо, но есть замечания',
          comment: 'В целом пицца вкусная, доставили вовремя. Но в последний раз тесто было немного пересушено. Надеюсь, это случайность.',
          date: '2024-01-18',
          pizzaName: 'Пепперони',
          orderNumber: 'ORD-123455',
          helpful: 8,
          replies: [
            {
              id: 'r2',
              author: 'PizzaExpress',
              text: 'Михаил, спасибо за обратную связь! Мы обязательно учтем ваши замечания и проследим за качеством приготовления.',
              date: '2024-01-19',
              isAdmin: true
            }
          ],
          verified: true
        },
        {
          id: '3',
          customerName: 'Елена Козлова',
          customerAvatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          rating: 5,
          title: 'Отличный сервис!',
          comment: 'Заказывала на корпоратив. Все пиццы были готовы точно в срок, упакованы аккуратно. Коллеги остались довольны. Спасибо за профессионализм!',
          date: '2024-01-15',
          helpful: 12,
          replies: [],
          verified: true
        },
        {
          id: '4',
          customerName: 'Дмитрий Волков',
          rating: 3,
          title: 'Средне',
          comment: 'Пицца обычная, ничего особенного. Цена завышена для такого качества. Доставка была быстрой.',
          date: '2024-01-12',
          pizzaName: 'Четыре сыра',
          helpful: 3,
          replies: [],
          verified: false
        },
        {
          id: '5',
          customerName: 'Ольга Морозова',
          customerAvatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          rating: 5,
          title: 'Всегда заказываем здесь',
          comment: 'Семья обожает пиццу отсюда. Дети особенно любят детское меню. Курьеры всегда приветливые, пицца горячая. Молодцы!',
          date: '2024-01-10',
          helpful: 20,
          replies: [
            {
              id: 'r3',
              author: 'PizzaExpress',
              text: 'Ольга, спасибо большое! Очень рады, что вся семья довольна нашей пиццей. До встречи в следующих заказах!',
              date: '2024-01-11',
              isAdmin: true
            }
          ],
          verified: true
        }
      ];
      
      setReviews(mockReviews);
    } catch (error) {
      console.error('Ошибка при загрузке отзывов:', error);
      toast.error('Ошибка при загрузке отзывов');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authState.isAuthenticated) {
      toast.error('Для оставления отзыва необходимо войти в систему');
      return;
    }

    try {
      const review: Review = {
        id: Date.now().toString(),
        customerName: authState.user?.name || 'Аноним',
        customerAvatar: authState.user?.avatar,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0],
        pizzaName: newReview.pizzaName,
        helpful: 0,
        replies: [],
        verified: true
      };

      setReviews(prev => [review, ...prev]);
      setNewReview({ rating: 5, title: '', comment: '', pizzaName: '' });
      setShowReviewForm(false);
      toast.success('Отзыв добавлен! Спасибо за обратную связь.');
    } catch (error) {
      toast.error('Ошибка при добавлении отзыва');
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchQuery === '' || 
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRating = ratingFilter === 'all' || review.rating.toString() === ratingFilter;
    
    return matchesSearch && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 
      : 0
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Отзывы клиентов
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Узнайте, что думают о нас наши клиенты, и поделитесь своим мнением
            </p>
          </div>
        </div>
      </section>

      {/* Статистика отзывов */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Общая оценка */}
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">Средняя оценка</p>
                <p className="text-sm text-gray-500">{reviews.length} отзывов</p>
              </CardContent>
            </Card>

            {/* Распределение оценок */}
            <Card className="lg:col-span-2 p-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Распределение оценок
                </h3>
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-16">
                        <span className="text-sm">{item.rating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                      <div className="flex-1">
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Фильтры и поиск */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Поиск по отзывам..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Фильтр по оценке" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все оценки</SelectItem>
                  <SelectItem value="5">5 звезд</SelectItem>
                  <SelectItem value="4">4 звезды</SelectItem>
                  <SelectItem value="3">3 звезды</SelectItem>
                  <SelectItem value="2">2 звезды</SelectItem>
                  <SelectItem value="1">1 звезда</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Сначала новые</SelectItem>
                  <SelectItem value="oldest">Сначала старые</SelectItem>
                  <SelectItem value="highest">Высокие оценки</SelectItem>
                  <SelectItem value="lowest">Низкие оценки</SelectItem>
                  <SelectItem value="helpful">По полезности</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={() => setShowReviewForm(true)}
              className="bg-red-600 hover:bg-red-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      {/* Список отзывов */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-2 text-gray-600">Загрузка отзывов...</p>
            </div>
          ) : sortedReviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Отзывы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {review.customerAvatar ? (
                          <img
                            src={review.customerAvatar}
                            alt={review.customerName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {review.customerName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-semibold text-gray-900">
                              {review.customerName}
                            </h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Проверенный отзыв
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          {review.pizzaName && (
                            <Badge variant="outline" className="text-xs">
                              {review.pizzaName}
                            </Badge>
                          )}
                        </div>
                        
                        <h4 className="font-medium text-gray-900 mb-2">
                          {review.title}
                        </h4>
                        
                        <p className="text-gray-700 mb-4">
                          {review.comment}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Полезно ({review.helpful})
                          </Button>
                          
                          {review.orderNumber && (
                            <span className="text-xs text-gray-500">
                              Заказ: {review.orderNumber}
                            </span>
                          )}
                        </div>
                        
                        {/* Ответы */}
                        {review.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200">
                            {review.replies.map((reply) => (
                              <div key={reply.id} className="mb-3 last:mb-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`text-sm font-medium ${
                                    reply.isAdmin ? 'text-red-600' : 'text-gray-900'
                                  }`}>
                                    {reply.author}
                                  </span>
                                  {reply.isAdmin && (
                                    <Badge variant="secondary" className="text-xs">
                                      Администратор
                                    </Badge>
                                  )}
                                  <span className="text-xs text-gray-500">
                                    {new Date(reply.date).toLocaleDateString('ru-RU')}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">{reply.text}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Форма добавления отзыва */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Оставить отзыв</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReviewForm(false)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <Label>Оценка *</Label>
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= newReview.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title">Заголовок отзыва *</Label>
                  <Input
                    id="title"
                    value={newReview.title}
                    onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Кратко опишите ваше впечатление"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="pizzaName">Какую пиццу заказывали?</Label>
                  <Input
                    id="pizzaName"
                    value={newReview.pizzaName}
                    onChange={(e) => setNewReview(prev => ({ ...prev, pizzaName: e.target.value }))}
                    placeholder="Название пиццы (необязательно)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="comment">Ваш отзыв *</Label>
                  <Textarea
                    id="comment"
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Расскажите подробнее о вашем опыте"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Отправить отзыв
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Reviews;