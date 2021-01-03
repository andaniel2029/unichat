import { useState } from 'react'
import ProgramItem from './Program';
import { SignUpProps } from '../../../App';
import { ProgramsProps } from '../SignUp/SignUp';
import Grid from '@material-ui/core/Grid';


export default function Programs(props: ProgramsProps) {

  const [selected, setSelected] = useState('');

  console.log('inside of programs', props);
  return (
    <Grid container justify="center" spacing={0} style={{ padding: '0px'}}>
      {props.programs.map(program => {
        return <ProgramItem key={program.id} selected={selected === program.name} setSelected={setSelected} {...program}/>
      })}
    </Grid>
  )
}
