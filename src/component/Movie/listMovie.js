import axios from 'axios';
import React,{useState,useEffect} from 'react';
import '../../style/listGames.css';
import { Card } from 'antd';


const { Meta } = Card;
const ListMovie = () => {  
    const [daftarMovie, setDaftarMovie] =  useState(null);
    
      //untuk menjadikan saling terhubung

    useEffect(()=>{
      if (daftarMovie=== null){
        axios.get("https://backendexample.sanbersy.com/api/data-movie")
        .then(res => setDaftarMovie(res.data.map(el =>{ 
          return{
            id: el.id,
            title:el.title,
            description: el.description,
            year: el.year,  
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            review: el.review,
            image_url: el.image_url
          }
        })))
      }
    },[daftarMovie])
    
    const gridStyle = {
        width: '49%',
        height:'1300px',
        textAlign: 'left',
      };
      const font = {
        size:'200',
      }; 
    return (
        <div>
          <section>
            <div>
              <Card title="LIST MOVIE" style={font}>
                <div>
                    {daftarMovie !== null && daftarMovie.map((item,index)=>{
                        return(   
                            <div className="container">
                                <Card.Grid style={gridStyle}>
                                <Card>
                                    <h2>{item.title}</h2>
                                </Card>
                                <Card
                                    cover={<img alt="" src={item.image_url} width="100px"/>
                                        }>
                                    <h5><strong>Year: </strong>{item.year}</h5>
                                    <h5><strong>Duration: </strong>{item.duration}</h5>
                                    <h5><strong>Genre: </strong>{item.genre}</h5>
                                    <h5><strong>Rating: </strong>{item.rating}</h5>
                                    <h5><strong>Description: </strong>{item.description}</h5>
                                    <h5><strong>Review: </strong>{item.review}</h5>
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
  
export default ListMovie