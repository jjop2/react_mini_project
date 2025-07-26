import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './component/Header'
import MainPage from './pages/MainPage'
import ReservationForm from './pages/ReservationPage/ReservationForm'

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/reservation'>
          <Route path='form' element={<ReservationForm />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
