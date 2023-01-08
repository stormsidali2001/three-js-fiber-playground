import { PublicApi, Triplet } from '@react-three/cannon';
import create from 'zustand'
interface Cube{
    id:number;
    position:Triplet;
    texture:TextureTypes;
}
<<<<<<< HEAD
interface Ground{

   cubes:Cube[];
}
interface Player{
    position:Triplet;
    velocity:Triplet;
    api:PublicApi | null;
=======
interface Player{
    position:Triplet;
    velocity:Triplet;
    api:PublicApi | null
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
}
export type TextureTypes =  "dirt" |"grass" | "glass" | "log" | "wood" 
interface State{
    texture:TextureTypes;
    cubes:Cube[];
    player:Player;
<<<<<<< HEAD
    ground:Ground;
=======
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
    addCube:(x:number,y:number,z:number)=>void;
    removeCube:(x:number,y:number,z:number)=>void;
    setTexture:(t:TextureTypes)=>void;
    updatePlayerPos:(t:Triplet)=>void;
    updatePlayerVel:(t:Triplet)=>void;
    setApi:(api:PublicApi)=>void;
    saveWorld:()=>void;
    loadWorld:()=>void;
}

<<<<<<< HEAD
const generateGround = ()=>{
    const cubes:Cube[] = [];

    for(let x = -10 ;x<10;x++){

        for(let y = -10 ;y<10;y++){
            cubes.push({
                id:Date.now()+x+y,
                position:[x,0,y],
                texture:"grass"
            })
        }
    }
    return cubes;
}
const useStore = create<State>((set,get) => ({
        texture:"glass",
        player:{
            position:[0,5,0],
=======
const useStore = create<State>((set,get) => ({
        texture:"glass",
        player:{
            position:[0,0,0],
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
            velocity:[0,0,0],
            api:null
        },
        cubes:[
            {
                id:1,
                position:[0,1,0],
                texture:"glass"
            }
        ],
<<<<<<< HEAD
        ground:{
            cubes:generateGround()
        },
=======
>>>>>>> 24c566799e465c751e4f6ed5e7ee9e9cd59fb7b2
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
        saveWorld:()=>{
            const state = get()
            const world =  JSON.stringify({player:state.player,cubes:state.cubes})
            localStorage.setItem("mincraft:world",world)

        },
        loadWorld:()=>{
            const worldStr = localStorage.getItem("mincraft:world")
            const world = worldStr!= null ?JSON.parse(worldStr):null
            if(!world) return
           
            world.player.api = null
           
            set(()=>({
                player:world.player,
                cubes:world.cubes
            }))
        },
        resetWorld:()=>{

        },

}))

export default useStore
