import React, {useState} from 'react';
import {Button} from "react-bootstrap";
import {Input, InputGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import Form from 'react-bootstrap/Form';
const UpdateModal = ({statuses,priorities,task,updateTask}) => {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [newTask, setNewTask] = useState(task);

    console.log(newTask);

    const onSave = () => {
        toggle();
        updateTask(newTask);
       /* setNewTask(initialState);*/
    }

    const onCancel = () => {
        toggle();
       /* setNewTask(initialState);*/
    }

    return (
        <>
            <Button variant="button" className="btn btn-outline-warning"  onClick={toggle}>
               Update
            </Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Update Task</ModalHeader>
                <ModalBody>
                    {/*це встевили з reacktstrap*/}
                    <InputGroup  style={{marginBottom:'8px'}}>
                        <Input onChange={(e) =>setNewTask(
                            {...newTask,name:e.target.value})}
                               value={newTask.name}
                               placeholder="task name"
                        />
                    </InputGroup>
                    <InputGroup style={{marginBottom:'8px'}}>
                        <br />
                        <Input
                            onChange={(e) =>setNewTask(
                                {...newTask,description:e.target.value})}
                            value={newTask.description}
                            placeholder="task desctiption"
                        />
                    </InputGroup>
                    <br />

                    <Form.Select
                        onChange={(e) =>setNewTask(
                            {...newTask,status:e.target.value})}
                        value={newTask.status}
                        style={{marginBottom:'8px'}} aria-label="Default select example">
                        {statuses.map((el)=><option value={el.status}>{el.status}</option>)}
                    </Form.Select>

                    <Form.Select
                        onChange={(e) =>setNewTask(
                            {...newTask,priority:e.target.value})}
                        value={newTask.priority}

                        aria-label="Default select example">
                        {priorities.map((el)=><option value={el}>{el}</option>)}
                    </Form.Select>

                </ModalBody>
                <ModalFooter>
                    <Button variant="button" className="btn btn-outline-primary" color="primary" onClick={onSave}>
                        Save
                    </Button>{' '}
                    <Button variant="button" className="btn btn-outline-primary" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UpdateModal;