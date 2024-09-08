/** @format */

import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link, Grid } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { auth, database } from '../../Configuration/Firebase'; // Firestore and Firebase setup
import styles from './Signup.module.css';
import logo from '../../assets/logo.jpg';
import person from '../../assets/person3.jpg';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(database, 'users', user.uid), {
          name: name,
          email: email,
          uid: user.uid,
        });

        // Save user  in localStorage
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: name,
            email: email,
            uid: user.uid,
          })
        );

        Swal.fire({
          title: 'Good Job!',
          text: 'User Added successfully',
          customClass: {
            container: styles.swalContainer,
            title: styles.swalTitle,
            content: styles.swalContent,
            confirmButton: styles.swalConfirmButton,
          },
          background: '#87000A',
          color: 'white',
          confirmButtonColor: '#5A0007',
          buttonsStyling: false,
        });

        navigate('/');
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleSignUp}
        >
          <Typography variant="h4" gutterBottom className={styles.heading}>
            Sign Up
          </Typography>
          <TextField
            label="Name"
            type="text"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              width: '350px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4CAF50',
                },
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4CAF50',
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              width: '350px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4CAF50',
                },
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4CAF50',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              width: '350px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4CAF50',
                },
                '&:hover fieldset': {
                  borderColor: '#4CAF50',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#4CAF50',
              },
            }}
          />
          <Grid container>
            <Grid item>
              <Link
                href="/"
                sx={{
                  color: 'black',
                  textDecoration: 'none',
                  position: 'relative',
                  fontSize: '16px',
                  fontFamily: 'sans-serif',
                }}
              >
                {'Already have an account? '}
              </Link>
            </Grid>
          </Grid>

          <Button
            type="submit"
            sx={{
              width: '350px',
              marginTop: '16px',
              backgroundColor: '#4CAF50', // Green color
              color: 'white',
              '&:hover': {
                backgroundColor: '#388E3C', // Darker green for hover
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </div>

      <div className={styles.imageAndFormContainer}>
        <div className={styles.imageContainer}>
          {/* <img src={logo} alt="Logo" className={styles.logo} /> <br /> */}
          {/* <h2>Learning Management System</h2> */}
          {/* <img src={person} alt="Person" className={styles.people} /> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
