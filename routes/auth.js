const express = require("express");
const User = require("../models/user_model");
const bcryptjs = require('bcryptjs')
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");

// authRouter.get("/user", (req, res) => {
//     res.json({msg:"auth"});
// });

authRouter.post('/api/signup', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body

    const exist = await User.findOne({
        email
    })

    if (exist) {
        return res.status(400).json({ msg: "user already exist" })
    }

    const hashpass = await bcryptjs.hash(password, 8)

    let user = new User({
        email, password: hashpass, name,
    })

    user = await user.save();
    res.json(user)

})


authRouter.post('/api/signin', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const exist = await User.findOne({
            email
        })

        if (!exist) {
            return res.status(400).json({ msg: "user does not exist" })
        }

        const isMatch = await bcryptjs.compare(password, exist.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "incorrect password" })
        }

        const token = jwt.sign({ id: exist._id }, "passwordKey")
        res.json({ token, ...exist._doc })

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


authRouter.post('/tokenIsValid', async (req, res) => {
    try {
        const token = req.header('x-auth-token')
        if (!token) return res.json(false)
        const verified = jwt.verify(token, 'passwordKey')
        if (!verified) return res.json(false)
        const user = await User.findById(verified.id);
        if (!user) return res.json(false)

        res.json(true)

    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

authRouter.get('/', auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({ ...user._doc, token: req.token })
})


module.exports = authRouter;
// module.exports = {authRouter, name:jameel};