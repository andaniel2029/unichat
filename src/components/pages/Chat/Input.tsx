import { useState, FormEvent } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import AttachFileIcon from '@material-ui/icons/AttachFile';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    height: '8%',
    background: '#F7F7F7',
    // borderRadius: '0px 0px 20px 0px',
  },

  form: {
  },
  
  formContainer: {
    width: '92%',
  },

  text: {
    fontFamily: 'halcom'
  },
  
  input: {
    width: '100%',
    height: '30px',
    border: "1px solid #E3E3E3",
    padding: '0px 6px 0px 6px',
    transition: '0.2s ease-in-out',
    borderRadius: '20px',
    "&:focus": {
      outline: "none",
    },
  },

  
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '5%',
  },
  
  icon: {
    color: '#585858'
  },
  
  button: {
    width: '60px',
    border: 'none',
    height: '28px',
    borderRadius: "0px 20px 20px 0px",
    background: "#FF5A5F",
    color: "white",
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },

}));

interface Props {
  sendMessage: (event: FormEvent, message:string) => void;
  userTyping: (key:string) => void;
}

export default function Input(props: Props) {

  const classes = useStyles();
  const [message, setMessage] = useState('');

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <AttachFileIcon className={classes.icon}/>
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={event => {
          props.sendMessage(event, message);
          setMessage('');
          }}
        >
          <input
            className={`${classes.text} ${classes.input}`}
            value={message}
            type="text"
            placeholder="Type a message..."
            onChange={event => setMessage(event.target.value)}
            onClick={(event) => {}}
            onKeyPress={(event:React.KeyboardEvent<HTMLInputElement>) => {
              props.userTyping(event.key);
            }}
          />
          {/* <button
            type="submit"
            className={`${classes.text} ${classes.button}`}
          >
            Send
          </button> */}
        </form>
      </div>
    </div>
  )
}
