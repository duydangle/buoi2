import { Outlet } from 'react-router-dom';
import Header from './containers/header/header';
import { Footer } from './containers/foot/footer';
import { ContextProvider } from './containers/header/Context'; 

function App() {
  return (
    <ContextProvider>
    <div>
      <div className='header'>
        <Header />
      </div>
      <div className='outlet'>
        <Outlet />
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  </ContextProvider>
  );
}


export default App;