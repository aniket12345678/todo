import { Button, Table, Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from './slice/crud.slice';
import AddModal from './components/AddModal';
import { useState } from 'react';
import UpdateModal from './components/UpdateModal';
import { Add, Edit, Delete } from '@mui/icons-material';

function App() {
  const dispatch = useDispatch();
  const { findAll } = useSelector((x) => x.crudSlice);

  const [modalState, setModalState] = useState(false);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [findOne, setFindOne] = useState({
    data: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    index: null
  });

  const addEntry = (data) => {
    setModalState(data);
  }

  const deletion = (data) => {
    const output = findAll.filter((x) => x.id !== data);
    dispatch(remove({ data: output }))
  }

  const updation = (data, id) => {
    const output = findAll.find((x) => x.id === data);
    setFindOne({ data: output, index: id });
    setUpdateModalState(true);
  }

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <h4 className='text-white'>Todo app</h4>
        </Container>
      </Navbar>
      <Button variant='success' onClick={() => addEntry(true)}>
        <Add />
      </Button>
      <div style={{ overflowX: 'auto' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              findAll.map((itr, i) => {
                return (
                  <tr key={i}>
                    <td>1</td>
                    <td>{itr.firstName}</td>
                    <td>{itr.lastName}</td>
                    <td>{itr.email}</td>
                    <td>{itr.password}</td>
                    <td>
                      <Button style={{color:'white'}} variant='warning' onClick={() => updation(itr.id, i)}>
                        <Edit />
                      </Button>
                      <Button variant='danger' onClick={() => deletion(itr.id)}>
                        <Delete />
                        </Button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>
      <AddModal modalState={modalState} handleClose={setModalState} />
      <UpdateModal
        data={findOne}
        findAll={findAll}
        modalState={updateModalState}
        handleClose={setUpdateModalState}
      />
    </div>
  );
}

export default App;
