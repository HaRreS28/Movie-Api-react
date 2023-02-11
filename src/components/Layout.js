import { Outlet } from "react-router-dom";

import React from 'react'

const Layout = () => {
  return (
    <main style={{flex:'1'}}>
        <Outlet/>
    </main>
  )
}

export default Layout