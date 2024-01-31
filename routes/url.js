const express = require("express");
const {handleCreateShortURL,
       handleGetShortURL,
       handleAnalytics} = require("../controllers/url");

const router = express.Router();

router.post('/', handleCreateShortURL);
router.get('/:id',handleGetShortURL);
router.get('/analytics/:id', handleAnalytics)

module.exports = router;