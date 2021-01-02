import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {

  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('/api/programs').then(response => {
      console.log(response.data);
    })
  })

  return {
    programs
  }
}
