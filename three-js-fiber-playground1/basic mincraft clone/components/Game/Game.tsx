import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Ground from '../Ground'
import styles from './Game.module.css'
import Player from '../Player'
import FPV from '../../FPV'

const Game = () => {
  return (
    <div className={styles.container}>
        <Canvas>
            <Sky sunPosition={[100,100,20]}/>
            <ambientLight intensity={0.5}/>
            <FPV/>
            <Physics>
                <Ground/>
                <Player/>
            </Physics>
        </Canvas>
    </div>
  )
}

export default Game