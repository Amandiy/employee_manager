import mongoose  from "mongoose";
 mongoose.set('strictQuery',false);


const Connection =async (username,password) => {
    const URL =`mongodb+srv://amandi:amandiyalapola@crud-app.o72swm6.mongodb.net/employee?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log('Database Connected successfully');

    }catch (error){
        console.log('Error  while connecting with the database',error);
    }

}
export default Connection;