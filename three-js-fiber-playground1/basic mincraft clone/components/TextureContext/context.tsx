import { useLoader } from "@react-three/fiber";
import { createContext, useContext, useState } from "react";
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from "three";
import { dirt ,glass,grass,log,wood} from "../../images";
import { TextureTypes } from "../hooks/useStore";
interface State{
    cubesTextures:{name:TextureTypes , texture:Texture}[]
}
const textureContext = createContext<State>({
    cubesTextures:[]
})

export const useTextureContext = ()=> useContext(textureContext)

function applyFiltersToTexture(t:Texture){
    t.magFilter = NearestFilter
    t.wrapS = RepeatWrapping
    t.wrapT = RepeatWrapping
    return t;
}
export const TextureProvider = ({children}:any)=>{
    const [dirtTexture,glassTexture,woodTexture,grassTexture,logTexture] = useLoader(TextureLoader, [dirt,glass,wood,grass,log])

   

    return <textureContext.Provider 
        value={{cubesTextures:[{name:"dirt",texture:applyFiltersToTexture(dirtTexture)},{name:"glass",texture:applyFiltersToTexture(glassTexture)},{name:"wood",texture:applyFiltersToTexture(woodTexture)},{name:"grass",texture:applyFiltersToTexture(grassTexture)},{texture:applyFiltersToTexture(logTexture),name:"log"}]}}
        >
        {children}
    </textureContext.Provider>
}



