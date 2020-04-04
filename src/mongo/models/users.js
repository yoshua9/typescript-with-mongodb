const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)
const { Schema } = mongoose;

const usersSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    data: {
        type: { age: Number, isMale: Boolean }
    },
    role: { type: String, enum: ["admin", "seller"], default: "seller" }
});

const user = mongoose.model('User', usersSchema);

module.exports = user;