import React, { useEffect, useState } from "react";
import Data from '../api/Data.json';
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';

const Home = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [branch, setBranch] = useState('')
    const [update, setUpdate] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
      // console.log(Data);
      setData(Data);
      loadData();

    },[]);
    
    const loadData = () => {
      const savedData = localStorage.getItem('Data');
      if (savedData) {
        setData(JSON.parse(savedData))
      } else {
        setData(Data);
      }
    }

    const toLocal = (data) => {
      localStorage.setItem('Data', JSON.stringify(data));
    }

    const handleEdit = (id) => {
        //alert(name);
        const dt = data.filter(item => item.id === id);
        // console.log(dt);
        
        if(dt !== undefined) {
          setUpdate(true);
          setId(id);
          setFirstName(dt[0].firstName);
          setLastName(dt[0].lastName);
          setBranch(dt[0].branch);
        }
    }

    const handleDelete = (id) => {
      if(id>0){
        const dt = data.filter(item => item.id !== id);
        setData(dt);

        toLocal(dt);
      }
    }

    const handleClear = () => {
        setId(0);
        setFirstName('');
        setLastName('');
        setBranch('');

        setUpdate(false);
    }

    
    const handleUpdate = () => {
      const index = data.findIndex(item => item.id === id);

        const dt = [...data];
        dt[index].firstName= firstName;
        dt[index].lastName = lastName;
        dt[index].branch = branch;
        
        setData(dt);
        toLocal(dt);

        handleClear();
      }
      
      const handleSubmit = (e) => {
          e.preventDefault();
          
          if (firstName === "" || lastName === "" || branch === ""){

            if (firstName === "" && lastName === "" && branch === "") {
              
            toast.error('Please fill all the input fields!');
            return;

          } else if (firstName === '' && lastName === ''){
            toast.error('please fill FirstName & LastName input fields!')
          } else if (lastName === '' && branch === ''){
            toast.error('please fill LastName & Branch input fields!')
          } else if (firstName === '' && branch === ''){
            toast.error('please fill FirstName & Branch input fields!')
          }
          
          else if (firstName === ''){
            toast.error('Please fill FirstName input fields!');
          } else if (lastName === ''){
            toast.error('Please fill LastName input fields!');
          } else if (branch === ''){
            toast.error('Please fill Branch input fields!')
          }
          setValidated(true);
          return;
        } else {
          toast.success("Successfully Added!!!");
        }
          
          const dt = [...data];
          const newData = data.length > 0 ? data[data.length - 1].id + 1 : 1;
            const newObj = {

              id: newData,
              firstName:firstName,
              lastName: lastName,
              branch: branch,
            }
          dt.push(newObj);
  
          setData(dt)
          toLocal(dt)
          handleClear();
          
      }

  return (
    <>
     <div className="heading-login text-center fs-2 fw-bold">
        CRUD Operations
     </div>
    <div className="form mt-1">
                <Form className="main_form w-30 mx-auto" noValidate validated={validated}>
                    <Form.Group controlId="id" className='mt-4'>
                        <Form.Label>Enter Your FirstName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your first name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="name" className='mt-4'>
                        <Form.Label>Enter Your LastName</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your last name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="branch" className='mt-4'>
                        <Form.Label>Enter Your Branch</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Branch"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please enter your branch.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="mt-3">
                        {!update ? (
                            <Button className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
                        ) : (
                            <Button className="btn btn-primary" onClick={() => handleUpdate()}>Update</Button>
                        )}
                    </div>
                </Form>
            </div>

    <div className="table">
        <table className="table w-75 m-auto">
            <thead>
              <tr>
                <th>Sr</th>
                <th scope="col" className="ps-5">FistName</th>
                <th scope="col">LastName</th>
                <th scope="col">Branch</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody className="tableRow">
                {
                    data.map((item, index) => {
                        return (
                          <tr key={index}>  
                              <td>{item.id}</td>
                              <td className="w-25 ps-5">{item.firstName}</td>
                              <td className="w-25">{item.lastName}</td>
                              <td className="w-25">{item.branch}</td>
                              <td className="w-25 d-flex gap-3">
                                <Button variant='warning' className="" onClick={(e) => handleEdit(item.id)}>Edit</Button>
                                <Button variant='danger' className="" onClick={(e) => handleDelete(item.id)}>Delete</Button>
                              </td>
                          </tr>

                        );
                    })
                }
            </tbody>
          </table>
    </div>
    </>
  );
};

export default Home;
