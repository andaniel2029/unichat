import { useState, useCallback, useEffect } from 'react';
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Message } from './Chat';
import { useSocket } from '../../../contexts/SocketProvider';

interface StyleProps {
  fromMe: boolean;
  lastMessage: boolean;
  randomIndex: number;
  index: number;
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: 'flex',
    justifyContent: props => props.fromMe ? 'flex-end' : 'flex-start',
    width: '100%',
    height: 'auto',
    padding: '5px 0px 5px 0px',
    wordWrap: 'break-word',
    // background: props => props.randomIndex === props.index ? 'blue' : 'white',
    // margin: props => props.lastMessage ? '0.3rem 0rem 0.3rem 0rem' : '0.3rem 0rem 0.3rem 0rem',
    transition: '0.2s ease-in-out',
    '&:hover': {
      background: '#EDEDED',
      '& $editButton': {
        display: 'block'
      }
    },
  },

  editButton: {
    display: 'none',
    fontFamily: 'halcom',
    fontSize: '10pt',
    color: 'white',
    background: '#FF5A5F',
    height: '30px',
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': {
      background: '#FF5A5F',
    },
  },


  editInput: {
    width: '100%',
    height: '100%',
    border: "1px solid #E3E3E3",
    borderRadius: '15px',
    "&:focus": {
      outline: "none",
    },
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
  randomIndex: number;
  index: number;
  room: string | string[] | null;
}

export default function MessageItem(props: Props) {

  const classes = useStyles(props);
  const { socket } = useSocket();
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(props.message.body);

  const setRef = useCallback(node => {
    if(node) {
      node.scrollIntoView()
    }
  }, []);

  const updateMessage = function(newMessage:string) {
    setEditing(false);
    console.log(newMessage);
    socket.emit('update-message', { id: props.message.id, room: props.room, newMessage })
  }

  useEffect(() => {
    socket.on('set-new-message', (update:any) => {
      if(props.message.id === update.id) {
        setMessage(update.newMessage);
      }
    });
  }, [socket]);

  console.log(props.randomIndex);

  return (
    <div ref={props.lastMessage ? setRef : null} className={classes.root}>
      {props.fromMe && (
          editing ? (
          <Button 
            className={classes.editButton} 
            onClick={() => updateMessage(message)}>
            Save Changes
          </Button>
          ) :
          <Button 
            className={classes.editButton} 
            onClick={() => setEditing(!editing)}>
            Edit
          </Button>
        )
      }
      <div className={classes.messageContainer}>
        <div className={classes.textContainer}>
          {!editing && <Typography className={`${classes.text}`}>{message}</Typography>}
          {editing && 
          <input
            className={`${classes.text} ${classes.editInput}`}
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
