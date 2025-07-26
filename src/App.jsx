import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import MainPage from './pages/MainPage'
import Reservation from './pages/ReservationPage/Reservation'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/reservation' element={<Reservation />} />
      </Routes>
    </>
  )
}

export default App
