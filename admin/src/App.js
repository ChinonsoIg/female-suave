import "./App.css";
import "./styles/Home.css";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

const App = () => {
  return (
    <main className="main_container">
      <div className="colour_stripe" />
        <NavBar />
        <div className='container mt-5'>
          <Products />
        </div>
    </main>
  );
}

export default App;
