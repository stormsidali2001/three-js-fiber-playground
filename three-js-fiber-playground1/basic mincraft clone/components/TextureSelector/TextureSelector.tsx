import { useEffect, useState } from 'react'
import { useKeyboard } from '../hooks/useKeyboard'
import useStore, { TextureTypes } from '../hooks/useStore'
import styles from './TextureSelector.module.css'
import * as images from '../../images'

const TextureSelector = () => {
    const [visible,setVisible] = useState(false)
    const [activeTexture,setActiveTexture] = useStore(state=>[state.texture,state.setTexture,])
    const{
        dirt,
        grass,
        glass,
        log,
        wood
    } = useKeyboard()
    const textures = {
        dirt,
        grass,
        glass,
        log,
        wood
    }
    useEffect(()=>{
        const pressedTexture = Object.entries(textures).filter(([k,v])=>v)
        if(pressedTexture.length > 0){
            console.log("texture:",pressedTexture,pressedTexture[0][0],activeTexture)
            setActiveTexture(pressedTexture[0][0]  as TextureTypes) 
        }
    },[  glass,wood,dirt,grass,log,setActiveTexture])
    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setVisible(false)
        },2000)
        setVisible(true)

        return ()=>{
            clearTimeout(timerId)
        }
    },[activeTexture])
  return (
    <>
   { visible && <div className={styles.container}>
        {
            Object.entries(images).map(([k,v],index)=>{
                return (
                    <div key={index} className={`${styles.textureContainer} ${ textures[k as TextureTypes]?styles.active:""}`}>
                        <img src = {v} alt="ss"/>
                        <span className={styles.label}>{k}</span>
                    </div>
                )
            })
        }
    </div> }
    </>
  )
}

export default TextureSelector