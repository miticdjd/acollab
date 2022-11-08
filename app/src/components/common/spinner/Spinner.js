const Spinner = ({smallSize = false}) =>{
    
    return (
        <div className={smallSize ? 'spinner-border spinner-border-sm me-1 sm-spinner' : 'spinner-border spinner-border-sm me-1'} role="status" aria-hidden="true"></div>
    )
}

export default Spinner