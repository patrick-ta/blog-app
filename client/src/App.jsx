import { useState } from 'react'
import './App.css'

import { Navigate, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PostPage from '../pages/PostPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/post' element={<PostPage/>}></Route>
    </Routes>
  )
}

export default App
