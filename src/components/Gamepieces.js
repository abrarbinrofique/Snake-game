import { useEffect, useRef} from "react"
import {useState} from 'react';

const Gamepieces = ({score,setScore,onGaOver}) => {
    const canvasRef = useRef();
    const snake_speed = 10;
    const [apple, setApple] = useState({ x: 180, y: 100 })
    const [snake, setSnake] = useState([{ x: 100, y: 50 }])
    const [direction, setDirection] = useState(null)

    useEffect(()=>{
        const canvas=canvasRef.current
        console.log(canvasRef.current)
        const ctx=canvas.getContext("2d")

        const drawsnake=()=>{
            snake.forEach((snakepath)=>{
                ctx.beginPath()
                ctx.rect(snakepath.x,snakepath.y,24,24)
                ctx.fillStyle="#008080"
                ctx.fill()
                ctx.closePath()

            })
        }

        const drawapple = () => {
            ctx.beginPath();
            ctx.rect(apple.x,apple.y,24,24)
            ctx.fillStyle = "#DC143C";
            ctx.fill();
            ctx.closePath();
        };





        const moveSnake=()=>{
            if(direction)
            {
                setSnake((prevSnake)=>{
                    const newsnake=[...prevSnake]
                    const snakehead={x:newsnake[0].x,y:newsnake[0].y};

                    for(let i=newsnake.length-1;i>0;i--)
                    {
                        newsnake[i].x=newsnake[i-1].x
                        newsnake[i].y=newsnake[i-1].y
                    }

                    switch(direction)
                    {
                        case "right":
                        snakehead.x+=snake_speed
                        break;
                        case "left":
                            snakehead.x-=snake_speed
                        break
                        case "up":
                            snakehead.y-=snake_speed
                        break
                        case "down":
                            snakehead.y+=snake_speed
                        break

                    }
                    newsnake[0]=snakehead;
                    handleapplecollision(newsnake)
                   

                    return newsnake
                })
            }
        }


        const handleapplecollision=(newsnake)=>{

            const snakehead =newsnake[0]

            if(snakehead.x===apple.x && snakehead.y===apple.y)
            {
                setScore(score++)

                setApple({
                    x:Math.floor((Math.random()*canvas.width/snake_speed)*snake_speed),
                    y:Math.floor((Math.random()*canvas.width/snake_speed)*snake_speed)
                })

                newsnake.push({
                    x:newsnake[newsnake.length-1].x,
                    y:newsnake[newsnake.length-1].y
                })
            }

            
        }
        
        const handlekeypress=(e)=>{
            switch(e.key)
            {
                case "ArrowRight":
                {
                    setDirection("right")
                    break;
                }
                case "ArrowLeft":
                {
                    setDirection("left")

                     break;
                }
                case "ArrowUp":
                {
                    setDirection("up")
                     break;
                }
                case "ArrowDown":
                {
                    setDirection("down")
                     break;
                }
                default:
                    break;
            }

        }

        window.addEventListener("keydown",handlekeypress)




        const interval=setInterval(()=>{
            ctx.clearRect(0,0,canvas.width,canvas.height)
            drawsnake()
            drawapple()
            moveSnake()
        },100)


        return()=>{
            clearInterval(interval)
        }
      

    },[snake,direction])

    return (
        <div>
            <canvas className="gamecanvas" ref={canvasRef} width={750} height={500}>

            </canvas>

        </div>


    )

}
export default Gamepieces