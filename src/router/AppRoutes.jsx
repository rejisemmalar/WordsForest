import { Route, Routes } from "react-router-dom";
import SplashScreen from "../pages/Splash";
import MainPage from "../pages/Main";


function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<SplashScreen/>}/>
            <Route path="/game" element={<MainPage/>}/>
        </Routes>
    )
}

export default AppRoutes;