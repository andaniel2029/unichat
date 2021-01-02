import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Program {
  id: number,
  name: string
}

export default function useApplicationData() {

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    axios.get<Program[]>('/api/programs')
    .then(response => {
      setPrograms(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  return {
    programs
  }
}
