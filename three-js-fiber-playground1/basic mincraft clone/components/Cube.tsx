import { Triplet, useBox } from "@react-three/cannon"
import { useLoader } from "@react-three/fiber";
import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import * as textureImg from "../images";

interface CubeProps{
    position:Triplet;   
    texture: "dirt" |"glass" | "glass" | "log" | "wood"; 
}
const Cube = ({position,texture}:CubeProps) => {

    const [ref] = useBox(()=>({
        type:"Static",
        position
    }))
    const loadedTexture = useLoader(TextureLoader, textureImg[texture])

    loadedTexture.magFilter = NearestFilter
    loadedTexture.wrapS = RepeatWrapping
    loadedTexture.wrapT = RepeatWrapping
    //@ts-ignore
  return <mesh ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial attach="material" color="red" map ={loadedTexture}/>
        </mesh>
}

export default Cube