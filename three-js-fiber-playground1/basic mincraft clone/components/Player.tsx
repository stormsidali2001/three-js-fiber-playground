import {useThree,useFrame} from '@react-three/fiber'
import {useSphere} from '@react-three/cannon'
import { useEffect, useRef } from 'react'
import {Vector3} from 'three'
import { useKeyboard } from './hooks/useKeyboard'
import useStore from './hooks/useStore'
const JUMP_FORCE = 4
const SPEED = 4
const Player = () => {
    const worldStr = localStorage.getItem("world")
    const world = worldStr!= null ?JSON.parse(worldStr):null
    const {camera} = useThree()
    const [ref,api] = useSphere(()=>({
        mass:1,
        type:"Dynamic",
        position:
        // world ?world.player.position:
        [0,5,2],
        velocity:
        // world ?world.player.velocity:
        [0,0,0],
    }),world)

    const actions = useKeyboard()

    const [updatePlayerPos,updatePlayerVel,position,velocity,setApi,storApi] = useStore(state=>[state.updatePlayerPos,state.updatePlayerVel,state.player.position,state.player.velocity,state.setApi,state.player.api])
    useEffect(()=>{

        setApi(api)
    },[api])

    useEffect(()=>{
        //the postion variable gets the value of the physical sphere
        api?.position.subscribe((p)=>{

            updatePlayerPos(p)
        })
    },[api?.position])

    useEffect(()=>{
        //the postion variable gets the value of the physical sphere
        api.velocity.subscribe((p)=>{
            updatePlayerVel(p)
        })
    },[api?.velocity])

    useFrame(()=>{
        //camera follows the position variable -> the physical sphere
        camera.position.copy(new Vector3(position[0],position[1],position[2]))

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

        api.velocity.set(direction.x,velocity[1],direction.z)
        if(actions.jump  && Math.abs(velocity[1]) < 0.05){
            api.velocity.set(velocity[0],JUMP_FORCE,velocity[2])
        }
    })


  return (
    //@ts-ignore
    <mesh ref={ref}>

    </mesh>
  )
}

export default Player