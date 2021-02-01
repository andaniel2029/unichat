import { useState, useCallback } from 'react';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './Chat';

interface StyleProps {
  fromMe: boolean;
  lastMessage: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: 'flex',
    justifyContent: props => props.fromMe ? 'flex-end' : 'flex-start',
    width: '100%',
    height: 'auto',
    wordWrap: 'break-word',
    margin: props => props.lastMessage ? '0.3rem 0rem 0.3rem 0rem' : '0.3rem 0rem 0.3rem 0rem',
  },

  text: {
    fontFamily: 'halcom'
  },
  
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
    padding: '0rem 0.7rem 0rem 0.7rem',
    alignItems: props => props.fromMe ? 'flex-end' : 'flex-start',
  },

  textContainer: {
    background: props => props.fromMe ? '#FF5A5F' : '#F7F7F7',
    color: props => props.fromMe ? 'white' : 'black',
    padding: '5px 8px 5px 8px',
    borderRadius: '15px',
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
  },

  nameContainer: {
    padding: props => props.fromMe ? '0px 5px 0px 0px' : '0px 0px 0px 5px'
  },

  name: {
    color: '#8E8E8E',
  }

}));

interface Props {
  message: Message;
  fromMe: boolean;
  lastMessage: boolean;
}

export default function MessageItem(props: Props) {

  const classes = useStyles(props);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(props.message.body);

  const setRef = useCallback(node => {
    if(node) {
      node.scrollIntoView()
    }
  }, []);

  console.log(props.message.body);

  return (
    <div ref={props.lastMessage ? setRef : null} className={classes.root}>
      <button onClick={() => setEditing(!editing)}>Edit</button>
      <div className={classes.messageContainer}>
        <div className={classes.textContainer}>
          {!editing && <Typography className={`${classes.text}`}>{message}</Typography>}
          {editing && <input
            type="text"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />}
          {/* {editing && <Typography className={`${classes.text}`}>haha some new message</Typography>} */}
        </div>
        <div className={classes.nameContainer}>
          <Typography className={`${classes.text} ${classes.name}`}>{props.message.firstName} {props.message.lastName}</Typography>
        </div>
      </div>
    </div>
  )
}
