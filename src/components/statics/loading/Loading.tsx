import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Loading(){
    let history = useNavigate();
    
    function back(){
        history('/categoria')
    }

    useEffect( () => { 
        back() 
    },[ ])

    return(
        <></>
    )
}

export default Loading;