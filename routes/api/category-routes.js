const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll(
      {include: [{model: Product,  attributes: ['id', 'product_name', 'price', 'stock', 'category_id']} ]}
    );
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

router.put('/:id', async (req, res) => {
  try{
    if(req.body.category_name){
    const categoryData = await Category.update(
      {category_name: req.body.category_name},
      {where: {id : req.params.id}}
    )
    res.status(200).json(categoryData)
    }
    else{
      res.status(400).json({message: 'Please send a valid name'})
    }
  }catch(err){
    res.status(500).json(err);
  };

});

router.delete('/:id', async (req, res) => {
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if(!categoryData){
      res.status(404).json({message: 'No Category found With this id'});
      return
    }
    res.status(200).json(categoryData)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
