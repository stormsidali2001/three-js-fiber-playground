import {useThree,useFrame} from '@react-three/fiber'
import {useSphere} from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import {Vector3} from 'three'
import { useKeyboard } from './hooks/useKeyboard'
const JUMP_FORCE = 4
const SPEED = 4
const Player = () => {
    const {camera} = useThree()
    const [ref,api] = useSphere(()=>({
        mass:1,
        type:"Dynamic",
        position:[0,0,1]
    }))

    const actions = useKeyboard()

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

        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            (actions.backward ? 1:0)- (actions.forward?1:0) 
        )
        const sideVector = new Vector3(
              (actions.right ? 1 : 0)-(actions.left ?1:0),
              0,
              0
        )

        direction.addVectors(frontVector,sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation)

        api.velocity.set(direction.x,velocity.current[1],direction.z)
        if(actions.jump  && Math.abs(velocity.current[1]) < 0.05){
            api.velocity.set(velocity.current[0],JUMP_FORCE,velocity.current[2])
        }
    })

    
  return (
    //@ts-ignore
    <mesh ref={ref}>

    </mesh>
  )
}

export default Player