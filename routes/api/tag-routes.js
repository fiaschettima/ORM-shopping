const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tags = await Tag.findAll(
      {include: [{model: Product} ]}
    );
    res.status(200).json(tags)
  }catch(err){
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try{
    const tags = await Tag.findByPk(req.params.id, {
      include: {model: Product}
    });
    res.status(200).json(tags);
  }catch(err){
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    if(req.body.tag_name){
    const tagData = await Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    )
    res.status(200).json(tagData)
  }
  else{
    res.status(400).json({message: 'Please send a proper tag_name'});
  }
}catch(err){
  res.status(500).json(err);
}
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where:{
        id: req.params.id
      }
    });
    if(!tagData){
      res.status(404).json({message: 'No Tag Found With that Id'})
      return
    }
    res.status(200).json(tagData)
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
