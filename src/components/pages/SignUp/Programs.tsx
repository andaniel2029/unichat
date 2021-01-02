import ProgramItem from './Program';
import { SignUpProps } from '../../../App';

export default function Programs(props: SignUpProps) {

  console.log('inside of programs', typeof props.programs);
  return (
    <div>
      {props.programs.map(program => {
        return <ProgramItem {...program}/>
      })}
    </div>
  )
}
