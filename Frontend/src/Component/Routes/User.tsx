import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { Signup } from '../Signup/Signup';
import { Login } from '../Login/Login';
import { Connection } from '../WebSocket/Connection';


export const User: React.FC = () => {
    const [userRoutes, setUserRoutes] = useState<any>([
 
        { path: '/' , component: Login, bars : false},
        { path: '/Signup', component: Signup, bars: false }, 
        { path: '/Home/:receiverUserId' , component: Connection, bars : false},

       
    ]);
    console.log("User")
    

    return (
        <Routes>
        
            {userRoutes.map(({ path, component: Component, bars } : 
            {path: string, component: React.ComponentType<any>, bars: boolean }) => (
                <Route
                    key={path}
                    path={path}
                    element={bars ?  <Component />  : <Component />}
                />
            ))}
            <Route path="*" element={<></>} />
        </Routes>
    );
}