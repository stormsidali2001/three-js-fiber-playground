import { Triplet, useBox } from "@react-three/cannon"
import { TextureTypes } from "./hooks/useStore";
import { useTextureContext } from "./TextureContext/context";

interface CubeProps{
    position:Triplet;
    texture: TextureTypes; 
}
const GroundCube = ({position,texture}:CubeProps) => {

    const [ref] = useBox(()=>({
        type:"Static",
        position,
    }))
    const {cubesTextures} = useTextureContext()
  

  

    const selectedTexture = cubesTextures?.find(t=>t.name === texture) ?? null
    return (
        //@ts-ignore
        <mesh ref={ref} >
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial attach="material"  map ={selectedTexture?.texture ?? null}/>
        </mesh>
    )
}

export default GroundCube