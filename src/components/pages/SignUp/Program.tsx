import { Program } from '../../../hooks/useApplicationData';

export default function ProgramItem(props: Program) {
  return (
    <div>
      {props.name}
    </div>
  )
}