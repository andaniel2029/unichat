import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '90%'
  },

}));

interface Props {
}

export default function Feed(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      Feed
    </div>
  )
}
