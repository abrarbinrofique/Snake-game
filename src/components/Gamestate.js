import {useEffect, useState} from 'react';
import Gamepieces from './Gamepieces';

const Gamestate=()=>{
    const [score, setScore] = useState(0)
    const [highscore, setHighscore] = useState(parseInt(localStorage.getItem('highscore'))||0)
    const [gameOver,setgameOver]=useState(false)
    const[collision,setCollisionType]=useState("")

    const handleGameover=(type)=>{
        setgameOver(true);
        if(score>highscore)
        {
            setHighscore(score)
            localStorage.setItem("highscore",score.toExponential.toString())
        }
        setCollisionType(type)

    }
    const handleResetgame=()=>{
        setScore(0)
        setgameOver(false)
    }

    useEffect(()=>{
        const handlekeypress=(e)=>{
            handleResetgame()
        }
    })

    return(

      <div>
        <p>score:{score}</p>
        <p>High Score:{highscore}</p>
        {
            gameOver &&(
                <div>
                    <h4>Game Over!{collision==="wall"?"you hit the wall":"you bite yourself"}</h4>
                    <h6>
                        please press enter to reset the game
                    </h6>


                </div>
            )
        }
        {
            !gameOver &&(
                <Gamepieces
                score={score}
                setScore={setScore}
                onGaOver={(type)=>{
                    handleGameover(type)
                }}
                
                />
            )
        }
      </div>

    )
}

export default Gamestate