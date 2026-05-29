import { useEffect } from 'react'
import './App.css'
import ChatPage from './components/ChatPage'
import { connectWs } from './ws.jsx'
// import User from './components/User'
const App = () => {
  useEffect(() => {
     connectWs()
  }, [])
  
  return (
  // <User/>
  <ChatPage/>
  )
}

export default App