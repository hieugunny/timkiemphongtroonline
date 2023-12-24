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
    }, 500);
  }, [isLoggedIn])

  return (
    <div className='w-1100 m-auto bg-[#f5f5f5]   '>
      <Header />
      <Navigation />

      <div className='w-full'>
        <Outlet />
      </div>
      <Footer />
    </div>

  )
}

export default Home