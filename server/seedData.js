import mongoose from 'mongoose';
import Pizza from './models/Pizza.js';
import dotenv from 'dotenv';

dotenv.config();

const pizzas = [
  {
    name: "Маргарита",
    description: "Классическая итальянская пицца с томатным соусом, моцареллой и базиликом",
    ingredients: ["Томатный соус", "Моцарелла", "Базилик", "Оливковое масло"],
    sizes: [
      { size: "Маленькая", price: 450, diameter: 25 },
      { size: "Средняя", price: 650, diameter: 30 },
      { size: "Большая", price: 850, diameter: 35 }
    ],
    category: "Вегетарианские",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    rating: 4.5,
    reviewCount: 128
  },
  {
    name: "Пепперони",
    description: "Острая пицца с пикантной колбасой пепперони и сыром моцарелла",
    ingredients: ["Томатный соус", "Моцарелла", "Пепперони"],
    sizes: [
      { size: "Маленькая", price: 550, diameter: 25 },
      { size: "Средняя", price: 750, diameter: 30 },
      { size: "Большая", price: 950, diameter: 35 }
    ],
    category: "Острые",
    image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg",
    rating: 4.7,
    reviewCount: 95
  },
  {
    name: "Четыре сыра",
    description: "Изысканная пицца с четырьмя видами сыра: моцарелла, пармезан, горгонзола и рикотта",
    ingredients: ["Белый соус", "Моцарелла", "Пармезан", "Горгонзола", "Рикотта"],
    sizes: [
      { size: "Маленькая", price: 650, diameter: 25 },
      { size: "Средняя", price: 850, diameter: 30 },
      { size: "Большая", price: 1050, diameter: 35 }
    ],
    category: "Сырные",
    image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
    rating: 4.6,
    reviewCount: 73
  },
  {
    name: "Мясная",
    description: "Сытная пицца с говядиной, свининой, курицей и охотничьими колбасками",
    ingredients: ["Томатный соус", "Моцарелла", "Говядина", "Свинина", "Курица", "Охотничьи колбаски"],
    sizes: [
      { size: "Маленькая", price: 750, diameter: 25 },
      { size: "Средняя", price: 950, diameter: 30 },
      { size: "Большая", price: 1150, diameter: 35 }
    ],
    category: "Мясные",
    image: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg",
    rating: 4.8,
    reviewCount: 156
  },
  {
    name: "Гавайская",
    description: "Экзотическая пицца с ветчиной, ананасами и сыром моцарелла",
    ingredients: ["Томатный соус", "Моцарелла", "Ветчина", "Ананасы"],
    sizes: [
      { size: "Маленькая", price: 600, diameter: 25 },
      { size: "Средняя", price: 800, diameter: 30 },
      { size: "Большая", price: 1000, diameter: 35 }
    ],
    category: "Фирменные",
    image: "https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg",
    rating: 4.2,
    reviewCount: 89
  },
  {
    name: "Вегетарианская",
    description: "Здоровая пицца с болгарским перцем, томатами, грибами, луком и оливками",
    ingredients: ["Томатный соус", "Моцарелла", "Болгарский перец", "Томаты", "Шампиньоны", "Красный лук", "Оливки"],
    sizes: [
      { size: "Маленькая", price: 500, diameter: 25 },
      { size: "Средняя", price: 700, diameter: 30 },
      { size: "Большая", price: 900, diameter: 35 }
    ],
    category: "Вегетарианские",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    rating: 4.3,
    reviewCount: 67
  },
  {
    name: "Барбекю",
    description: "Ароматная пицца с курицей в соусе барбекю, красным луком и кукурузой",
    ingredients: ["Соус барбекю", "Моцарелла", "Курица", "Красный лук", "Кукуруза"],
    sizes: [
      { size: "Маленькая", price: 650, diameter: 25 },
      { size: "Средняя", price: 850, diameter: 30 },
      { size: "Большая", price: 1050, diameter: 35 }
    ],
    category: "Мясные",
    image: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg",
    rating: 4.5,
    reviewCount: 112
  },
  {
    name: "Дьявольская",
    description: "Очень острая пицца с острой салями, халапеньо и острым соусом",
    ingredients: ["Острый томатный соус", "Моцарелла", "Острая салями", "Халапеньо", "Чили"],
    sizes: [
      { size: "Маленькая", price: 700, diameter: 25 },
      { size: "Средняя", price: 900, diameter: 30 },
      { size: "Большая", price: 1100, diameter: 35 }
    ],
    category: "Острые",
    image: "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg",
    rating: 4.4,
    reviewCount: 84
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pizza-delivery');
    
    // Очищаем коллекцию пицц
    await Pizza.deleteMany({});
    
    // Добавляем новые пиццы
    await Pizza.insertMany(pizzas);
    
    console.log('База данных успешно заполнена тестовыми данными');
    process.exit(0);
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
    process.exit(1);
  }
}

seedDatabase();