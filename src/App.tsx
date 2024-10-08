
import './App.css';
import RoutesConfig from './routes/routes.config';
import Navbar from './shared/navbar/navbar';

function App() {

  return (
    <>
      <Navbar />
      <div className='container mx-auto gap-4 cursor-pointer mb-20 mt-10'>
        <RoutesConfig />
      </div>

    </>
  )
}

export default App
