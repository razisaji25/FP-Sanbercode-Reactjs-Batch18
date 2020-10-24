import axios from 'axios';
import React,{useState,useEffect} from 'react';
import '../../style/listGames.css';
import { Card} from 'antd';


const { Meta } = Card;
//const { Title } = Typography;
const ListGames = () => {  
    const [daftarGames, setDaftarGames] =  useState(null);
    
      //untuk menjadikan saling terhubung

    useEffect(()=>{
      if (daftarGames=== null){
        axios.get("https://backendexample.sanbersy.com/api/data-game")
        .then(res => setDaftarGames(res.data.map(el =>{ 
          return{
            id: el.id,
            name:el.name,
            genre: el.genre,
            singlePlayer: el.singlePlayer,  
            multiplayer: el.multiplayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          }
        })))
      }
    },[daftarGames])
    
    const gridStyle = {
        width: '49%',
        height:'1000px',
        textAlign: 'left',
      }; 
    return (
        <div>
          <section>
            <div>
              <Card title="LIST GAMES">
                <div>
                    {daftarGames !== null && daftarGames.map((item,index)=>{
                        return(   
                            <div className="container">
                                <Card.Grid style={gridStyle}>
                                <Card>
                                    <h3>{item.name}</h3>
                                </Card>
                                <Card
                                    cover={<img alt="" src={item.image_url} width="100px"/>
                                        }>
                                    <h5><strong>Genre: </strong>{item.genre}</h5>
                                    <h5><strong>Singgleplayer: </strong>{item.singlePlayer}</h5>
                                    <h5><strong>Multiplayer: </strong>{item.multiplayer}</h5>
                                    <h5><strong>Platform: </strong>{item.platform}</h5>
                                    <h5><strong>Release: </strong>{item.release}</h5>
                                    <Meta
                                    />
                                </Card>
                                </Card.Grid>
                            </div>
                        );
                      })
                    }
                </div>
              </Card>
            </div>    
          </section>
          <footer>
            <div class="foot">
                <h5>copyright &copy; 2020 by Sanbercode</h5>
            </div>
          </footer>
        </div>
      );
    }
  
export default ListGames