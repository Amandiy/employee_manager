import { useState } from "react";
import {
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Typography,
  styled,
  Button,
  Input,
  Box
} from "@mui/material";
import { addEmployee } from "../service/api";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import backgroundPhoto from "../background/bbbb.jpg";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
  }
`;

const ErrorMessage = styled(Box)`
  background-color: white;
  padding: 8px;
  color: black;
  margin-top: 8px;
  opacity: 0;
  border: 2px solid red;
  transition: opacity 0.3s ease;
  &.show {
    opacity: 1;
  }
`;

const defaultValue = {
  lname: "",
  fname: "",
  email: "",
  phone: "",
  gender: "",
};

const AddEmployee = () => {
  const [user, setUser] = useState(defaultValue);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.fname || !/^[A-Za-z]{6,10}$/.test(user.fname)) {
      errors.fname = "Should not be null and and First name is required and should have 6-10 alphabetic characters.";
      isValid = false;
    }

    if (!user.lname || !/^[A-Za-z]{6,10}$/.test(user.lname)) {
      errors.lname = "Should not be null and Last name is required and should have 6-10 alphabetic characters.";
      isValid = false;
    }

    if (!user.email || !/^\S+@\S+\.\S+$/.test(user.email)) {
      errors.email = "Invalid email address.";
      isValid = false;
    }

    if (!user.phone || !/^\d{10}$/.test(user.phone)) {
      errors.phone = "Invalid phone number. Please enter a 10-digit number.";
      isValid = false;
    }

    if (!user.gender) {
      errors.gender = "Gender is required.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  const addEmployeeDetails = async () => {
    const isValid = validateForm();
    if (isValid) {
      await addEmployee(user);
      navigate("/");
    }
    
  };

  return (
  <div
      style={{
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
    <div>
     </div>
       <Button variant="contained" style={{marginTop:75}} component={Link} to={`/`}>Employee List</Button>
   
      <div className="sub-main">
        <Container>
          <Typography variant="h4">Add Employee</Typography>
          <FormControl error={!!validationErrors.fname}>
            <label>
              <b>First Name</b>
            </label>
            <Input
              onChange={(e) => onValueChange(e)}
              name="fname"
              value={user.fname}
            />
            {validationErrors.fname && (
              <ErrorMessage className={validationErrors.fname && 'show'}>
                {validationErrors.fname}
              </ErrorMessage>
            )}
          </FormControl>

          <FormControl error={!!validationErrors.lname}>
            <label>
              <b>Last Name</b>
            </label>
            <Input
              onChange={(e) => onValueChange(e)}
              name="lname"
              value={user.lname}
            />
            {validationErrors.lname && (
              <ErrorMessage className={validationErrors.lname && 'show'}>
                {validationErrors.lname}
              </ErrorMessage>
            )}
          </FormControl>

          <FormControl error={!!validationErrors.email}>
            <label>
              <b>Email Address</b>
            </label>
            <Input
              onChange={(e) => onValueChange(e)}
              name="email"
              value={user.email}
            />
            {validationErrors.email && (
              <ErrorMessage className={validationErrors.email && 'show'}>
                {validationErrors.email}
              </ErrorMessage>
            )}
          </FormControl>

          <FormControl error={!!validationErrors.phone}>
            <label>
              <b>Phone Number</b>
            </label>
            <Input
              onChange={(e) => onValueChange(e)}
              name="phone"
              value={user.phone}
            />
            {validationErrors.phone && (
              <ErrorMessage className={validationErrors.phone && 'show'}>
                {validationErrors.phone}
              </ErrorMessage>
            )}
          </FormControl>

          <FormControl error={!!validationErrors.gender}>
            <label>
              <b>Gender</b>
            </label>
            <Select
              onChange={(e) => onValueChange(e)}
              name="gender"
              value={user.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            {validationErrors.gender && (
              <ErrorMessage className={validationErrors.gender && 'show'}>
                {validationErrors.gender}
              </ErrorMessage>
            )}
          </FormControl>

          <br />
         
            <FormControl>
              <Button
                variant="contained"
                style={{width:150,right: -280,bottom:20}}
                onClick={() => addEmployeeDetails()}
              >
                Add Employee
              </Button>  
            </FormControl>
        </Container>
       
      </div>
    </div>
  );
};

export default AddEmployee;
