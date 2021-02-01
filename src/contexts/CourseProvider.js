import React, { useContext, useState } from 'react';

const CourseContext = React.createContext();

export function useCourse() {
  return useContext(CourseContext);
}

export function CourseProvider({ children }) {

  const [course, setCourse] = useState('');

  const value = {
    course,
    setCourse
  }

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  )
}