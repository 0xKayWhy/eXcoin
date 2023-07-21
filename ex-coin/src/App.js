import { Route, Routes } from "react-router-dom";
import { NavigationBar } from "./component/Navbar";
import Listing from "./component/Listing";
import Currency from "./component/Currency/Currency";
import { useRoute } from "./context";

import "./App.css";

function App() {
  const routeCoin = useRoute()
  const urlRoute = routeCoin.selectCoin?.name || null

  console.log('type' ,urlRoute)
  return (
    <div>
      <NavigationBar />
     
      <Routes>
      <Route path="/" element={<Listing/>}/>
      {urlRoute && <Route path={`/currencies/${urlRoute}`} element={<Currency/>}/>}
      
      </Routes>
    </div>
  );
}

export default App;
