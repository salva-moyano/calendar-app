import {types} from "../../types/types";

describe('Testing Types', () => {

    test('should types equals ', () => {

        expect(types).toEqual({
            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',

            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',

            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',

            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start Register',
            authStartTokenRenew : '[auth] Start token Renew',
            authLogout: '[auth] Logout'
        })
    })
});