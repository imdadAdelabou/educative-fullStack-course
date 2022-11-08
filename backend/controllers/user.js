const { User, validate } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async(req, res, next) => {
    try {
        const { error } = validate(req.body);
        console.log(req.body);
        console.log(error);
        if (error) return res.status(400).send(error.details[0].message);
        const { firstName, lastName, username, email, password } = req.body;

        const oldUser = await User.findOne({ email });
        if (oldUser) return res.status(409).send("User already exist");

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);

        let user = await User.create({
            firstName,
            lastName,
            username,
            email: email.toLowerCase(),
            password: hashPassword,
        });

        const token = jwt.sign({ userId: user._id, email: email },
            process.env.TOKEN_SECRET_KEY, { expiresIn: "2h" }
        );
        user.token = token;
        return res.status(201).json({ data: user });
    } catch (e) {
        console.log(e);
    }
};