import {fetchWithoutToken, fetchWithToken} from "../../helpers/fetch";
import * as fetchModule from '../../helpers/fetch';

describe('Testing fetch', () => {

    test('should fetch Without token success', async () => {

        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    token: 'ABC123ABC123'
                }
            }
        }));

        const resp = await fetchWithoutToken('auth', {email: "salva@email.com", password: '123456'}, 'POST');

        const body = await resp.json();

        expect(body.ok).toBe(true);

        expect(body.token).toBe("ABC123ABC123");

    });

    test('should fetch With token success', async () => {
        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    event: 'evento1',
                    user: {
                        _id: "32323",
                        name: 'salva'
                    },
                }
            }
        }));

        const resp = await fetchWithToken('events', {id: "213232", event: 'evento1'}, 'POST');

        const body = await resp.json();
        expect(body.ok).toBe(true);

        expect(body.event).toBe("evento1");
    });

});