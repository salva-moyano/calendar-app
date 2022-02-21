
import './login.css'
import {useDispatch} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {startLogin, startRegister} from "../../actions/auth";

export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [formLoginValues, handleLoginInputChange ] = useForm({
        loginEmail: '',
        loginPassword: ''
    })

    const [formRegisterValues, handleRegisterInputChange] = useForm({
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        registerPassword2: ''
    });

    const { loginEmail, loginPassword } = formLoginValues;
    const { registerName, registerEmail, registerPassword, registerPassword2 } = formRegisterValues;

    const handleLogin = ( e ) => {
        e.preventDefault();
        dispatch( startLogin(loginEmail, loginPassword));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-12 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input type="text"
                                   className="form-control"
                                   placeholder="email"
                                   name="loginEmail"
                                   value={loginEmail}
                                   onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input type="password"
                                   className="form-control"
                                   placeholder="password"
                                   name="loginPassword"
                                   value={ loginPassword }
                                   onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}