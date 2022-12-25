import { useCallback, useEffect, useState } from "react"


type Keys = "KeyW"  | "KeyS"  | "KeyA"  | "KeyD"  | "Space"  | "Digit1" | "Digit2" | "Digit3" | "Digit4" | "Digit5" 

function actionByKey(key:Keys){
    const map =  {
        KeyW:"forward",
        KeyS:"backward",
        KeyA:"left",
        KeyD:"right",
        Space:"jump",
        Digit1:"dirt",
        Digit2:"glass",
        Digit3:"grass",
        Digit4:"log",
        Digit5:"wood",
    }
    return map[key];
}
export const useKeyboard = ()=>{
    const [actions,setActions] = useState({
        forward:false,
        backward:false,
        left:false,
        right:false,
        jump:false,
        grass:false,
        glass:false,
        wood:false,
        log:false,
        dirt:false,

    })
    
    const handleKeyDown = useCallback((e:any)=>{
        console.log("action: ",e.code)
        const action = actionByKey(e.code)
        if(action){
            setActions((prev)=>({
                ...prev,
                [action]:true
            }))
        }
    },[])
    const handleKeyUp = useCallback((e:any)=>{
        const action = actionByKey(e.code)
        if(action){
            setActions((prev)=>({
                ...prev,
                [action]:false
            }))
        }
    },[])
    useEffect(()=>{
        document.addEventListener("keydown",handleKeyDown)
        document.addEventListener("keyup",handleKeyUp)
        
        return ()=>{
            document.removeEventListener("keydown",handleKeyDown)
            document.removeEventListener("keyup",handleKeyUp)

        }
    },[handleKeyDown,handleKeyUp])

    return actions;
}