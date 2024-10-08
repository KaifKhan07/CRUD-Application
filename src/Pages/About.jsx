import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"
import Card from "../Components/ApiCard/Card";

const About = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then((res) => setData(res.data))
    .catch((error) => console.log(error))

  },[]);
  
    return(
        <>
          <h1 className="d-flex justify-content-center">Fetching Data from Axios</h1>

          <div className="all-data">
          {
            data.map((post, index) => {
              const {id, title, body} = post;

              return(

                <div className="data" key={index}>

                <Card key={index}
                id={id} 
                title= {title}
                body={body}/>
                </div>
              )
            })
          }
          </div>
          
          
        </>
    )
}

export default About;