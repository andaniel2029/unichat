import { useEffect, useState } from 'react';
import axios from 'axios';
import Programs from '../components/pages/SignUp/Programs';

export interface Program {
  id: number | null,
  name: string | null,
}

export default function useApplicationData() {

  const programs:Program[] = [];

  const [state, setState] = useState({
    programs,
    error: false
  })

  useEffect(() => {
    axios.get<Program[]>('/api/programs')
    .then(response => {
      setState({
        ...state,
        programs: response.data
      })
    })
    .catch(error => {
      setState({
        ...state,
        error: true
      })
    })
  }, [])

  return {
    state
  }
}
