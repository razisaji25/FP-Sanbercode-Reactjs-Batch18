import React,{useContext} from 'react'
import { UserContext } from './UserContext';

const Logout = () => {
    const [user] = useContext(UserContext)
    return(
        <div>
            {user!==null &&
            <div>
                {localStorage.clear()}
            <h1>Logout:Silahkan Restart{<br/>}(CTRL+R)</h1>
            </div>
            }
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
            <br/><br/><br/><br/>
        </div>
        
    )
}
export default Logout