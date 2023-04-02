const mongoose = require('mongoose')
const { productSchema } = require("./product");

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        // validate:{
        //     valodator:(val)=>{
        //         const r = "^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$"
        //         return val.match(re)
        //     },
        //     massage:"please enter a valid email",

        // }
        validate: {
            validator: (value) => {
                const re =
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Please enter a valid email address",
        },
    },
    password: {
        required: true,
        type: String,
    },
    address: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'user',
    },
    cart: [
        {
            product: productSchema,
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],


})

const User = mongoose.model("User", userSchema)
module.exports = User
