import {useThree,useFrame} from '@react-three/fiber'
import {useSphere} from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import {Vector3} from 'three'
const Player = () => {
    const {camera} = useThree()
    const [ref,api] = useSphere(()=>({
        mass:1,
        type:"Dynamic",
        position:[0,0,10]
    }))

    const position = useRef([0,0,0])
    const velocity = useRef([0,0,0])
    useEffect(()=>{
        //the postion variable gets the value of the physical sphere
        api.position.subscribe((p)=>{
            position.current = p
        })
    },[api.position])

    useEffect(()=>{
        //the postion variable gets the value of the physical sphere
        api.velocity.subscribe((p)=>{
            velocity.current = p
        })
    },[api.position])

    useFrame(()=>{
        //camera follows the position variable -> the physical sphere
        camera.position.copy(new Vector3(position.current[0],position.current[1],position.current[2]))
    })

    
  return (
    //@ts-ignore
    <mesh ref={ref}>

    </mesh>
  )
}

export default Player