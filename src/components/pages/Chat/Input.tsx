import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { User } from './Chat';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '8%',
    background: '#F7F7F7',
    borderRadius: '0px 0px 20px 0px'
  },

}));

interface Props {
}

export default function Input(props: Props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      Input
    </div>
  )
}
