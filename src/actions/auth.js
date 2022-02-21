import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        try {

            const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST');
            const body = await resp.json();

            if (body.ok) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem( 'token-init-date', new Date().getTime());

                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startRegister = ( email, password, name ) => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchWithoutToken('auth/new', {email, password, name}, 'POST');
            const body = await resp.json();

            if (body.ok) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem( 'token-init-date', new Date().getTime());
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch ( err ) {
            Swal.fire('Error', err.message, 'error')
        }
    }
}

export const startChecking = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchWithToken('auth/renew');
            const body = await resp.json();

            if (body.ok) {
                localStorage.setItem( 'token', body.token );
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }))
            } else {
                dispatch( checkingFinish() );
            }
        } catch ( err ) {
            Swal.fire('Error', err.message, 'error')
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.clear()
        dispatch ( logout() );
    }
}

const logout = () => ({ type: types.authLogout})


