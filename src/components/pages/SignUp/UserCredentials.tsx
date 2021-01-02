export {};
// import { useState } from 'react';
// import { Typography } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
// // import { UserCredentialsProps } from './SignUp';
// import { makeStyles } from '@material-ui/core/styles';



// const useStyles = makeStyles((theme) => ({

//   field: {
//     height: '20px',
//     width: '100%',
//     margin: '0.5rem 0rem 0.5rem 0rem',
//     fontFamily: 'halcom',
//     fontSize: '12pt',
//     border: '1px solid #E8E8E8',
//     padding: '10px',
//     borderRadius: '10px',
//     transition: '0.2s ease-in-out',
//     '&:focus': {
//       outline: 'none',
//       border: '1px solid #FF5A5F',
//       borderRadius: '10px',

//     },
//     '&::placeholder': {
//       fontSize: '12pt',
//       fontFamily: 'halcom',
//       color: '#838383'
//     }
//   },

//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },

//   btn: {
//     margin: '1rem 0rem 1.5rem 0rem',
//     fontFamily: 'halcom',
//     color: 'white',
//     background: '#FF5A5F',
//     width: '100px',
//     borderRadius: '20px',
//     boxShadow: 'none',
//     '&:hover': {
//       background: '#FF5A5F',
//     },
//   },

//   error: {
//     color: '#FF5A5F'
//   },

//   inputContainer: {
//     width: '130%',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     height: '200px',
//     // border: '1px solid red',
//   }
// }));

// export default function UserCredentials(props: UserCredentialsProps) {

//   const classes = useStyles();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordConfirm, setPasswordConfirm] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = function(e: any, email: string, password: string, passwordConfirm: string) {
//     e.preventDefault();
//     if(password !== passwordConfirm) {
//       return setError('Passwords do not match');
//     }

//     setError('');
//     props.submit(e, email, password);
//   }

//   return (
//     <form className={classes.form} onSubmit={event => handleSubmit(event, email, password, passwordConfirm)}>
//       <div className={classes.inputContainer}>
//         <input
//             className={classes.field}
//             required
//             type="text"
//             placeholder="Email"
//             value={email}
//             onChange={event => setEmail(event.target.value)}
//           />
//         <input
//             className={classes.field}
//             required
//             type="password"
//             placeholder="password"
//             value={password}
//             onChange={event => setPassword(event.target.value)}
//           />
//         <input
//             className={classes.field}
//             required
//             type="password"
//             placeholder="confirm password"
//             value={passwordConfirm}
//             onChange={event => setPasswordConfirm(event.target.value)}
//           />
//           {error && <Typography className={classes.error}>{error}</Typography>}
//         </div>
//       <Button variant="contained" type="submit" className={classes.btn}>Next</Button>
//     </form>
//   );
// }

