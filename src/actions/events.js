import {types} from "../types/types";
import {fetchWithToken} from "../helpers/fetch";
import Swal from "sweetalert2";
import {prepareEvents} from "../helpers/prepareEvents";

export const eventStartLoaded = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();

            console.log(body);
            if ( body.ok ) {
                const events = prepareEvents(body.events);
                dispatch( eventLoaded( events ) );
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (err) {
            Swal.fire('Error', err.message, 'error');
        }
    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})


export const eventStartAddNew = ( event ) => {
    return async (dispatch, getState) => {
        try {
            const { uid, name } = getState().auth;
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();

            if ( body.ok ) {
                event.id = body.eventSave.id;
                event.user = {
                    _id: uid,
                    name: name

                }
                dispatch ( eventAddNew( event ));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }


        } catch (err) {
            Swal.fire('Error', err.message, 'error')
        }
    }
}


export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate = ( event ) => {

    return async ( dispatch ) => {
        try {
            const resp = await fetchWithToken(`events/${ event.id }`, event, 'PUT');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch (eventUpdated( event ));
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch ( err ) {
            Swal.fire('Error', err.message, 'error')
        }
    }

}

export const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async (dispatch, getState) => {
        try {
            const { id } = getState().calendar.activeEvent;

            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch ( err ) {
            Swal.fire('Error', err.message, 'error')
        }
    }
}

export const eventDeleted = () => ({ type: types.eventDeleted });

export const eventLogout = () => ({ type: types.eventLogout })