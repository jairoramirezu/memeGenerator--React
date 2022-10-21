import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
const API = 'https://api.imgflip.com/get_memes';

export default function Hero() {

  const [memes, setMemes] = useState({
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => setAllMemes(data))
  }, [])

  const [allMemes, setAllMemes] = useState([]);

  function getMemeImage() {
    const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length)
    const url = memesArray[randomNumber].url;
    setMemes(prev => ({
      ...prev,
      randomImage: url
    }))
  }

  function handleChange(event) {
    const {name, value} = event.target
    setMemes(prevMemes => {
      return {
        ...prevMemes,
        [name]: value
      }
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="hero-Main_Div">
      <div className="hero-Second_Div">
        <input
        type="text"
        placeholder="Top text"
        onChange={handleChange}
        name="topText"
        value={memes.topText}
        className="hero-First_Input" />
        <input
        type="text"
        placeholder="Bottom text"
        onChange={handleChange}
        name="bottomText"
        value={memes.bottomText}
        className="hero-First_Input"/>
      </div>
      <button className="hero-Main_Button" onClick={getMemeImage}><h3>Get a new image 🖼</h3></button>
      <div className="divOfImage">
        <img className="hero-Main_Image" src={memes.randomImage}/>
        <h2 className="memeText TOP">{memes.topText}</h2>
        <h2 className="memeText BOTTOM">{memes.bottomText}</h2>
      </div>
    </form>
  )
}

