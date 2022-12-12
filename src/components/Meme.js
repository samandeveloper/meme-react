import React from "react"
// import memesData from "../memesData.js"
export default function Meme() {
    //state is for the information that we want to update in the browser
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })

    //the state below is the the object of all information from API
    // const [allMemes, setAllMemes] = React.useState(memeData)
    const [allMemes, setAllMemes] = React.useState([])  //it's empty at first
    
    //way1: using fetch and then
    // React.useEffect(() =>{
    //     console.log("effect runs")
    //     fetch("https://api.imgflip.com/get_memes")
    //     .then(res => res.json())        //using .json from a server to the web page
    //     .then(data => setAllMemes(data.data.memes))  //we want to just bring the meme array
    // },[])
   

    //way2: using async and await
    React.useEffect(() => {
        async function getMeme(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMeme()  //we MUST call the function in aysnc after we define it

        //we don't have anything to cleanup but if we want to, here is the place
    }, [])

    function getMemeImage() {
        // const memesArray = allMemes.data.memes       //this line is not working with API
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}