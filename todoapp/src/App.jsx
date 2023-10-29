import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [task,setTask]= useState();
  const [todo,setTodos] = useState([]);
  const [editId,setEditid]=useState(null);
  let [isEdit,setIsEdit]=useState(false);

  function submitTask(){
    debugger;
    if(isEdit === false){
    axios.post('http://localhost:3001/add', {task:task})
    .then(result => {
      window.location.reload();
    })
    .catch(err => console.log(err))
  }else{
    axios.put('http://localhost:3001/edit/'+editId,{task:task})
    .then(result => 
     {
      window.location.reload();
     }
    )
    .catch(err => console.log(err));
  }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => {
     setTodos(result.data)
    }
    )
    .catch(err => console.log(err));
  },[]);

  function onHandleChange(id,compltetval){
    debugger;
    axios.put('http://localhost:3001/update/'+id,{complete: compltetval})
    .then(result => 
     {
      window.location.reload();
     }
    )
    .catch(err => console.log(err));
  }

  function onDeleteClick (id){
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result => {
      window.location.reload();
    })
    .catch(err => console.log(err));
  }

  function onEditClick(id,task) {
    debugger;
    setTask('')
    setTask(task);
    setIsEdit(true);
    setEditid(id)
    console.log(isEdit);
  }


  return (
    <div className='bgcol'>
      <div className="mt-5 container bgcol">
     <h1 className="text-center colour bgcol">Todo list</h1>
     </div>
     <div className="container bgcol mt-3">
     <div className="d-flex justify-content-center align-items-center">
      <input className="p-2 me-1 rounded bordcol" placeholder="Enter your task" value={task} type="text" onChange={ev => setTask(ev.target.value)} />
      <button className="p-2 ps-3 pe-3 rounded bordcol" onClick={submitTask}>{isEdit === false ? 'Add' : 'Update'}</button>
      </div>
     </div>
     <div className="container bgcol pb-2">
      {/* ///ajlals */}
      {todo.length > 0 ? (
  todo.map((item, index) => (
     <div className="d-flex justify-content-center align-items-center" >
    <div key={index} className="bord rounded ps-2 mt-2 position-relative " style={{ minWidth: '500px' , minHeight: '50px' }}>
    {item.complete ? (
    <p className="mt-2"><s>{item.task}</s></p>
  ) : (
    <p className="mt-2">{item.task}</p>
  )}
     </div>
     <div className=" d-flex mt-2 position-absolute custom-left-20">
     <button className="rounded-circle bordcol" onClick={() => onEditClick(item._id,item.task)} style={{ marginRight: '5px' }} >
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="white" className="bi bi-pencil-square pb-1" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
     </button>
     <button className="rounded-circle bordcol" onClick={()=>onDeleteClick(item._id)}>
     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="white" className="bi bi-trash3 pb-1" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
     </button>
     <div className="rounded-circle bordcol p-2 ms-1 ">
    <input className='btn' onChange={() => onHandleChange(item._id,!item.complete)} checked={item.complete} type="checkbox" />
     </div>
     </div>
      </div>
       ))
       ) : (
         <h1 className='text-center'>No Tasks</h1>
       )}
     </div>
    </div>
  );
}

export default App;
