import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'

import { update } from '../slice/crud.slice'

const UpdateModal = (props) => {
    const dispatch = useDispatch();
    const { modalState, handleClose, data, findAll } = props;

    const validateFields = yup.object().shape({
        task: yup.string().required('Enter task')
    });

    const { values, errors, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues: data && data.data,
        enableReinitialize: true,
        validationSchema: validateFields,
        onSubmit: (values) => {
            let storeArr = [...findAll];
            delete storeArr[data.index];
            storeArr[data.index] = values;
            dispatch(update(storeArr));
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
                <Modal.Title>Update Modal</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Row className='mb-3'>
                        <Col md={12}>
                            <Form.Control
                                type='text'
                                placeholder='First Name'
                                name='task'
                                value={values.task}
                                onChange={handleChange}
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

export default UpdateModal
