import React  , { useState} from 'react'
import data from "../dataavail/sports"
// import data from ".../webscrappig/sports1"
import Notes from "../components/notesmaking"
import Tours from "../components/Tours"
import Heading from '../components/Heading'
import "./hero.css"



const Signup = () => {

  const [tours , setTours] = useState(data);
  return (
    <div className='App'>
     {/* <Notes></Notes> */}
     <Heading></Heading>
     <Tours tours = {tours} ></Tours>
    </div>
  )
}

export default Signup
