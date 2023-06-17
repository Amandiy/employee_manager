import  express from 'express';
import { addEmployee , getUsers,getUser,editEmployee,deleteEmployee} from '../controller/user-controller.js';


const router = express.Router();

router.post('/employee/add', addEmployee);  
router.get('/', getUsers);  
router.get('/:id', getUser);  
router.put('/:id', editEmployee);  
router.delete('/:id', deleteEmployee);
    

export default router;