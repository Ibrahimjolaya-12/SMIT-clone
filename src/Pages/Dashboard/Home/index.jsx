// Home.jsx — Payment add karo
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashhome from './Dashhome'
import Assignments from './Assignments'
import Attendence from './Attendence'
import Quiz from './Quiz'
import Progress from './Progress'
import Payment from './Payment'

const Home = () => {
  return (
    <Routes>
      <Route path="/dashhome" element={<Dashhome />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/attendence" element={<Attendence />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/payment" element={<Payment />} />   {/* 👈 ye add karo */}
    </Routes>
  )
}

export default Home