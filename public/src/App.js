import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <h1 className="text-3xl font-bold underline">      Hello world!</h1>
      <button className="bg-sky-600 hover:bg-sky-700 p-5">
        Save changes
      </button>
    </>
  );
}

export default App;
