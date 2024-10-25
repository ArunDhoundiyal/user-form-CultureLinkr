import {useContext} from 'react'
import { ToggleContext } from '../ToggleContext';
import { FiMoon } from "react-icons/fi";
import { GoSun } from "react-icons/go";
import './index.css'
const ToggleModeButton = () => {
    const {toggle, setToggle} = useContext(ToggleContext)
    return(
        <div className='toggle-button-container'>
            <button type='button' className='toggle-button' onClick={()=>{setToggle(!toggle)}}>
                {toggle ? <GoSun className='sun-icon' />:<FiMoon className='toggle-icon' />}
            </button>
        </div>
    )
}

export default ToggleModeButton
