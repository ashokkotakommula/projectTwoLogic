import {useState, useEffect} from 'react'
import './App.css';
function Main() {
    const [cards, setCards] = useState([])

    const loadCard = () => {
        fetch('http://localhost:8000/api/allcards')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setCards(data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        loadCard()
    }, [])

    return(
        <div>
            <h1>OUR SERVICES</h1>
            <div className="yellow-main"></div>
            {
                cards.map((card) => (
                    <div key={card._id} className="card-container">
                        <div className="card">
                            <img src={card.image.url} alt=""/>
                            <h3>{card.head}</h3>
                            <div className="yellow"></div>
                            <p>{card.content}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Main;