import React from 'react'
import Mynotes from './components/Mynotes'
import Allnotes from './components/Allnotes'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'


const App = () => {
  return (
    <div className='flex h-screen w-screen'>
     {/* <Mynotes/> */}

     <Router>
    <Routes>
      <Route path='/' element={<Mynotes/>}/>
      <Route path='/mynotes' element={<Allnotes/>}/>
    </Routes>
  </Router>
    </div>
  )
}

export default App