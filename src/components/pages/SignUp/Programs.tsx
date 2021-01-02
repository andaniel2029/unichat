import ProgramItem from './Program';
import { SignUpProps } from '../../../App';





export default function Programs(props: SignUpProps) {

  console.log('inside of programs', props);
  return (
    <div>
      {props.programs.map(program => {
        return <ProgramItem key={program.id} {...program}/>
      })}
    </div>
  )
}
