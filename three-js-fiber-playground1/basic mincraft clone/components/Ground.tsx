import {usePlane} from '@react-three/cannon'
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {RepeatWrapping,NearestFilter} from 'three'
import { grass } from '../images'
import useStore, { TextureTypes } from './hooks/useStore'
import { useTextureContext } from './TextureContext/context'
import GroundCube from './GroundCube'
const Ground = () => {


    const [addCube,ground] = useStore((state)=>[state.addCube,state.ground])
   
    const {cubesTextures} = useTextureContext()

   


  
  return (
    <>
      {
        ground.cubes.map((cube)=>{
          return (
            <GroundCube texture='grass' position={cube.position}  />
          )
        })
      }
    </>
 
  )
}

export default Ground