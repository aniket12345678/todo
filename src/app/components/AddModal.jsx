import { useFormik } from 'formik'
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import * as yup from 'yup'
import { create } from '../slice/crud.slice'
import { useDispatch } from 'react-redux'
import { generateId } from '../methods/functions'

const AddModal = ({ modalState, handleClose }) => {
    const dispatch = useDispatch();

    const validateFields = yup.object().shape({
        firstName: yup.string().required('Enter first name'),
        lastName: yup.string().required('Enter last name'),
        email: yup.string().email('Invalida E-mail').required('Enter E-mail'),
        password: yup.string().required('Enter password'),
    })

    const { values, errors, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
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
                        <Col md={6}>
                            <Form.Control
                                type='text'
                                placeholder='First Name'
                                name='firstName'
                                value={values.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <div>{errors.firstName}</div>}
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                type='text'
                                placeholder='Last Name'
                                name='lastName'
                                value={values.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <div>{errors.lastName}</div>}
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={6}>
                            <Form.Control
                                type='email'
                                placeholder='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div>{errors.email}</div>}
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                type='password'
                                placeholder='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div>{errors.password}</div>}
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
