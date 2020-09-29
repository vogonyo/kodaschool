const AppError = require('../utils/appError');

const errorHandler = (err, req, res, next) => {
    let error = {...err}
    error.message = err.message;

    //Log Console for developer
    console.log(`Console log err code is ${Object.values(err.errors)}\n`);
    
    //Moongose bad ObjectId
    if(err.name === 'CastError'){
        const message = `Resource with id ${err.value} not found`;
        error = new AppError(message, 404);
    }
    
    //Mongoose duplicate Key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new AppError(message, 400);
    }

    //Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new AppError(message, 400);
        
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error',
        
    });
}

module.exports = errorHandler;