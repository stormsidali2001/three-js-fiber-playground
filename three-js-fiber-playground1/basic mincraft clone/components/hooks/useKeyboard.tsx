import { useCallback, useEffect, useState } from "react"


type Keys = "KeyW"  | "KeyS"  | "KeyA"  | "KeyD"  | "Space"  | "Digit1" | "Digit2" | "Digit3" | "Digit4" | "Digit5" 
function actionByKey(key:Keys){
    const map =  {
        KeyW:"forward",
        KeyS:"backward",
        KeyA:"left",
        KeyD:"right",
        Space:"jump",
        Digit1:"texture1",
        Digit2:"texture2",
        Digit3:"texture3",
        Digit4:"texture4",
        Digit5:"texture5",
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
        texture1:false,
        texture2:false,
        texture3:false,
        texture4:false,
        texture5:false,

    })
    const handleKeyDown = useCallback((e:any)=>{
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