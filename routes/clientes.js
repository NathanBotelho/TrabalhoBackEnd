var express = require('express');
var router = express.Router();
const clientesController = require('../controllers/clienteControler');
const nomeMiddleware = require('../middlewares/nomeMiddleware');
const sobrenomeMiddleware = require('../middlewares/sobrenomeMiddleware');
const idadeMiddleware = require('../middlewares/idadeMiddleware');



/* GET clientes listing. */
router.get('/', clientesController.findAll);

/* Put clientes listing. */
router.put('/', clientesController.update);

  
/* Post clientes listing. */
router.post('/',  nomeMiddleware.validateName,
sobrenomeMiddleware.validateFamilyName,
idadeMiddleware.validateAge,
clienteController.save
);

  
/* Delete clientes listing. */
router.delete('/:id', clientesController.remove);
  

module.exports = router;
