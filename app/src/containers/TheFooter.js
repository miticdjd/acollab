import { CFooter } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const TheFooter = () => {
    return (
        <CFooter className='mt-4'>
            <div className='font-size-14 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start w-100'>
                <span>Napravljeno sa <FontAwesomeIcon color='#FF1E00' className='me-1 ms-1' icon={faHeart} /> u Srbiji. © {new Date().getFullYear()}</span> <a className='ms-2' href="https://draganmitic.com/" target="_blank" rel="noopener noreferrer">Dragan Mitić</a>
            </div>
        </CFooter>
    )
}

export default TheFooter;