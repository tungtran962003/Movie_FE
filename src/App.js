import logo from './logo.svg';
import './App.scss';
import Header from './components/Common/Layout/Header';
import { Outlet, Link } from "react-router-dom";
import Footer from './components/Common/Layout/Footer';

const App = () => {
  return (
    <div className='app-container'>
      <Header />
      <div className='web-content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
