import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Tabs, Tab, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Box from '@mui/material/Box'
import { FormControl } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid grey',

  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}


export default function Login() {

  const initialValues = { username: "", lastname: "", email: "", password: "", contact: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };


  useEffect(() => {

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }

    if (!values.contact) {
      errors.contact = "contact is required!";
    }
    return errors;
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);

  const handleChangeModal = (event, newValue) => {
    setValue(newValue);
  };






  return (
    <div>
      <Button variant='contained' onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Tabs value={value} onChange={handleChangeModal}  >
            <Tab label="Login" />

            <Tab label="Register" />

          </Tabs>

          <TabPanel value={value} index={0} >


            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" placeholder='email' autoFocus required />

            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" required="true" />
            </FormControl><span style={{ display: "flex", alignItems: "center", placeContent: "center " }}>
              <Button
                type='submit'

                variant="contained"
                color="primary"
              >
                Sign in
              </Button>
            </span>

          </TabPanel>




          <TabPanel value={value} index={1} onSubmit={handleSubmit}>
            <FormControl margin="normal" required fullWidth  >
              <InputLabel htmlFor="firstname">First Name</InputLabel>
              <Input id="name" name="username" value={formValues.username} onChange={handleChange} autoFocus required />
            </FormControl>
            <FormControl margin="normal" required fullWidth >
              <InputLabel htmlFor="lastname">Last Name</InputLabel>
              <Input name="lastname" type="text" id="lastname" value={formValues.lastname} onChange={handleChange} required />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Email</InputLabel>
              <Input name="email" type="email" id="email" value={formValues.email} onChange={handleChange} autoComplete="current-email" required="true" />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={formValues.password} onChange={handleChange} autoComplete="current-password" required="true" />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="contact">Contact no</InputLabel>
              <Input name="contact" type="number" id="contact" value={formValues.contact} onChange={handleChange} autoComplete="current-contact" required="true" />

            </FormControl>


            <span style={{ display: "flex", alignItems: "center", placeContent: "center " }}>

              <Button type='submit' variant="contained" color="primary" >  Register </Button>
            </span>

          </TabPanel>

        </Box>

      </Modal>
    </div>
  );
}

















