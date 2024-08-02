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
      task: '',
    },
    index: null
  });

  const addEntry = (data) => {
    setModalState(data);
  }

  const deletion = (data) => {
    if (window.confirm('Do you want to remove this data?')) {
      const output = findAll.filter((x) => x.id !== data);
      dispatch(remove({ data: output }));
    }
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
      <div className='main'>
        <div className='mb-3'>
          <Button variant='success' onClick={() => addEntry(true)}>
            <Add />
          </Button>
        </div>
        {
          findAll.length > 0 ?
            <>
              <div style={{ overflowX: 'auto' }}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: '70%' }}>Task</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      findAll.map((itr, i) => {
                        return (
                          <tr key={i}>
                            <td>{itr.task}</td>
                            <td>
                              <div className='d-flex justify-content-around'>
                                <div>
                                  <Button
                                    style={{ color: 'white' }}
                                    variant='warning'
                                    onClick={() => updation(itr.id, i)}
                                  >
                                    <Edit />
                                  </Button>
                                </div>
                                <div>
                                  <Button variant='danger' onClick={() => deletion(itr.id)}>
                                    <Delete />
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </>
            :
            <h3 className='text-center border p-5'>
              No tasks to be done
            </h3>
        }

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
