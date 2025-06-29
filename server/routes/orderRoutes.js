import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Создать новый заказ
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    
    // Устанавливаем примерное время доставки (45 минут от текущего времени)
    order.estimatedDeliveryTime = new Date(Date.now() + 45 * 60 * 1000);
    
    await order.save();
    await order.populate('items.pizza');
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании заказа', error: error.message });
  }
});

// Получить все заказы
router.get('/', async (req, res) => {
  try {
    const { status, phone } = req.query;
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (phone) {
      query['customer.phone'] = phone;
    }
    
    const orders = await Order.find(query)
      .populate('items.pizza')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказов', error: error.message });
  }
});

// Получить заказ по ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.pizza');
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказа', error: error.message });
  }
});

// Получить заказ по номеру
router.get('/number/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.pizza');
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении заказа', error: error.message });
  }
});

// Обновить статус заказа
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('items.pizza');
    
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении статуса заказа', error: error.message });
  }
});

// Отменить заказ
router.patch('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: 'Отменен' },
      { new: true }
    ).populate('items.pizza');
    
    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при отмене заказа', error: error.message });
  }
});

export default router;