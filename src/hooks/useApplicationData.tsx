import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Program {
  id: number | null;
  name: string | null;
}

export interface Course {
  id: number;
  name: string;
  color_main: string;
  color_gradient: string;
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
      console.log('programs', all[0].data)
      console.log('courses', all[1].data)
      setState({
        ...state,
        programs: all[0].data,
        courses: all[1].data
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
