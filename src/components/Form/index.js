import {useState, useEffect, useContext} from 'react'
import ToggleModeButton from '../ToggleModeButton'
import {ToggleContext} from '../ToggleContext'
import { TiDeleteOutline } from "react-icons/ti";
import { FaCircleCheck } from "react-icons/fa6";
import {v4 as uuidv4}  from 'uuid'
import './index.css';

const Form = () => {
    const [userDetail, setUserDetail] = useState({name:'', email:'', message:''})
    const [submitUserDetail, setSubmitUserDetail] = useState([])
    const [successMsg, setSuccessMsg] = useState(false)
    const {toggle} = useContext(ToggleContext)

    useEffect(()=>{
        const getUserData = JSON.parse(localStorage.getItem('userData')) 
        if (getUserData && getUserData.length > 0){
            setSubmitUserDetail(getUserData)
        }
    }, [])

    useEffect(()=>{
        localStorage.setItem('userData', JSON.stringify(submitUserDetail));
    },
    [submitUserDetail])

    const handleChange = (event) => {
        const {name, value} = event.target
        setUserDetail({...userDetail, [name]:value})
    }

    const submitUserDetailHandler  = (event) =>{
        event.preventDefault()

        setSuccessMsg(true)
        setTimeout(() => {
            setSuccessMsg(false)
        }, 5000);

        const updatedUserData = {
            id:uuidv4(),
            userName:userDetail.name,
            userEmail:userDetail.email,
            userMessage:userDetail.message
        }

        setSubmitUserDetail([...submitUserDetail, updatedUserData])
        setUserDetail({name:'', email:'', message:''})
    }

    const onClickDeleteButton = (id) => {
        const deleteUserDetail = submitUserDetail.filter(eachUserDetail => eachUserDetail.id !== id)
        setSubmitUserDetail(deleteUserDetail)

    }

    const dispalyUserData = (submitUserDetail && submitUserDetail.length > 0) 

    return (
        <div className={toggle ? 'dark-form-bg-container':'form-bg-container'}>
            <div className='form-card-container'>
                <div className={successMsg ? 'display-success-msg' : 'hide-success-msg' }>
                <FaCircleCheck />
                <p>Submit Seccessfully</p>
                </div>
                <form onSubmit={submitUserDetailHandler} className='form-container'>
                <ToggleModeButton />
                    <input className={toggle ? 'dark-input' : 'input'} onChange={handleChange} type='text' id='name' name='name' value={userDetail.name} placeholder='Enter your name:' required />
                    <input className={toggle ? 'dark-input' : 'input'} onChange={handleChange} type='email' id='email' name='email' value={userDetail.email} placeholder='Enter your @email:' required />
                    <input className={toggle ? 'dark-input' : 'input'} onChange={handleChange} id='message' name='message' value={userDetail.message} placeholder='Enter your message:' required />
                    <button type='submit'>Submit</button>
                </form>
            </div>

                <ul className={`
                ${toggle ? 'display-message-dark-container' : 
                    (dispalyUserData ? 'display-message-container' : 
                    'display-error-msg-container')}
                `}
                >
                    {
                      dispalyUserData ? 
                      (submitUserDetail.map(eachUserDetail => (
                        <li 
                        className={toggle ? 'display-dark-list-item' : 'display-list-item'} 
                        key={eachUserDetail.id}>
                            <div className='user-detail-container'>
                            <p className={toggle ? 'dark-user-detail-content' : ''}>
                                <span className={toggle ? 'dark-user-detail-items' : 'user-detail-items'}>Username:</span> {eachUserDetail.userName}
                            </p>
                            <p className={toggle ? 'dark-user-detail-content' : ''}>
                                <span className={toggle ? 'dark-user-detail-items' : 'user-detail-items'}>@User-Email:</span> {eachUserDetail.userEmail}
                            </p>
                            <p className={toggle ? 'dark-user-detail-content' : ''}>
                                <span className={toggle ? 'dark-user-detail-items' : 'user-detail-items'}>User-Message:</span> {eachUserDetail.userMessage}
                            </p> 
                            </div>
                            <div className='delete-container'>
                                <TiDeleteOutline className='delete-icon' onClick={() => onClickDeleteButton(eachUserDetail.id)} />
                            </div>
                            
                        </li>
                      )))
                      :
                      (<p className='no-msg'>Empty No Message ...?</p>)
                    }
                </ul>
            </div>
    );
}

export default Form;
