const studentsDetails = require('../controllers/students_details.controller');
const express = require('express');
const router = express.Router();

router.post("/",studentsDetails.create);
router.get("/",studentsDetails.findAll);
router.get("/:_id",studentsDetails.findOne);
router.put("/:_id",studentsDetails.update);
router.delete("/delete/:_id",studentsDetails.delete);

module.exports = router;