import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LoginScreen} from "../components/auth/LoginScreen";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {PrivateRoutes} from "./PrivateRoutes";
import {DashboardRoutes} from "./DashboardRoutes";
import {startChecking} from "../actions/auth";
import {PublicRoutes} from "./PublicRoutes";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const { checking } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={
                    <PublicRoutes>
                        <LoginScreen/>
                    </PublicRoutes>
                }/>

                <Route path="/*" element={
                    <PrivateRoutes>
                        <DashboardRoutes/>
                    </PrivateRoutes>
                } />
            </Routes>
        </BrowserRouter>
    )
}