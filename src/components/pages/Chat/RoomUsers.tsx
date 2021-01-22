import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';
import RoomUser from './RoomUser';



const useStyles = makeStyles((theme) => ({
  root: {

  }

}));

interface Props {
  users: User[]
}

export default function RoomUsers(props: Props) {

  const classes = useStyles();

  return (
    <div>
      {props.users.map(user => {
        return (
          <RoomUser user={user} />
        )
      })}
    </div>
  )
}
