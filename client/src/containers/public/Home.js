import React, { useEffect } from 'react'
import { Header, Navigation } from '../../components'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components'
import { getCurrentUser } from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth) 
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getCurrentUser())
    }, 100);
  }, []) 
  
  return (
    <div className='w-full  px-10 bg-[#f5f5f5]    flex justify-center flex-col     '>
    {/* <div className='w-full  px-10 bg-[#f5f5f5]    flex justify-center flex-col    bg-gradient-to-r from-purple-500 to-pink-500 '> */}
      <Header />
      <Navigation />
      <div></div>
      <div className='w-full    '>
        <Outlet />
      </div>
      <Footer />
    </div>  

  )
}

export default Home