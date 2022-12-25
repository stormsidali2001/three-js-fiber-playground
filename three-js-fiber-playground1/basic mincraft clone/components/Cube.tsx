import { Triplet, useBox } from "@react-three/cannon"
import { useLoader } from "@react-three/fiber";
import { useContext } from "react";
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";
import * as textureImg from "../images";
import useStore, { TextureTypes } from "./hooks/useStore";
import { useTextureContext } from "./TextureContext/context";

interface CubeProps{
    position:Triplet;   
    texture: TextureTypes; 
}
const Cube = ({position,texture}:CubeProps) => {

    const [ref] = useBox(()=>({
        type:"Static",
        position
    }))
    const {cubesTextures} = useTextureContext()
    const [addCube,removeCube] = useStore((state)=>[state.addCube,state.removeCube])

    const handleCubeClick = (e:any)=>{
        if(!ref.current ) return;
        e.stopPropagation();
        const clickedSide = Math.floor(e.faceIndex / 2); // cube contain 6 sides but each side contain 2 triangular faces
        const {x,y,z} = ref.current.position

        if(e.altKey){
            removeCube(x,y,z)
            return
        }
        if(clickedSide === 0){
            addCube(x+1,y,z)
        }
        else if(clickedSide === 1){
            addCube(x-1,y,z)
        }
        else if(clickedSide === 2){
            addCube(x,y+1,z)
        }
        else if(clickedSide === 3){
            addCube(x,y-1,z)
        }
        else if(clickedSide === 4){
            addCube(x,y,z+1)
        }
        else if(clickedSide === 5){
            addCube(x-1,y,z-1)
        }

    }


  

    const selectedTexture = cubesTextures?.find(t=>t.name === texture) ?? null

    //@ts-ignore
  return <mesh ref={ref} onClick={handleCubeClick}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial attach="material"  map ={selectedTexture?.texture ?? null}/>
        </mesh>
}

export default Cube