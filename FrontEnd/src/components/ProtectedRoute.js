import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const ProtectedRoute = ({isdash,children}) => {
    const res=localStorage.getItem('isLoggedIn');
    if(res=='false'){
        return <Navigate to='/login' />
    }
    if(isdash=='true'){
        return children;
    }
}

export default ProtectedRoute