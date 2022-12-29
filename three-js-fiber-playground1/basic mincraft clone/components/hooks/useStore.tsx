import { PublicApi, Triplet } from '@react-three/cannon';
import create from 'zustand'
interface Cube{
    id:number;
    position:Triplet;
    texture:TextureTypes;
}
interface Player{
    position:Triplet;
    velocity:Triplet;
    api:PublicApi | null
}
export type TextureTypes =  "dirt" |"grass" | "glass" | "log" | "wood" 
interface State{
    texture:TextureTypes;
    cubes:Cube[];
    player:Player;
    addCube:(x:number,y:number,z:number)=>void;
    removeCube:(x:number,y:number,z:number)=>void;
    setTexture:(t:TextureTypes)=>void;
    updatePlayerPos:(t:Triplet)=>void;
    updatePlayerVel:(t:Triplet)=>void;
    setApi:(api:PublicApi)=>void;
}
const useStore = create<State>((set) => ({
        texture:"glass",
        player:{
            position:[0,0,0],
            velocity:[0,0,0],
            api:null
        },
        cubes:[
            {
                id:1,
                position:[1,1,1],
                texture:"glass"
            }
        ],
        setApi:(api:PublicApi)=>{
            set((prev)=>({
                player:{
                    ...prev.player,
                    api:api
                }
            }))
        },
        addCube:(x:number,y:number,z:number)=>{
            set((prev)=>({
               
                cubes:[
                    ...prev.cubes,
                    {
                        id: Date.now(),
                        position:[x,y,z],
                        texture:prev.texture
                    }
                ]
            }))
        },
        removeCube:(x:number,y:number,z:number)=>{
            set((prev)=>({
                cubes:prev.cubes.filter(cube=>{
                    const [x1,y1,z1] = cube.position;
                    return x !== x1 || y!== y1 || z!== z1
                })
            }))
        },
        setTexture:(texture:TextureTypes)=>{
            set((prev)=>({
                texture
            }))
        },
        updatePlayerPos:(t:Triplet)=>{
            set((prev)=>({
                player:{
                    ...prev.player,
                    position:t

                }
            }))
        },
        updatePlayerVel:(t:Triplet)=>{
            set((prev)=>({
                player:{
                    ...prev.player,
                    velocity:t
                }
            }))
        },
        saveWorld:()=>{},
        resetWorld:()=>{},

}))

export default useStore
