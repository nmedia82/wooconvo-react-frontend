import React from 'react';
import NoticeMessage from './pages/NoticeMessage'
import CustomerMessage from './pages/CustomerMessage'
import ReplyMessage from './pages/ReplyMessage'

function App(props) {
  return (
    <>
      <NoticeMessage />
      <CustomerMessage />
      <ReplyMessage />
    </>
  );
}

export default App;