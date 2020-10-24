import React from 'react';
import Sider from './component/index'; 
import {UserProvider} from "./component/utilitas/UserContext"

function App() {
  return (
    <div>
      <div>
      <UserProvider>
        <Sider/>
      </UserProvider>
      </div>
    </div>
  );
}

export default App;
