
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Practice from './component/Practice';
import { ChatProvider } from './Context/ChatContext';

const PolicyForm = React.lazy(()=> import('./Pages/Users/Policy/PolicyForm'))
const PolicyIndex = React.lazy(()=> import('./Pages/Users/Policy/PolicyIndex'))
const AdminIndex = React.lazy(()=> import('./Pages/Admin/AdminIndex'))
const Login = React.lazy(()=>import('./Pages/Auth/login')) 
const  Registration =  React.lazy(()=>import('./Pages/Auth/Registration'))
const UserIndex = React.lazy(()=>import('./Pages/Users/userIndex')) 
const Profile = React.lazy(()=>import('./Pages/Users/Profile'))
const Navbar  = React.lazy(()=>import('./component/Navbar'))
const Feature = React.lazy(()=>import("./Pages/Feature/feature"))
const Chat = React.lazy(()=>import('./Pages/Chat/Chat'))
// import './App.css'

function App() {
const navigate = useNavigate()
const location = useLocation()

// Hide navbar on login and registration pages
const hideNavbar = location.pathname === '/login' || location.pathname === '/register'

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      // dispatch(setToken(token));
    }
  }, []);


  return (
    <div className=''>
      {!hideNavbar && <Navbar/>}
      <Toaster position='top-center' reverseOrder={false}/>
          <ChatProvider>
    <Routes>
      <Route path='/' element={<AdminIndex/>} />
      <Route path='/feature' element={<Feature/>} />
  
      <Route path='/chat' element={<Chat/>} />
   

      <Route path='/home' element={<></>} />
    {/* No nesting here */}
  <Route path="/employee" element={<UserIndex />} />
  <Route path="/employee/createpolicy" element={<PolicyForm />} />
  <Route path="/employee/policyindex" element={<PolicyIndex />} />
    
      <Route path='/profile' element={<Profile/>} />
      <Route path='/about' element={<></>} />
      <Route path='/contact' element={<></>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Registration/>} />
      <Route path='/practice' element={<Practice/>} />
    </Routes>
    </ChatProvider>
 
    </div>
  )
}

export default App
