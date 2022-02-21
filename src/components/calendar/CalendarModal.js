
import Modal from 'react-modal';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {uiCloseModal} from "../../actions/ui";
import {
    eventAddNew,
    eventClearActiveEvent,
    eventStartAddNew,
    eventStartUpdate,
    eventUpdated
} from "../../actions/events";
import Swal from "sweetalert2";
import DateTimePicker from 'react-datetime-picker';

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}

export const CalendarModal = () => {

    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );
    const [titleValid, setTitleValid] = useState(true  );
    const [formValues, setFormValues] = useState( initEvent );
    const {notes, title, start, end } = formValues;

    useEffect(() => {
        if (activeEvent) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues])


    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent )
    }

    const handleStartDateChange = (e) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd  = moment( end );

        if (momentStart.isSameOrAfter( momentEnd )) {
            return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
        }

        if (title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {
            dispatch( eventStartUpdate( formValues ));
        } else {
            dispatch( eventStartAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: 123,
                    name: 'salva'
                }
            }));
        }

        setTitleValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen = { modalOpen }
            onRequestClose = { closeModal }
            style = { customStyles }
            closeTimeoutMs = { 200 }
            className = "modal"
            overlayClassName = "modal-fondo"
        >
            <h1>{ (activeEvent) ? 'Editar evento': 'Nuevo evento' }</h1>
            <hr />
            <form className="container" onSubmit={ handleSubmitForm }>
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>
                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        className="form-control"
                        format="dd-MM-y h:mm a"
                    />
                </div>
                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input type="text"
                           className={`form-control ${titleValid && 'is-invalid' }`}
                           placeholder="Titulo del evento"
                           name="title"
                           autoComplete="off"
                           value={ title }
                           onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea className="form-control"
                              placeholder="Notas"
                              rows="5"
                              name="notes"
                              value={ notes }
                              onChange={ handleInputChange }
                    >
                    </textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-outline-primary">
                        <i className="far fa-save"/>
                        <span> Guardar </span>
                    </button>
                </div>
            </form>
        </Modal>
    )
}