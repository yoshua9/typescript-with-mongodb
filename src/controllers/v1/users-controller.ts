import {Request,Response} from "express";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import Users  from '../../mongo/models/users';
import Products from '../../mongo/models/products';


const expiresIn = 60 * 10;

const login = async(req:Request, res:Response): Promise<void> => {
    try {

        const { email, password } = req.body;
        const user = await Users.findOne({ email: email });
        console.log(`${email}`, user);
        if (user) {
            //
            const isOk = await bcrypt.compare(password, user.password);
            if (isOk) {
                const token = jwt.sign({
                        userId: user._id,
                        role: user.role
                    },
                    process.env.JWT_SECRET!, {
                        expiresIn: expiresIn
                    });
                res.status(200).send({ status: "OK", data: { token, expiresIn: expiresIn } });
            } else {
                res.status(403).send({ status: "Invalid Password", message: '' });
            }
        } else {
            res.status(401).send({ status: "UserNotFound", message: '' });
        }
    } catch (e) {
        res.status(500).send({ status: "Error", message: e.message });

    }
};


const createUser = async(req:Request, res:Response): Promise<void> => {
    try {

        const { username, password, email, data } = req.body;
        const hash = await bcrypt.hash(password, 15);

        // await Users.createUser({
        //     username,
        //     email,
        //     data,
        //     password: hash
        // });

        const user = new Users();
        user.username = username;
        user.email = email;
        user.password = hash;
        user.data = data;

        await user.save();

        res.send({ status: "ok", message: "user created" });
    } catch (error) {
        //error.code 11000 es un error de mongo propio
        if (error.code && error.code === 11000) {
            res.status(400).send({ status: "DUPLICATED VALUES", message: error.keyValue });
            return;
        }
        //console.log("error createuser", error);
        res.status(500).send({ status: "Error", message: error.message });

    }

};
const deleteUser = async(req:Request, res:Response): Promise<void> => {
    try {
        const { userId } = req.body;

        console.log('userId', userId);
        if (!userId) {
            throw new Error('Missing Param userId');
        }

        console.log("userID", userId);

        await Users.findOneAndRemove({ _id: userId });
        await Products.deleteMany({ user: userId });

        res.send({ status: "ok", message: "user deleted" });
    } catch (e) {
        res.status(500).send({ status: "ERROR", data: e.message });

    }


}
const getUsers = async(req:Request, res:Response): Promise<void> => {
    try {
        const users = await Users.find().select({ password: 0, __v: 0, role: 0 });
        res.send({ status: "ok", data: users });
    } catch (e) {
        console.log("error: ", e);
        res.status(500).send({ status: "ERROR", data: e.message });
    }
}
const updateUser = async(req:Request, res:Response): Promise<void> => {
    try {
        console.log('req.sessionData', req.sessionData.userId);
        const { username, email, data, password } = req.body;
        const hash = await bcrypt.hash(password, 15);

        await Users.findOneAndUpdate({ _id: req.sessionData.userId }, {
            username,
            password: hash,
            data,
            email
        })

        res.send({ status: "ok", message: "user updated" })
    } catch (e) {
        if (e.code && e.code === 11000) {
            res.status(400).send({ status: "DUPLICATED VALUES", message: e.keyValue });
            return;
        }
        res.status(500).send({ status: "Error", message: e.message });
    }


}


export default  { login, createUser, deleteUser, getUsers, updateUser }