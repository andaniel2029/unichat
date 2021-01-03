import ProgramItem from './Program';
import { SignUpProps } from '../../../App';
import Grid from '@material-ui/core/Grid';

export default function Programs(props: SignUpProps) {

  console.log('inside of programs', props);
  return (
    <Grid container justify="center" spacing={0} style={{ padding: '10px'}}>
      {props.programs.map(program => {
        return <ProgramItem key={program.id} {...program}/>
      })}
    </Grid>
  )
}
