import React from "react"

export default function Meme() {
    const [meme, setMeme] = React.useState({
        toptext: "",
        bottomtext: "",
        randomImg: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, [])
    console.log(allMemes)
    function addmeme(){
        let x = Math.floor(Math.random() * 100);
        let randomurl = allMemes[x].url
        setMeme( prev => {
            return {
                ...meme,
                randomImg: randomurl
            }
        })
    }
    function handleChange(event){
        const {name, value} = event.target
        setMeme( prev =>{
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <main>
            <div className="form">
                <div className="nav-div">
                    <input 
                    className="form-input"
                    placeholder="Top Text"
                    name="toptext"
                    value={meme.toptext}
                    onChange= {handleChange}
                    />
                    <input className="form-input"
                    placeholder="Bottom Text"
                    name="bottomtext"
                    value={meme.bottomtext}
                    onChange= {handleChange}
                    />
                </div>
                <button className="form-button" onClick={addmeme} >Get a new meme image 🖼</button>
                <div className="meme">
                    <img src={meme.randomImg} className="meme-img" />
                    <h2 className="meme-text top">{meme.toptext}</h2>
                    <h2 className="meme-text bottom">{meme.bottomtext}</h2>
                </div>
            </div>
        </main>
    )
}