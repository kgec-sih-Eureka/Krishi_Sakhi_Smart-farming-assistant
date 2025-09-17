import "./App.css";
import { Outlet } from "react-router";
import { Header, Footer} from "./components";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
