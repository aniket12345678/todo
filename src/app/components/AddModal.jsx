import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import { create } from '../slice/crud.slice'
import { generateId } from '../methods/functions'

const AddModal = ({ modalState, handleClose }) => {
    const dispatch = useDispatch();

    const validateFields = yup.object().shape({
        task: yup.string().required('Enter task')
    });

    const { values, errors, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues: {
            task: ''
        },
        validationSchema: validateFields,
        onSubmit: (values) => {
            values.id = generateId();
            dispatch(create(values));
            resetForm();
            handleClose(false);
        }
    })

    const closeModal = () => {
        resetForm();
        handleClose(false);
    }

    return (
        <Modal
            show={modalState}
            onHide={() => closeModal()}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add Modal</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className='mb-3'>
                        <Col md={12}>
                            <Form.Control
                                type='text'
                                name='task'
                                value={values.task}
                                onChange={handleChange}
                                placeholder='First Name'
                            />
                            {errors.task && <div>{errors.task}</div>}
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit'>Save</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default AddModal
