const User = require('../models/userModel');
const asyncHandler = require('../utils/catchAsync'); 

exports.signup = asyncHandler(async(req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    })
});