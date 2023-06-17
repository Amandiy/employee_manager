import { useEffect,useState } from "react";
import { TableBody, TableCell, TableHead, TableRow,Table,styled, Button } from "@mui/material";

import {getUsers,deleteEmployee} from '../service/api';

import {Link} from 'react-router-dom';
import Swal from "sweetalert2"; 

const StyledTable = styled(Table)`
width:90%;
margin: 10px auto 50px auto;
`

const THead = styled(TableRow)`
background:#111111;
& > th {
   color:#fff; 
   font-size:15px;
}`;

const TBody = styled(TableRow)`
&>td{
    background:#ffff;
    font-size:10px;
}`;

const EmployeeList = () => {
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        getEmployeeList();
    },[]);
    const getEmployeeList = async()=>{
      let response =  await getUsers();
      setUsers(response.data);
           
    }

    const deleteEmployeeDetails = async (id) => {
        const confirmDelete = await Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        });
    
        if (confirmDelete.isConfirmed) {
          await deleteEmployee(id);
          await Swal.fire("Deleted!", "The employee has been deleted.", "success");
          getEmployeeList();
        }
      };
    return (
<div>
     <div className="app">
        
    </div>
    <Button variant="contained" style={{marginLeft:65}} component={Link} to={`/employee/add`}>Add Employee</Button>
      <StyledTable>
       
        <TableHead>
            <THead>
            <TableCell><center></center></TableCell>
                <TableCell><center>First name</center></TableCell>
                <TableCell><center>Last name</center></TableCell>
                <TableCell><center>Email Address</center></TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell></TableCell>
                <TableCell><center>Action</center></TableCell>
                

                
            </THead>

        </TableHead>
        <TableBody>
            {
                users.map((user,index)=>(
                    <TBody key={user._id + index + 1}>
                         <TableCell>{ index +1}</TableCell>
                        <TableCell>{user.fname}</TableCell>
                        <TableCell>{user.lname}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.gender}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          
                        <Button variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${user._id}`}>Edit</Button>
                            <Button variant="contained" style={{marginRight:10}} color="secondary" onClick={()=> deleteEmployeeDetails(user._id)}>Delete</Button>
                        </TableCell>
                    </TBody>
                ))
            }

        </TableBody>
      </StyledTable></div>
    );
}
export default EmployeeList;