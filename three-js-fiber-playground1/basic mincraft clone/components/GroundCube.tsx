import { Triplet, useBox } from "@react-three/cannon"
import useStore, { TextureTypes } from "./hooks/useStore";
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
    const [addCube]  = useStore(state=>[state.addCube])

  
    const handleGroundClick = (e:any)=>{
        e.stopPropagation()
        const [x,y,z] = Object.values(e.point).map((v)=>Math.ceil(v as number))
        addCube(x,y,z)
      }
    const selectedTexture = cubesTextures?.find(t=>t.name === texture) ?? null
    return (
        //@ts-ignore
        <mesh ref={ref} onClick={handleGroundClick} >
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial attach="material"  map ={selectedTexture?.texture ?? null}/>
        </mesh>
    )
}

export default GroundCube