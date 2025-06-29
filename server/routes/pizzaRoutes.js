import express from 'express';
import Pizza from '../models/Pizza.js';

const router = express.Router();

// Получить все пиццы
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = { isAvailable: true };
    
    if (category && category !== 'Все') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const pizzas = await Pizza.find(query).sort({ createdAt: -1 });
    res.json(pizzas);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пицц', error: error.message });
  }
});

// Получить пиццу по ID
router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Пицца не найдена' });
    }
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении пиццы', error: error.message });
  }
});

// Создать новую пиццу (для админа)
router.post('/', async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    res.status(201).json(pizza);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при создании пиццы', error: error.message });
  }
});

// Обновить пиццу (для админа)
router.put('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!pizza) {
      return res.status(404).json({ message: 'Пицца не найдена' });
    }
    res.json(pizza);
  } catch (error) {
    res.status(400).json({ message: 'Ошибка при обновлении пиццы', error: error.message });
  }
});

// Удалить пиццу (для админа)
router.delete('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) {
      return res.status(404).json({ message: 'Пицца не найдена' });
    }
    res.json({ message: 'Пицца удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении пиццы', error: error.message });
  }
});

// Получить категории
router.get('/categories/list', async (req, res) => {
  try {
    const categories = await Pizza.distinct('category');
    res.json(['Все', ...categories]);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении категорий', error: error.message });
  }
});

export default router;