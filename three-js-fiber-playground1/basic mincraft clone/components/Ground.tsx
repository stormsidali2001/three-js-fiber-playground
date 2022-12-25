import {usePlane} from '@react-three/cannon'
import {  useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import {RepeatWrapping,NearestFilter} from 'three'
import { grassImg } from '../images'
const Ground = () => {

    const [ref] = usePlane(()=>({
        rotation:[-Math.PI/4,0,0],
        position:[0,0,0]
    }))
    const glassImgTexture = useLoader(TextureLoader, grassImg)

    glassImgTexture.magFilter = NearestFilter
    glassImgTexture.wrapS = RepeatWrapping
    glassImgTexture.wrapT = RepeatWrapping
    glassImgTexture.repeat.set(100,100)
  return (
    //@ts-ignore
    <mesh ref={ref}>
        <planeBufferGeometry attach="geometry" args={[100,100]}/>
        <meshStandardMaterial attach="material" map={glassImgTexture}/>
    </mesh>
  )
}

export default Ground