import ProgramItem from './Program';
import { ProgramsProps } from '../SignUp/SignUp';
import Grid from '@material-ui/core/Grid';

export default function Programs(props: ProgramsProps) {

  return (
    <Grid container justify="center" spacing={0} style={{ padding: '0px'}}>
      {props.programs.map(program => {
        return (
          <ProgramItem 
            key={program.id} 
            {...program}
            selected={props.selected === program.name} 
            setSelected={props.setSelected} 
            />
        )
      })}
    </Grid>
  )
}
