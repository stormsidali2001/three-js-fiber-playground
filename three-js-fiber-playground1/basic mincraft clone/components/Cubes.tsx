import Cube from "./Cube"
import useStore, { TextureTypes } from "./hooks/useStore"

const Cubes = () => {
    const [cubes] = useStore((state)=>[state.cubes])
    return <>
                {
                    cubes.map((cube)=>{
                    return <Cube key = {cube.id} position={cube.position} texture={cube.texture} />
                })
                }
    </>
}

export default Cubes