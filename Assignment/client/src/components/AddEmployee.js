import { useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Typography,
  styled,
  Button,
  Input,
} from "@mui/material";
import { addEmployee } from "../service/api";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 20px;
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
      errors.fname = "First name is required and should have 6-10 alphabetic characters.";
      isValid = false;
    }

    if (!user.lname || !/^[A-Za-z]{6,10}$/.test(user.lname)) {
      errors.lname = "Last name is required and should have 6-10 alphabetic characters.";
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
    <div>
       <Button variant="contained" style={{marginTop:75}} component={Link} to={`/`}>Employee List</Button>
   
      <div className="sub-main">
        <Container>
          <Typography variant="h4">Add Employee</Typography>
          <FormControl error={!!validationErrors.fname}>
            <lable><b>First Name</b></lable>
            <Input
              onChange={(e) => onValueChange(e)}
              name="fname"
              required
            />
            {validationErrors.fname && (
              <Typography variant="caption" color="error">
                {validationErrors.fname}
              </Typography>
            )}
          </FormControl>
          <br></br>

          <FormControl error={!!validationErrors.lname}>
            <lable><b>Last Name</b></lable>
            <Input
              onChange={(e) => onValueChange(e)}
              name="lname"
              required
            />
            {validationErrors.lname && (
              <Typography variant="caption" color="error">
                {validationErrors.lname}
              </Typography>
            )}
          </FormControl>
          <br></br>

          <FormControl error={!!validationErrors.email}>
            <lable><b>Email Address</b></lable>
            <Input
              onChange={(e) => onValueChange(e)}
              name="email"
              required
            />
            {validationErrors.email && (
              <Typography variant="caption" color="error">
                {validationErrors.email}
              </Typography>
            )}
          </FormControl>
          <br></br>

          <FormControl error={!!validationErrors.phone}>
            <lable><b>Phone Number</b></lable>
            <Input
              onChange={(e) => onValueChange(e)}
              name="phone"
              required
            />
            {validationErrors.phone && (
              <Typography variant="caption" color="error">
                {validationErrors.phone}
              </Typography>
            )}
          </FormControl>
          <br></br>

          <FormControl error={!!validationErrors.gender}>
            <lable><b>Gender</b></lable>
            <Select
              onChange={(e) => onValueChange(e)}
              name="gender"
              value={user.gender}
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
            {validationErrors.gender && (
              <Typography variant="caption" color="error">
                {validationErrors.gender}
              </Typography>
            )}
          </FormControl>
          <br />
          
            <FormControl>
              <Button
                variant="contained"
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
