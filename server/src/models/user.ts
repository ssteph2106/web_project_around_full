import mongoose from "mongoose";

const urlRegex =
  /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=%]+#?$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    about: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    avatar: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => urlRegex.test(value),
            message: "La URL del avatar no es válida",
        },
    },
});

const User = mongoose.model('User', userSchema);

export default User;