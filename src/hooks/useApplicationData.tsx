import { useEffect, useState } from 'react';
import axios from 'axios';

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
