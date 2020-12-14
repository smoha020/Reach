import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


function LoadSpinner() {
    
    return (
        <div style={{ 
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <CircularProgress/>
        </div>
    )   
}

export default LoadSpinner