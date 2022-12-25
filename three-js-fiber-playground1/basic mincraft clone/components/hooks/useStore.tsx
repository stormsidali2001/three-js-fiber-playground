import { Triplet } from '@react-three/cannon';
import create from 'zustand'
interface Cube{
    id:number;
    position:Triplet;
    texture:TextureTypes;
}
export type TextureTypes =  "dirt" |"grass" | "glass" | "log" | "wood" 
interface State{
    texture:TextureTypes;
    cubes:Cube[];
    addCube:(x:number,y:number,z:number)=>void;
    removeCube:(x:number,y:number,z:number)=>void;
    setTexture:(t:TextureTypes)=>void;
}
const useStore = create<State>((set) => ({
        texture:"glass",
        cubes:[
            {
                id:1,
                position:[1,1,1],
                texture:"glass"
            }
        ],
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
        saveWorld:()=>{},
        resetWorld:()=>{},

}))

export default useStore