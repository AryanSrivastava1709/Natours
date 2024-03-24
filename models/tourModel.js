const mongoose = require('mongoose');
//setting up the schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tout must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

//setting up the model/collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
