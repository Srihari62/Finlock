import React,{useContext,useState,useEffect} from 'react'
import {store} from '../../App';
import { Redirect } from 'react-router';
import Welcome from '../Welcome';
import Footer from '../Footer';
import axios from 'axios';
import './index.css'

const Myprofile = () => {
    const [token,setToken] = useContext(store);
    const [data,setData] = useState(null);

    useEffect(() =>{
        axios.get('http://localhost:5009/myprofile',{
            headers: {
                'x-token' : token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
    },[])

    if(!token){
        return <Redirect to='/login' />
    }
    return (
        <div>
            {
                data &&
            <center>
                <Welcome />
                <br />
                <div>
                <h1 className="title">{data.username.toString().toUpperCase()}</h1>
                    <button className="button" onClick={() => setToken(null)}>Logout</button>
                </div>
                <Footer />
            </center>
        }
        </div>
    )
}

export default Myprofile
