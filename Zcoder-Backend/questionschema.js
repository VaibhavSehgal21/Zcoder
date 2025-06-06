const mongoose = require('mongoose');

    const questionSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            unique: true,
            required: true
        },
        topics: {
            type: [String]
        },
        solution: {
            type: String,
            required: true,
        }
    });
    

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;