import mongoose from "mongoose";

const urlRegex =
  /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => urlRegex.test(value),
            message: 'La URL de la tarjeta no es válida',   
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Card = mongoose.model('Card', cardSchema);

export default Card;