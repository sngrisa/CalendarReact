import React from 'react'
import { userBearStore } from '../store/userStore';

const Zustand = () => {

    const bears = userBearStore ((state: any)=> state.bears+1 );
    return <h1>{bears} around here...</h1>;

  return (
    <>
    </>
  )
}

export default Zustand;