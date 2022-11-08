import { CFooter } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const TheFooter = () => {
    return (
        <CFooter className='mt-4'>
            <div className='font-size-14 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start w-100'>
                <span>Made with <FontAwesomeIcon color='#FF1E00' className='me-1 ms-1' icon={faHeart} /> in Serbia. © 2022 - {new Date().getFullYear()}</span> <a className='ms-2' href="https://hefesgroup.com/" target="_blank" rel="noopener noreferrer">Hefes Technology Group</a>
            </div>
        </CFooter>
    )
}

export default TheFooter;