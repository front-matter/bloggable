import React, { Component } from 'react'
import IndexNavbar from '../components/Navbars/IndexNavbar.js'
import Footer from '../components/Footers/Footer.js'

const ErrorPage = () => {
  return (
    <>
      <IndexNavbar />
      <div className="container px-4 pt-16 flex flex-wrap mx-auto h-screen">
        <h1 className="text-red-500">404 Page Not Found</h1>
      </div>
      <Footer />
    </>
  )
}

export default ErrorPage
