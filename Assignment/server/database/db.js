import mongoose  from "mongoose";
 mongoose.set('strictQuery',false);


const Connection =async (username,password) => {
    const URL =`mongodb+srv://amandi:1234@emp.unxdg2l.mongodb.net/employee?retryWrites=true&w=majority`;




    try{
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log('Database Connected successfully');

    }catch (error){
        console.log('Error  while connecting with the database',error);
    }

}
export default Connection;