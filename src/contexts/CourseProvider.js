import React, { useContext, useState } from 'react';

const CourseContext = React.createContext();

export function useCourse() {
  return useContext(CourseContext);
}

export function CourseProvider({ children }) {

  const [selectedCourse, setSelectedCourse] = useState('');

  const value = {
    selectedCourse,
    setSelectedCourse
  }

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  )
}