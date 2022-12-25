import {usePlane} from '@react-three/cannon'
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {RepeatWrapping,NearestFilter} from 'three'
import { grass } from '../images'
import useStore from './hooks/useStore'
const Ground = () => {

    const [ref] = usePlane(()=>({
        rotation:[-Math.PI/2,0,0],
        position:[0,0.5,0]
    }))
    const [addCube] = useStore((state)=>[state.addCube])
    const glassImgTexture = useLoader(TextureLoader, grass)

    glassImgTexture.magFilter = NearestFilter
    glassImgTexture.wrapS = RepeatWrapping
    glassImgTexture.wrapT = RepeatWrapping
    glassImgTexture.repeat.set(100,100)

    const handleGroundClick = (e:any)=>{
      e.stopPropagation()
      const [x,y,z] = Object.values(e.point).map((v)=>Math.ceil(v as number))
      addCube(x,y,z)
    }
  return (
    //@ts-ignore
    <mesh ref={ref} onClick={handleGroundClick}>
        <planeBufferGeometry attach="geometry" args={[100,100]}/>
        <meshStandardMaterial attach="material" map={glassImgTexture}/>
    </mesh>
  )
}

export default Ground