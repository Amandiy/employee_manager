import axios from 'axios';


const URL = 'http://localhost:8000';
export const addEmployee = async (data) => {

    try{
     return await  axios.post(`${URL}/employee/add`,data);
    }catch(error){
        console.log('Error while calling add employee Api',error);
    }
}

export const getUsers = async () => {
try{
   return await axios.get(`${URL}/`);

} catch (error){
    console.log('Error while calling getUsers API',error);

}
}

export const getUser = async (id) => {
    try{
       return await axios.get(`${URL}/${id}`);
    
    } catch (error){
        console.log('Error while calling getUser api',error);
    
    }
    }

    export const editEmployee = async (user,id)=> {
        try{
            return await axios.put(`${URL}/${id}`,user);

        } catch (error){
        console.log('Error while calling editemployee api',error);
    }
}

export const deleteEmployee = async (id)=> {
    try{
        return await axios.delete(`${URL}/${id}`);

    } catch (error){
    console.log('Error while calling deleteEmployee api',error);
}
}
