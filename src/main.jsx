import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Introduction from './Introduction.jsx';
import Contract from './Contract.jsx';
import Home from './Home.jsx'

const link = ({ isActive }) => ({ textDecoration:'none', color: isActive ? '#0a5fff' : '#54606e' })


function Layout(){ return (<><Header/><main style={{maxWidth:900, margin:'0 auto', padding:'1rem 1.25rem'}}><Outlet/></main><Footer/></>) }



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="contract" element={<Contract/>} />        <Route path="introduction" element={<Introduction/>} />
        <Route path="*" element={<div style={{padding:20}}>404 — Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
