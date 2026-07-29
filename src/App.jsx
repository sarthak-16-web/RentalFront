import { BrowserRouter } from 'react-router-dom'   // 1. router wrapper — required for Link/NavLink
import './App.css'
import './styles/variable.css'                   // 2. design tokens (colors, fonts) used by Navbar.css
import Navbar from './pages/Navbar'                 // 3. import the component
import Fotter from './pages/Fotter'
import TeamPreview from './pages/TeamPreview'
import Home from './pages/Home'
import PartnersMarquee from './pages/Partnersmarquee'
import TestimonialsHome from './pages/TestimonialsHome'
import PropertiesHome from './pages/PropertiesHome'
function App() {
  return (
    <BrowserRouter>                                  {/* 4. wrap everything that uses routing */}
      <Navbar /> 
      <Home></Home>   
      <PropertiesHome/>

      <TeamPreview></TeamPreview> 
      <PartnersMarquee></PartnersMarquee> 
      <TestimonialsHome></TestimonialsHome>
     <Fotter/>
    </BrowserRouter>
  )
}

export default App