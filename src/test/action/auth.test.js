import '@testing-library/jest-dom';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store';
import {startLogin, startRegister} from "../../actions/auth";
import {types} from "../../types/types";
import * as fetchModule from '../../helpers/fetch';
import Swal from "sweetalert2";
import {fetchWithoutToken} from "../../helpers/fetch";

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

let token = '';

describe('Testing auth action', () => {

    beforeEach(() => {
        store = mockStore( initState );
        jest.clearAllMocks();
    })

    test('should startLogin success', async () => {

        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'salva',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch( startLogin('salva@email.com', 'password'));

        const actions = store.getActions();

        expect(actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test("should startLogin with error badCredentials", async () => {

        fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: false,
                    msg: 'Bad Credentials',
                }
            }
        }));


        await store.dispatch( startLogin('salva@email.com', 'password'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenLastCalledWith('Error', 'Bad Credentials', 'error');

    });

    test("should startLogin with error user not found", async () => {

        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: false,
                    msg: 'User not found',
                }
            }
        }));


        await store.dispatch( startLogin('salva@email.com', 'password'));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect( Swal.fire ).toHaveBeenLastCalledWith('Error', 'User not found', 'error');

    });

    test('should startChecking success', async() => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'salva',
                    token: 'ABC123ABC123'
                }
            }
        }));

        await store.dispatch( startRegister('test2@test.com', '123456', 'test') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'salva'
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ABC123' );
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number) );
    })
});