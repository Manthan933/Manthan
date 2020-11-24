const express = require('express');

const Tests = require ('../controllers/tests');

const router = express.Router();

router.get('/', Tests.getAll);
router.post('/', Tests.create);
router.get('/:id', Tests.getOne);
router.patch('/:id', Tests.update);
router.delete('/:id', Tests.deleteOne);
router.get('/:id/start', Tests.generate);

module.exports = router;