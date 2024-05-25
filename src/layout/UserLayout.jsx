import React from 'react'

import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/navbar/UserNavbar'

export default function UserLayout() {
  return (
    <>
    <UserNavbar />
    <Outlet />
    </>
  )
}
