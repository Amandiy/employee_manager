import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormGroup,
  Typography,
  styled,
  Button,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import { editEmployee, getUser } from "../service/api";
import { useNavigate, useParams, Link } from "react-router-dom";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;

  & > div {
    margin-top: 20px;
  }
`;

const defaultValue = {
  fname: "",
  lname: "",
  email: "",
  phone: "",
  gender: "",
};

const EditEmployee = () => {
  const [user, setUser] = useState(defaultValue);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await getUser(id);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!user.fname || !/^[A-Za-z]{6,10}$/.test(user.fname)) {
      errors.fname =
        "First name is required and should have 6-10 alphabetic characters.";
      isValid = false;
    }

    if (!user.lname || !/^[A-Za-z]{6,10}$/.test(user.lname)) {
      errors.lname =
        "Last name is required and should have 6-10 alphabetic characters.";
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

  const editEmployeeDetails = async () => {
    const isValid = validateForm();
    if (isValid) {
      try {
        await editEmployee(user, id);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ marginTop: 75 }}
        component={Link}
        to={`/`}
      >
        Employee List
      </Button>

      <div className="up-sub-main">
        <Container>
          <Typography variant="h4">Update Employee</Typography>

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
              <Typography variant="caption" color="error">
                {validationErrors.fname}
              </Typography>
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
              <Typography variant="caption" color="error">
                {validationErrors.lname}
              </Typography>
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
              <Typography variant="caption" color="error">
                {validationErrors.email}
              </Typography>
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
              <Typography variant="caption" color="error">
                {validationErrors.phone}
              </Typography>
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
              <Typography variant="caption" color="error">
                {validationErrors.gender}
              </Typography>
            )}
          </FormControl>

          <br />

          <FormControl>
            <Button
              variant="contained"
              onClick={() => editEmployeeDetails()}
            >
              Update Employee
            </Button>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};

export default EditEmployee;
