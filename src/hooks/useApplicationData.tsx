import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Program {
  id: number | null;
  name: string | null;
}

export interface Course {
  id: number;
  name: string;
  color_code: string;
}

export default function useApplicationData() {

  const programs:Program[] = [];
  const courses:Course[] = [];

  const [state, setState] = useState({
    programs,
    courses,
    error: false
  });

  useEffect(() => {
    Promise.all([
      axios.get<Program[]>('/api/programs'),
      axios.get<Course[]>('/api/courses'),
    ]).then((all) => {
      // SET THE APP STATE
    })
    .then()
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
