import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  pizza: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pizza',
    required: true
  },
  size: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  delivery: {
    address: {
      type: String,
      required: true
    },
    apartment: String,
    entrance: String,
    floor: String,
    comment: String
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Новый', 'Подтвержден', 'Готовится', 'В пути', 'Доставлен', 'Отменен'],
    default: 'Новый'
  },
  paymentMethod: {
    type: String,
    enum: ['Наличные', 'Карта курьеру', 'Онлайн'],
    required: true
  },
  estimatedDeliveryTime: {
    type: Date
  }
}, {
  timestamps: true
});

// Генерация номера заказа
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${count + 1}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);