import ProgramItem from './ProgramItem';
// import { Program } from '../../../hooks/useApplicationData';
import Grid from '@material-ui/core/Grid';

export interface Props {
  programs: any,
  setSelected: (selected: string) => void,
  selected: string
}

export default function Programs(props: Props) {

  return (
    <Grid container justify="center" spacing={0} style={{ padding: '0px'}}>
      {props.programs.map((program:any) => {
        return (
          <ProgramItem 
            key={program.id} 
            program={program}
            selected={props.selected === program.name} 
            setSelected={props.setSelected} 
            />
        )
      })}
    </Grid>
  )
}
