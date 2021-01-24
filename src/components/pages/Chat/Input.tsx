import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import AttachFileIcon from '@material-ui/icons/AttachFile';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '8%',
    background: '#F7F7F7',
    borderRadius: '0px 0px 20px 0px',
  },

  form: {
    width: '90%',
    // height: '20px',

  },

  text: {
    fontFamily: 'halcom'
  },
  
  input: {
    width: '85%',
    height: '20px',
    border: "1px solid #E3E3E3",
    padding: '3px 8px 3px 8px',
    transition: '0.2s ease-in-out',
    borderRadius: "20px 0px 0px 20px",
    "&:focus": {
      outline: "none",
      border: '1px solid #ACABAB'
    },
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

  iconContainer: {

  },

  icon: {
    color: '#585858'
  }

}));

interface Props {
}

export default function Input(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.iconContainer}>
        <AttachFileIcon className={classes.icon}/>
      </div>
      <form className={classes.form}>
        <input
          className={`${classes.text} ${classes.input}`}
          type="text"
          placeholder="Type a message..."
          onClick={(event) => {}}
        />
        <button
          className={`${classes.text} ${classes.button}`}
        >
          Send
        </button>
      </form>
    </div>
  )
}
