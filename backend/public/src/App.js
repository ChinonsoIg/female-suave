import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Outlet />
      <p>app</p>
    </>
  );
}

export default App;
