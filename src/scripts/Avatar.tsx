import React, { useState } from 'react';
import Axios from 'axios';
import '../styles/Avatar.css';

const Avatar = () => {
    const [sprite, setSprite] = useState("bottts");
    const [seed, setSeed] = useState(1000);
    function handleSprite(spritetype) {
        setSprite(spritetype);
    }
    function handleGenerate() {
        let x = Math.floor(Math.random() * 1000);
        setSeed(x);
    }
    function downloadImage() {
        Axios({
            method: "get",
            url: `https://avatars.dicebear.com/api/${sprite}/${seed}.svg`,
            responseType: "arraybuffer"
        })
        .then((response) => {
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(
                new Blob([response.data], 
                { type: "application/octet-stream" })
            );
            link.download = `${seed}.svg`;
            document.body.appendChild(link);
            link.click();
            setTimeout(function () {
                window.URL.revokeObjectURL(link);
            }, 200);
        })
        .catch((error) => { });
    }
    return (
        <div className="container">
            <div className="nav">
                <p>Random Avatar Generator</p>
            </div>
            <div className="home">
                <div className="btns">
                    <button onClick={() => { 
                        handleSprite("avataaars") }}>Human</button>
                    <button onClick={() => { 
                        handleSprite("human") }}>Pixel</button>
                    <button onClick={() => { 
                        handleSprite("bottts") }}>Bots</button>
                    <button onClick={() => { 
                        handleSprite("jdenticon") }}>Vector</button>
                    <button onClick={() => { 
                        handleSprite("identicon") }}>Identi</button>
                    <button onClick={() => { 
                        handleSprite("gridy") }}>Alien</button>
                    <button onClick={() => { 
                        handleSprite("micah") }}>Avatars</button>
                </div>
                <div className="avatar">
                    <img src= {`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`} alt="Sprite" />
                </div>
                <div className="generate">
                    <button id="gen" onClick={() => { 
                        handleGenerate() }}>Next</button>
                    <button id="down" onClick={() => { 
                        downloadImage() }}>Download</button>
                </div>
            </div>
        </div>
    )
}
export default Avatar;