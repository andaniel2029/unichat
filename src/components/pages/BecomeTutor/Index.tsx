// React
import React, { useState, useEffect } from 'react';

// Other libraries
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Typography } from '@material-ui/core';

export default function BecomeTutor() {

  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('/api/courses/tutorcourses').then((res: AxiosResponse) => {
      console.log(res.data);
    })
    .catch((error:AxiosError) => setError(true));
  })

  return (
    <div>
      <Typography>Become A Tutor Page</Typography>
      {error && <Typography>There was an error</Typography>}
    </div>
  )
}
