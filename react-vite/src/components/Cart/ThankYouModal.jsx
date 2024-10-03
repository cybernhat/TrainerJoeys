import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/Modal'
import './ThankYouModal.css'
const ThankYouModal = () => {
    const navigate = useNavigate()
    const { closeModal } = useModal()

    const handleSubmit = () => {
        navigate('/')
        closeModal()
    }
    return (
        <div id='thank-you-modal-container'>
            <span className='thank-you-span'>Thank you for your purchases! A notification will be sent to the seller. Happy battling!</span>
            <button className='thank-you-modal-button' onClick={handleSubmit}>
                Continue Shopping
            </button>
        </div>
    )
}

export default ThankYouModal
