import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'

const link = ({ isActive }) => ({ textDecoration:'none', color: isActive ? '#0a5fff' : '#54606e' })

function Header(){
  return (
    <header style={{maxWidth:900, margin:'3rem auto 1rem', fontFamily:'system-ui'}}>
      <h1 style={{margin:0}}>Sogol’s Sunny Macaw | ITIS 3135</h1>
      <ul style={{margin:'.75rem 0 0', paddingLeft:'1.2rem'}}>
        <li><NavLink to="/" end style={link}>Home</NavLink></li>
        <li><NavLink to="/project-overview" style={link}>Project Overview</NavLink></li>
        <li><NavLink to="/introduction" style={link}>Introduction Form</NavLink></li>
      </ul>
      <hr style={{border:0, borderTop:'1px solid #e5e7eb', marginTop:'1rem'}}/>
    </header>
  )
}
function Footer(){
  return <footer style={{maxWidth:900, margin:'2rem auto', textAlign:'center', color:'#8a8f98'}}>© 2025 Sogol Maghzian — ITIS 3135</footer>
}
function Layout(){ return (<><Header/><main style={{maxWidth:900, margin:'0 auto', padding:'1rem 1.25rem'}}><Outlet/></main><Footer/></>) }

function Home(){ return (<section style={{textAlign:'center'}}><h2>Welcome</h2><p>This is a simple React application structure.</p></section>) }
function ProjectOverview(){ return (<section style={{textAlign:'center'}}><h2>Project Overview</h2><p>Same content as your normal site here.</p></section>) }
function Introduction(){ return (<section style={{textAlign:'center'}}><h2>Introduction</h2><p>Your intro text here.</p></section>) }

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="project-overview" element={<ProjectOverview/>} />
        <Route path="introduction" element={<Introduction/>} />
        <Route path="*" element={<div style={{padding:20}}>404 — Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
