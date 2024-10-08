import React from 'react'
import "./Card.css"

const Card = ({id, title, body}) => {
  return (
    <div className="card">
        <p>{id}</p>
        <h1>{title}</h1>
        <p>{body}</p>
    </div>
  )
}

export default Card;
