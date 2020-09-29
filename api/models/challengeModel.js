const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');


const challengeSchema = new mongoose.Schema({
   name: {
        type: String,
        trim: true,
        required: [true, 'A challenge must have a name'],
        maxlength: [50, 'A challenge must have less than 50 characters'],
        minlength:[10, 'A challenge must have more than 10 characters'],
        validate: [validator.isAlpha, 'Challenge must contain only characters']
   },
   description: {
        type: String,
        trim: true,
        required: [true, 'A challenge must have a description'],
        maxlength: [500, 'A challenge must have less than 500 characters'],
        minlength:[10, 'A challenge must have more than 100 characters']
   },
   slug: String,
   difficulty: {
       type: String,
       required: [true, 'A challenge must have a difficulty'],
       enum: {
           values: ['easy', 'intermediate', 'expert'],
           message: 'Difficulty is either: easy, intermediate or expert'
       }
   },
   price: {
       type: String,
       required: [true, 'A challenge must have a price'],
       enum: {
        values: ['free', 'premium'],
        message: 'Price is either: free or premium'
    }
   },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    secretChallenge: {
        type: Boolean,
        default: false
    },
    imageCover: {
        type: String,
        required: [true, 'A challenge must have a cover image']
    },
    images: [String]
    }, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
 }
);

challengeSchema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true });
    next();
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
