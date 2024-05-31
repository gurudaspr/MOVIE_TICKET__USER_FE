import React from 'react'

import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/navbar/UserNavbar'
import Footer from '../components/footer/Footer'

export default function UserLayout() {
  return (
    <>
    <UserNavbar />
    <Outlet />
    <Footer />
    </>
  )
}
