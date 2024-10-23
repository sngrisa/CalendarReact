
import './App.css';
import RoutesConfig from './routes/routes.config';
import Footer from './shared/footer/footer';
import Navbar from './shared/navbar/navbar';

function App() {

  return (
    <>
      <Navbar />
      <div className='cursor-pointer mb-20 mt-30'>
      
        <RoutesConfig />
      </div>
      <Footer />
    </>
  )
}

export default App
