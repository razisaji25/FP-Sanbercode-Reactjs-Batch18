import React,{Component} from "react";
import { Card} from 'antd';
import { Link} from "react-router-dom";


const gridStyle = {
    width: '50%',
    height:'50%',
    textAlign: 'center',
  }; 
class Home extends Component{

    constructor(props){
      super(props)
      this.state ={
       user : []      
      }
    }
  
    render(){
      return(
        <>
          <div>
          <section>
            <div>
              <Card title="HOME">
                <div>   
                    <div className="container">
                        <Card.Grid style={gridStyle}>
                          <Link to="/listGames">
                            <Card title="Games" 
                                cover={<img alt="" src={'https://thumbor.granitemedia.com/super-smash-bros-ultimate/HlqXkuVxTfU_r8rcOhzTyIiKVZ8=/480x0/filters:format(webp):quality(80)/granite-web-prod/06/b7/06b7d8be299e4d7ab097d20dd898763e.jpeg'} style={{width:'300px',height:'300px', margin:"10%"}}/>
                                        }>
                            </Card>
                          </Link>
                        </Card.Grid>
                        <Card.Grid style={gridStyle}>
                          <Link to="/listMovie">
                            <Card title="Movies" 
                                cover={<img alt="" src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQdrhXWfOZPCLSic4G32ZVNTyl9em1SGwd84A&usqp=CAU'} style={{width:'300px',height:'300px', margin:"10%"}}/>
                                        }>
                            </Card>
                          </Link>
                        </Card.Grid>
                    </div>
                </div>
              </Card>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
            </div>    
          </section>
          <footer>
            <div class="foot">
                <h5>copyright &copy; 2020 by Sanbercode</h5>
            </div>
          </footer>
        </div>
        </>
      )
    }
  }

  
export default Home