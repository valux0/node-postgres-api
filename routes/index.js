const upload = require('../middlewares/upload');
const { Router } = require('express');
const controllers = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('ruta plantas funcionando'));

router.post('/plantas',upload.single('imagen'),controllers.createPlanta);
router.get('/plantas',controllers.getAllPlantas);
router.get('/plantas/:id',controllers.getPlantaById);
router.put('/plantas/:id', upload.single('imagen'), controllers.update);
router.delete('/plantas/:id',controllers.deletePlanta);

module.exports = router;


