import mongoose from "mongoose";

const urlRegex =
  /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        default: "Jacques Cousteau",
        
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        default: "Explorador",
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => urlRegex.test(value),
            message: "La URL del avatar no es válida",
        },
        default: "https://practicum-content.s3.us-west-1.amazonaws.com/web-lat/avatar.jpg",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

export default User;