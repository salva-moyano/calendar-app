import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";

export const Navbar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector( state => state.auth );

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand p-2">
                { name }
            </span>

            <button className="btn btn-outline-danger" onClick={ handleLogout }>
                <i className="fas fa-sign-out-alt"/>
                <span>Salir</span>
            </button>
        </nav>
    )
}