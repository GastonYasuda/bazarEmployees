import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import InfoMessage from '../InfoMessage/InfoMessage';
import { apiEmployee } from '../../Context/EmployeeApiContext';

const NotificationButton = () => {

    const { infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee } = useContext(apiEmployee)

    // useEffect(() => {
    //     console.log('infoShiftFixMissing', infoShiftFixMissing);
    //     console.log('infoMissingEmployee', infoMissingEmployee);
    //     console.log('infoMissingMorning', infoMissingMorning);
    //     console.log('infoMissingAfternoon', infoMissingAfternoon);





    // }, [infoMissingMorning, infoMissingAfternoon, infoShiftFixMissing, infoMissingEmployee])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='notificationButtonContainer'>
            <button onClick={handleShow}>
                <img src="/notificationIcon.png" alt="Notification Icon" />
            </button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Notificaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>



                    <>
                        {/* <InfoMessage messages={infoMissingMorning} />
                        <InfoMessage messages={infoMissingAfternoon} />
                        <InfoMessage messages={infoShiftFixMissing} />
                        <InfoMessage messages={infoMissingEmployee} /> */}
                    </>






                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default NotificationButton
