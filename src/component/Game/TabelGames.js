import React, {useState, useEffect,useContext} from "react"
import axios from "axios"
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from "../utilitas/UserContext"

const TabelGames = () => {
  const [user] = useContext(UserContext)
  const [Games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    release: "",
    image_url:""

  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")


  useEffect( () => {
    if (Games === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            singlePlayer: el.year,
            multiplayer: el.multiplayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [Games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
        break
      }
      case "singleplayer":
      {
        setInput({...input, singlePlayer: event.target.value});
          break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "platform":
        {
          setInput({...input, platform: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let nama = input.name
    console.log(input)

    if (nama.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/data-game`,{name: input.name}, {headers: {"Authorization" : `Bearer ${user.token}`}}, {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release 
        })
        .then(res => {
            setGames([...Games, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://www.backendexample.sanbersy.com/api/data-game/${selectedId}`,{name: input.name}, {headers: {"Authorization" : `Bearer ${user.token}`}}, {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,
          release: input.release
        })
        .then(res => {
            let singleGames = Games.find(el=> el.id === selectedId)
            singleGames.name = input.name
            singleGames.genre = input.genre
            singleGames.singlePlayer = input.singlePlayer
            singleGames.multiplayer = input.multiplayer
            singleGames.platform = input.platform
            singleGames.release = input.release
            setGames([...Games])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        genre: "",
        singlePlayer: 0,
        multiplayer: 0,
        platform: "",
        release: "",
        image_url: ""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = Games.filter(el => el.id !== itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/data-game/${itemId}`,{name: input.name}, {headers: {"Authorization" : `Bearer ${user.token}`}})
      .then(res => {
        console.log(res)
      })
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGames = Games.find(x=> x.id === itemId)
      setInput({
        name: singleGames.name,
        genre: singleGames.genre,
        singlePlayer: singleGames.singlePlayer,
        multiplayer: singleGames.multiplayer,
        platform: singleGames.platform,
        release: singleGames.release,
        image_url: singleGames.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://www.backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
        id: el.id, 
        name: el.name, 
        genre: el.genre,
        singlePlayer: el.year,
        multiplayer: el.multiplayer,
        platform: el.platform,
        release: el.release,
        image_url: el.image_url
        }
      })

      let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setGames([...filteredGames])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <h1>Daftar Game</h1>
      <div>
        <form onSubmit={submitSearch}>
            <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search title</button>
        </form>
      </div>
        <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Genre</th>
            <th>Single Player</th>
            <th>Multiplayer</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              Games !== null && Games.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td name={item.name}>{truncateString(item.name, 20)}</td>
                    <td>{item.genre}</td>
                    <td>{item.singlePlayer}</td>
                    <td>{item.multiplayer}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>
                    <td>
                      {statusForm==="edit" ?       
                      <h6>Form Edit Di Bawah</h6>
                      :
                      <Action itemId={item.id}/>
                      }
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </Table>
      {/* Form */}
    {statusForm==="edit" &&  
    <div style={{width: "50%", margin: "0 auto", display: "block"}}>
    <div style={{border: "1px solid #aaa", padding: "20px"}}>
      <h1>GAMES FORM</h1><br/>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <textarea style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Single Player:
          </label>
          <input style={{float: "right"}} type="number" max={1} min={0}  name="singleplayer" value={input.singlePlayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Multiplayer:
          </label>
          <input style={{float: "right"}} type="number" max={1} min={0} name="multiplayer" value={input.multiplayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Release:
          </label>
          <input style={{float: "right"}} type="text" name="release" value={input.release} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="40" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button>submit</button>
      </form>
      </div>
      </div>
    }
    </>
  )
}


export default TabelGames
