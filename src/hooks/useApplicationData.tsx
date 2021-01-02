import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [programs, setPrograms] = useState<Object>([]);

  useEffect(() => {
    axios.get<Object>('/api/programs')
    .then(response => {
      setPrograms(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }, [])

  return {
    programs
  }
}
