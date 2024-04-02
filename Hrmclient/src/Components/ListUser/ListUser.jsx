import React, { useState,useEffect } from "react";
import { BrowserRouter as Router, Route,Routes,Link,useParams} from 'react-router-dom';
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import './ListUser.css';

function ListUser(){
    const[data,setData]=useState([]);
    const [token,setToken]=useState('');
    const [loading,setLoading] = useState(true);
    const [currentpage,setCurrentpage] = useState(1);
    const [itemsperpage] = useState(5)
    const [totalpage,setTotalpage]= useState(1)
    const [searchQuery,setSearchQuery]=useState('')


    useEffect(()=>{
       const storedToken = localStorage.getItem('token')

        if(storedToken){
          setToken(storedToken)
        }  
        console.log(token);
    },[]);

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await axios.get(`http://localhost:3100/getuser`,{

                params :{
                    page : currentpage,
                    limit :itemsperpage,
                    searchQuery : searchQuery
                },
                    headers :{
                        'Authorization':`Bearer ${token}`,
                    },
                })
                setData(response.data.data)
                setTotalpage(response.data.totalpage);
                setLoading(false);
            } catch (error) {
                console.error("Error in fething Data",error) 
            }
        };
        if(token){
        fetchData();
        }
    },[token,currentpage,itemsperpage,searchQuery]);
    const handleViewUser = (userId) =>{
        if(userId  !== undefined){
            console.log("view button clicked for user Id",userId);
        }else{
            console.error('user id is undefined')
        }
    };
    const nextpage= ()=>{
        if(currentpage < totalpage){
            setCurrentpage(currentpage+1)
        }
    };
    const previouspage = () =>{
        if(currentpage>1){
            setCurrentpage(currentpage-1)
        }
    };
    const handleSearch = (e) =>{
        const searchKeyword =e.target.value;
        setSearchQuery(searchKeyword)
        setCurrentpage(1)
    };
    // const filteredData = data.filter(user => {
    //     return user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ;
    // });
    return(
        <>
        <div className="heading">
            <h1>Users List</h1>
        </div>
        <div className="search-container">
                <input
                    className="searcbox"
                    type="text"
                    placeholder="Search by name,email"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
        { loading ? (
            <Spinner/>
        ):(
        data.length ?(
            data.map((user)=>(
            <div className="box" key={user._id}>
                <p><strong>Name :</strong>{user.name}</p>
                <p><strong>Email:</strong>{user.email}</p>
                <p><strong>Phone no :</strong>:{user.phone_no}</p>
                <div>
                    <Link to={`/userDetails/${user._id}`}> 
                    <button onClick={()=>handleViewUser(user._id)}>View</button>
                    </Link>
                </div>
            </div>
        ))
        ):(
            <h1>No data available</h1>
        )
        )}
        <div className="pageination">
            <button onClick={previouspage} disabled={currentpage === 1} className="nextbtn">Previous</button>
            <span>{currentpage} of {totalpage}</span>
            <button onClick={nextpage} disabled={currentpage === totalpage} className="nextbtn">Next</button>
        </div>
        </>
    );
}
export default ListUser