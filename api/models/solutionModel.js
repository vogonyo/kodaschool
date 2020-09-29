const mongoose = require('mongoose');
const validator = require('validator');

const solutionSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, 'Please enter solution TItle']
    },
    repoUrl: {
        type: String,
        required: [true, 'Please provide repository URL'],
        maxlength: [70, 'You cannot have more than 70 characters'],
        validate: [validator.isUrl, 'Please provide valid url']
    },
    liveUrl: {
        type: String,
        required: [true, 'Please provide live URL'],
        validate: [validator.isUrl, 'Please provide valid url']
    },
    question: {
        type: String,
        maxlength: [500, 'Question cannot have more than 500 characters']
    }
})


const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;