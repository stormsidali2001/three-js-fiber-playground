import { useEffect } from "react"
import useStore from "./useStore"

const usePeriodicSave = (duration:number = 5000) => {
     const [saveWorld,loadWorld] = useStore(state=>[state.saveWorld,state.loadWorld])
 useEffect(()=>{
    // loadWorld()
    const intervalId = setInterval(()=>{
        saveWorld()
    },duration)


    return ()=>{
        clearInterval(intervalId)
    }
 },[])
}

export default usePeriodicSave