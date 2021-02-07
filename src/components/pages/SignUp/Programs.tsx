// Components
import ProgramItem from './ProgramItem';

// Material UI
import Grid from '@material-ui/core/Grid';


// Interfaces
export interface Props {
  programs: any,
  setSelected: (selected: string) => void,
  selected: string
}

export default function Programs(props: Props) {

  return (
    <Grid container justify="center" spacing={0}>
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
