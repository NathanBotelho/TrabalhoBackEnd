var express = require('express');
var router = express.Router();
const produtosController = require('../controllers/produtosControler');


/* GET produtos listing. */
router.get('/', produtosController.findAll);

/* Put produtos listing. */
router.put('/', produtosController.update);

  
/* Post produtos listing. */
router.post('/', produtosController.save);

  
/* Delete produtos listing. */
router.delete('/:id', produtosController.remove);
  

module.exports = router;
