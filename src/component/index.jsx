import React,{useContext} from 'react'
import 'antd/dist/antd.css';    
import { Layout, Menu } from 'antd';
import {
  // AppstoreOutlined,
  // BarChartOutlined,
  // CloudOutlined,
  // ShopOutlined,
  // TeamOutlined,
  UserOutlined,
  CarFilled,
  YoutubeFilled,
} from '@ant-design/icons';
import '../style/index.css'
import logo from '../Asset/logo.png';
import Login from './utilitas/Login';
import ListGames from './Game/listGames';
import TabelGames from './Game/TabelGames';
import ListMovie from './Movie/listMovie';
import EditableTable from './Movie/TabelMovie';
import Home from './home';
import { BrowserRouter as Routes,Switch, Route,Link, Redirect } from "react-router-dom";
import Register from './utilitas/Register';
import { UserContext } from './utilitas/UserContext';
import Logout from './utilitas/Logout'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Siders = () =>{
  const [user] = useContext(UserContext)

  const PrivateRoute = ({user, ...props})=>{
    if(user){
      return <Route {...props}/>;
    }else {
      return <Redirect to="/Login"/>
    }
  }

  const LoginRoute = ({user, ...props})=>
  user ? <Redirect to="/"/>:<Route{...props}/>; 


  return(
<>
<Routes>
  <Layout>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
        <div className="background">
        <img src={logo} href="/"alt="logo" width="210px"/>
        </div>
        <br/>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/">HOME</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<CarFilled />} title="Games">
          <Menu.Item key="2" icon={<CarFilled />}>
            <Link to="/listGames">List Game</Link>
          </Menu.Item>
          {user &&<Menu.Item key="3" icon={<CarFilled />}>
            <Link to="tabelGames">Tabel Game</Link>
          </Menu.Item>
          }
        </SubMenu>
        <SubMenu key="sub2" icon={<YoutubeFilled />} title="Movie">
          <Menu.Item key="4" icon={<YoutubeFilled />}>
            <Link to="/listMovie">List Movie</Link>
          </Menu.Item>
          {user && <Menu.Item key="5" icon={<YoutubeFilled />}>
            <Link to="/tabelMovie">Tabel Movie</Link>
          </Menu.Item>
          }
        </SubMenu>
        <SubMenu key="sub3" icon={<UserOutlined  />} title="Propertise">
          <Menu.Item key="6" icon={<UserOutlined  />}>
            <Link to="/Login">Login</Link>
          </Menu.Item>
          {user === null && <Menu.Item key="7" icon={<UserOutlined  />}>
            <Link to="/register">Register</Link>
          </Menu.Item>}
          <Menu.Item key="8" icon={<UserOutlined  />}>
            <Link to="/Logout">Logout</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0 }}>
          <div>
              {user ? 
              <h3 style={{textAlign:'center', margin:'30px',font:'caption'}}>Welcome, {user.name}</h3>
              :
              <h3 style={{textAlign:'center', margin:'30px',font:'caption'}}>Untuk Mengedit Data:"Silahkan Login Terlebih Dahulu!"</h3>}
          </div>
      </Header>  
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
        
        <Switch>
          <Route path="/Logout">
              <Logout />
          </Route>
          <LoginRoute path="/register" user={user}>
              <Register />
          </LoginRoute>
          <LoginRoute path="/Login" user={user}>
              <Login />
          </LoginRoute>
          <PrivateRoute path="/tabelGames" user={user}>
              <TabelGames />
          </PrivateRoute>  
          <Route path="/listGames">
              <ListGames />
          </Route>
          <PrivateRoute path="/tabelMovie" user={user}>
              <EditableTable />
          </PrivateRoute>
          <Route path="/listMovie">
              <ListMovie />
          </Route> 
          <Route exact path="/">
              <Home />
          </Route>
          {/* <Route exact path="/">
              <Home />
          </Route> */}
          
        </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  </Routes>,
  </>
);}

export default Siders