const mongoose = require('mongoose');


const Schema = mongoose.Schema;

// Schema defines what the object should look like in database
const contactSchema = new Schema({
   name: {
        type: String,
        required: [true, 'Please provide your name.']
    },
    email: {
        type: String,
        required: true,
        validate:{
            validator: (value) => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);},
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    response: {
        type: String
    },
    responseDate: {
        type: Date
    }    
},
{timestamps: true})


// Model implements the schema and provides functions for working with the objects
module.exports = mongoose.model('Contact', contactSchema);