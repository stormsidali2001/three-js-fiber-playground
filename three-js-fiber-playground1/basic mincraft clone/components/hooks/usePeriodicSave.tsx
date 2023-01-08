import { useEffect } from "react"
import useStore from "./useStore"

const usePeriodicSave = (duration:number = 5000) => {
     const [saveWorld,loadWorld] = useStore(state=>[state.saveWorld,state.loadWorld])
 useEffect(()=>{
<<<<<<< HEAD
    // loadWorld()
=======
    loadWorld()
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
    const intervalId = setInterval(()=>{
        saveWorld()
    },duration)


    return ()=>{
        clearInterval(intervalId)
    }
 },[])
}

<<<<<<< HEAD
export default usePeriodicSave
=======
export default usePeriodicSave
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
