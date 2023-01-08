import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import Ground from '../Ground'
import styles from './Game.module.css'
import Player from '../Player'
import FPV from '../../FPV'
import Cubes from '../Cubes'
import TextureSelector from '../TextureSelector/TextureSelector'
import { NearestFilter, RepeatWrapping, Texture, TextureLoader } from 'three'
import {dirt,glass,wood,grass,log} from "../../images"
import { TextureProvider } from '../TextureContext/context'
import usePeriodicSave from '../hooks/usePeriodicSave'
function applyFiltersToTexture(t:Texture){
    // t.magFilter = NearestFilter
    // t.wrapS = RepeatWrapping
    // t.wrapT = RepeatWrapping
    return t;
}
const Game = () => {
  
  usePeriodicSave()
  
  return (
    <div className={styles.container}>
          <Canvas>
            <TextureProvider>
                    <Sky sunPosition={[100,100,20]}/>
                    <ambientLight intensity={0.5}/>
                    <FPV/>
                    <Physics>
                        <Ground/>
                        <Player/>
                        <Cubes />
                    </Physics>
              </TextureProvider>
          </Canvas>
          <div className={styles.gameCursor}>+</div>
          <TextureSelector/>
    </div>
  )
}

export default Game