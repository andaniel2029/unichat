import { useEffect, useState } from 'react';
import axios from 'axios';

// Interfaces
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

  // appData variables
  const programs:Program[] = [];
  const courses:Course[] = [];

  // Application-level state
  const [state, setState] = useState({
    programs,
    courses,
    error: false
  });

  // Responsible for retrieving all app-level data from the API
  useEffect(() => {
    Promise.all([
      axios.get<Program[]>('/api/programs'),
      axios.get<Course[]>('/api/courses'),
    ]).then((all) => {
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
  }, []);

  return {
    state
  }
}
