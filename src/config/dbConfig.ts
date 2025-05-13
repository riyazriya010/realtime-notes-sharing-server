import mongoose from 'mongoose';
import { MONGODB_URI } from '../utils/constant';

export async function connectDB(){
    try{
        await mongoose.connect(String(MONGODB_URI))
        console.log('Database Connected Successfully')
    }catch(error: unknown){
        if(error instanceof mongoose.Error){
            console.error('Error While Connecting With DB ',error.message)
        }
    }
}
