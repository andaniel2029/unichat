// React
import { useState, useCallback, useEffect } from 'react';

// Components and Interfaces
import { Message } from './Chat';

// Contexts and Hooks
import { useSocket } from '../../../contexts/SocketProvider';

// Material UI
import { Theme, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'


const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: 'auto',
    padding: '5px 0px 5px 0px',
    justifyContent: props => props.fromMe ? 'space-between' : 'flex-start',
    marginTop: props => props.index === 0 ? '15px' : 'none',
    background: props => props.editing ? '#EDEDED' : 'white',
    wordWrap: 'break-word',
    transition: '0.2s ease-in-out',
    '&:hover': {
      background: '#EDEDED',
      '& $editButton': {
        display: 'block'
      }
    },
  },

  text: {
    fontFamily: 'halcom',
    fontSize: '12pt',
  },

  editButton: {
    display: props => props.editing ? 'block' : 'none',
    fontFamily: 'halcom',
    fontSize: '10pt',
    color: 'white',
    background: '#FF5A5F',
    borderRadius: '10px',
    boxShadow: 'none',
    '&:hover': {
      background: '#FF5A5F',
    },
  },

  messageOptionsContainer: {
    display: 'flex',
    alignItems: 'center',
    minWidth: '50px',
    paddingLeft: '10px',
  },

  messageRoot: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '80%',
    padding: '0rem 0.7rem 0rem 0.7rem',
    alignItems: props => props.fromMe ? 'flex-end' : 'flex-start',
  },

  messageDataContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: props => props.fromMe ? 'row' : 'row-reverse',
  },
  
  messageTextContainer: {
    maxWidth: '80%',
    display: 'flex',
    background: props => props.fromMe ? '#FF5A5F' : '#F7F7F7',
    color: props => props.fromMe ? 'white' : 'black',
    padding: '5px 8px 5px 8px',
    borderRadius: '15px',
    boxShadow: "0px 2px 5px 0.5px #E3E3E3",
  },

  messageTimeEditedContainer: {
    textAlign: props => props.fromMe ? 'right' : 'left',
    margin: props => props.fromMe ? '0px 10px 0px 0px' : '0px 0px 0px 10px',
    height: '32px',

  },
  
  timeEditedText: {
    fontSize: '10pt',
  },

  timeText: {
    color: '#8E8E8E'
  },

  editedText: {
    color: '#ACABAB'
  },

  editInput: {
    height: '100%',
    fontSize: '12pt',
    border: "1px solid #E3E3E3",
    borderRadius: '15px',
    "&:focus": {
      outline: "none",
    },
  },

  senderNameContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width:  '100%',
    flexDirection: props => props.fromMe ? 'row' : 'row-reverse',
    padding: props => props.fromMe ? '0px 5px 0px 5px' : '0px 0px 0px 5px',
  },

  senderName: {
    color: '#8E8E8E',
  }
}));

// Interfaces
interface StyleProps {
  fromMe: boolean;
  lastMessage: boolean;
  editing: boolean;
  index: number;
}

interface Props {
  message: Message;
  fromMe: boolean;
  lastMessage: boolean;
  room: string | string[] | null;
  index: number;
}

export default function MessageItem(props: Props) {
  
  // Context variables
  const { socket } = useSocket();
  // State
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState(props.message.is_edited);
  const [message, setMessage] = useState(props.message.body);
  const [editedMessage, setEditedMessage] = useState(props.message.body);
  
  // Styles
  const classes = useStyles({ ...props, editing });

  useEffect(() => {
    socket.on('set-new-message', (update:any) => {
      if(props.message.id === update.id) {
        setEdited(true);
        setMessage(update.newMessage);
      }
    });
  }, [socket]);

  // Scrolling the container to show the latest message (i.e. scroll-to-bottom behavoir)
  const setRef = useCallback(node => {
    if(node) {
      node.scrollIntoView()
    }
  }, []);

  // Responsible for handling message edits
  const updateMessage = useCallback((newMessage: string) =>  {
    setEditing(false);

    // Preventing emitting to other clients when no changes are made
    if(newMessage !== message) {
      setEdited(true);
      setMessage(newMessage);
      socket.emit('update-message', { id: props.message.id, room: props.room, newMessage });
    }
  }, [message, socket, props.message.id, props.room]);
  
  return (
    <div ref={props.lastMessage ? setRef : null} className={classes.root}>
      {props.fromMe && (
        <div className={classes.messageOptionsContainer}>
          {editing ? (
            <Button 
              className={classes.editButton} 
              onClick={() => updateMessage(editedMessage)}>
              Save
            </Button>
            ) :
            <Button 
              className={classes.editButton} 
              onClick={() => setEditing(!editing)}>
              Edit
            </Button>
          }
        </div>
      )}
      <div className={classes.messageRoot}>
        <div className={classes.messageDataContainer}>
          <div className={classes.messageTimeEditedContainer}>
            <Typography className={`${classes.text} ${classes.timeEditedText} ${classes.timeText}`}>{props.message.created_at}</Typography>
            {edited && 
            <Typography className={`${classes.text} ${classes.timeEditedText} ${classes.editedText}`}>Edited</Typography>}
          </div>
          <div className={classes.messageTextContainer}>
            {!editing && <Typography className={`${classes.text}`}>{message}</Typography>}
            {editing && 
            <input
              className={`${classes.text} ${classes.editInput}`}
              type="text"
              value={editedMessage}
              onChange={event => setEditedMessage(event.target.value)}
            />}
          </div>
        </div>
        <div className={classes.senderNameContainer}>
          <Typography className={`${classes.text} ${classes.senderName}`}>{props.message.firstName} {props.message.lastName}</Typography>
        </div>
      </div>
    </div>
  )
}
