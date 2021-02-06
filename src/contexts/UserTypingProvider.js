import React, { useContext, useState } from 'react';

const UserTypingContext = React.createContext();

export function useUserTyping() {
  return useContext(UserTypingContext);
}

export function UserTypingProvider( { children }) {


}