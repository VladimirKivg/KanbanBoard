import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Form from 'react-bootstrap/Form';
const DeleteModal = ({task,deleteTask}) => {

    const [modal, setModal] = useState(false);


    const [checking, setChecking] = useState('');
    const toggle = () => {
        setModal(!modal);
        setChecking('');
    };


    const onDelete = () => {
        toggle();
        deleteTask(task);
    }

    const onCancel = () => {
        toggle();
    }

    return (
        <>
            <Button variant="button" className="btn btn-outline-danger" onClick={toggle}>
                Delete
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>DELETE-|-TASKS</ModalHeader>
                <ModalBody>
                    <p>To confirm, type "{task.name}" in the box below</p>
                    {/*це встевили з reacktstrap*/}
                    <InputGroup  style={{marginBottom:'8px'}}>
                        <Input onChange={(e) =>setChecking(
                            e.target.value)}
                               value={checking}
                               placeholder="task name"
                        />
                    </InputGroup>

                </ModalBody>
                <ModalFooter>
                    <Button disabled={task.name !== checking} variant="button" className="btn btn-outline-primary" color="primary" onClick={onDelete}>
                        Delete
                    </Button>{' '}
                    <Button variant="button" className="btn btn-outline-primary" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default DeleteModal;