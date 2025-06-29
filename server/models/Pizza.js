import mongoose from 'mongoose';

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  sizes: [{
    size: {
      type: String,
      required: true,
      enum: ['Маленькая', 'Средняя', 'Большая']
    },
    price: {
      type: Number,
      required: true
    },
    diameter: {
      type: Number,
      required: true
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['Мясные', 'Вегетарианские', 'Острые', 'Сырные', 'Фирменные']
  },
  image: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Pizza', pizzaSchema);