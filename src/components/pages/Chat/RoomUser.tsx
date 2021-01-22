import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({
  root: {

  }

}));

interface Props {
  user: User
}

export default function RoomUser(props: Props) {

  const classes = useStyles();

  return (
    <div>
      {props.user.firstName} {props.user.lastName}
    </div>
  )
}
