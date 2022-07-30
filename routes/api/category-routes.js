const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData)
  }catch(err){
    res.status(500).json(err);
  }
});
// To Fix Later Sequelize statment is showing category Id twice in products,
// sql statment causing this needed to be removed is `products`.`category_id` AS `products.category_id`,
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product} ]
    });
    if(!categoryData){
      res.status(404).json({message: 'No matching Category Found'})
    };
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
