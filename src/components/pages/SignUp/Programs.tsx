import ProgramItem from './Program';
// import { ProgramsProps } from '../SignUp/SignUp';
import { Program } from '../../../hooks/useApplicationData';
import Grid from '@material-ui/core/Grid';

export interface Props {
  programs: Program[],
  setSelected: (selected: string) => void,
  selected: string
}

export default function Programs(props: Props) {

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
