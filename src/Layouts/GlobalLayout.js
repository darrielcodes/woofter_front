import React, {useEffect} from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { checkAuthToken } from '../lib/checkAuthToken'
import { authCheck } from '../Slices/authSlice'
import { useSelector, useDispatch } from 'react-redux';

const GlobalLayout = () => {
    // check auth with backend
    const auth = useSelector( state => state.auth.isAuth )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authCheck())
      }, [auth])

      console.log(auth);
  return (
    <>
    <Outlet />  
    </>
  )
};

export default GlobalLayout;