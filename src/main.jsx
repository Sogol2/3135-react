import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'

const link = ({ isActive }) => ({ textDecoration:'none', color: isActive ? '#0a5fff' : '#54606e' })


function Layout(){ return (<><Header/><main style={{maxWidth:900, margin:'0 auto', padding:'1rem 1.25rem'}}><Outlet/></main><Footer/></>) }

function Home(){ return (<section style={{textAlign:'center'}}><h2>Welcome</h2><p>My name is Sogol, I am currently pursuing a Bachelor of Arts in Computer Science with a minor in Data Science at the University of North Carolina at Charlotte. I am passionate about technology and problem-solving, and I have developed strong technical skills in programming languages such as SQL, Java, JavaScript, Python, and C++. I enjoy spending my free time dancing, listening to the podcast, reading books and going to the gym.</p></section>) }
function Contract() {
  return (
    <section style={{ textAlign: 'center' }}>
      <h2>Contract</h2>
      <p>Here you can place your client/instructor contract details, scope, and signatures.</p>
    </section>
  )
}function Introduction(){ return (<section style={{textAlign:'center'}}><h2>Introduction</h2><p>Your intro text here.</p></section>) }

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
