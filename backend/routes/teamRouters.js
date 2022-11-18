const express = require('express');
const router = express.Router();
const {getMembers, createMember} = require('../controller/teamController')
router.get('/', getMembers);
router.post('/', createMember);

module.exports = router;