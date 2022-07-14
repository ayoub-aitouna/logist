const express = require('express');
const router = express.Router();
const {
    CheckIfUserExists,
    login,
    VerifyNumber,
    regester,
    ResendOTP,
    driverRegester,
    UploadDocument
} = require('../controllers/Auth');

router.post('/', login);
router.post('/regester', regester);
router.get('/:phonenumber', CheckIfUserExists);
router.get('/VerifyNumber', VerifyNumber);
router.post('/Verify', ResendOTP);
router.get('/driverRegester', driverRegester);
router.post('/UploadDocument', UploadDocument);

module.exports = router;