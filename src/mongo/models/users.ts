import mongoose,{Schema,Document,model} from 'mongoose';
mongoose.set('useCreateIndex', true)

export interface IUser extends Document{
    username:string;
    password:string;
    email:string;
    data:{
        age:number;
        isMale:boolean;
    }
    role:string;
}


const usersSchema:Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    data: {
        type: { age: Number, isMale: Boolean }
    },
    role: { type: String, enum: ["admin", "seller"], default: "seller" }
});

export default model<IUser>('User', usersSchema);
