
import LoginSection from "./components/LoginSection";
import DisplayItems from "./components/DisplayItems";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/NavBar";
import DisplayDetails from "./components/DiplayDetails";
import SimpleRegistrationForm from "./components/SimpleRegistrationForm";

import RequestItem from "./components/RequestItem";
import DisplayRequiredItems from "./components/DisplayRequiredItems";






function App() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [contributor, setContributor]= useState(false);

  const [data, setData]= useState(null);
  const [loginStatus, setLoginStatus] = useState(false);


  return (
    <BrowserRouter>
      <div className=" w-full h-auto bg-white" >
        <NavBar loginStatus={loginStatus} setLoginStatus={setLoginStatus} contributor={contributor}/>
        <Switch>
          
          <Route path="/requestedItems">
            <DisplayRequiredItems />
          </Route>
          <Route exact path ="/inventory" >
          {  <DisplayItems setData= {setData}/>}
          </Route>
          <Route path="/itemDetails/:itemId">
           {data &&  <DisplayDetails displayItems = {data} />}
          </Route>
          <Route path = "/contribute">
            <SimpleRegistrationForm />
          </Route>
          <Route path = "/requestItem">
            <RequestItem />

          </Route>
          <Route path = "/">
            <LoginSection 
            setUsername={setUsername}  
            setPassword = {setPassword} 
            setLoginStatus={setLoginStatus} 
            setContributor={setContributor}
            contributor = {contributor}/>
          </Route>
        </Switch>

        
      </div>
    </BrowserRouter>
  );
}

export default App;

