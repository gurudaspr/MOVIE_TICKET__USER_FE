import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Hero from '../components/hero/Hero'
import { Outlet } from 'react-router-dom'

export default function HomeLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    </>
  )
}
