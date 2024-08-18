const express = require('express');
const { getUserPreferences, updateUserPreferences } = require('../controllers/userController');

const router = express.Router();

router.get('/user/:username/preferences', getUserPreferences);
router.put('/user/:username/preferences', updateUserPreferences);

module.exports = router;
