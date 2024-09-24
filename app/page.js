"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const page = () => {
  const [title,settitle]=useState("")
  const [desc,setdesc]=useState("")
  const[maintask,setmaintask]=useState([])


  
  useEffect(() => {
    const todoString = localStorage.getItem("maintask");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setmaintask(todos);
    }
  }, []);

  const submitHandle=(e)=>{
    e.preventDefault();
    const newTask = { title, desc };
    const updatedTasks = [...maintask, newTask];
    setmaintask(updatedTasks);
    settitle("");
    setdesc("");
    savetoLS(updatedTasks); // Pass updated tasks to save
  }

const deleteHandler=(i)=>{
let copytask = [...maintask];
copytask.splice(i,1)
setmaintask(copytask)

savetoLS(copytask)
}


  let rendertask;
  let tasks
if(maintask.length==0){
 rendertask = <h2 className='text-white'>No task Available</h2>
}
else{
  tasks = maintask.map((t,i)=>{
    return <div key={i} className='flex items-center justify-between p-4'>
       <h2 className="font-bold text-3xl">{t.title}</h2>
       <h4 className=' text-2xl'>{t.desc}</h4>
       <button className='bg-red-400 text-white px-4 py-2  rounded font-bold' onClick={()=>{
        deleteHandler(i)
       }}>Delete</button>
    </div>
    })
}

const savetoLS =(tasks)=>{
localStorage.setItem("maintask",JSON.stringify(tasks))
}


  return (

    <>
     <h1 className='text-white bg-slate-900 p-6 text-4xl font-bold text-center w-sceen '>My ToDo </h1>

     <form className='flex justify-center m-5' onSubmit={submitHandle}>
        <input className='border-zinc-800 border-2  px-2 py-2 m-2' type="text" placeholder='Enter Task Here' value={title} onChange={(e)=>{
settitle(e.target.value)
console.log(title);

        }} />
        <input className='border-zinc-800 border-2   px-60 py-2 m-2 ' type="text" placeholder='Enter Description Here' value={desc} 
        onChange={(e)=>{
          setdesc(e.target.value)
        }}/>
       

       <button className='bg-slate-900 text-white px-4 py-2 text-2xl font-bold rounded-lg m-2  '>Add Task</button>
     </form>

     
<hr />
<div className='p-4 bg-slate-700 '>{rendertask}</div>
<div className='  bg-black text-white  p-4 my-5 '>
  {tasks}
 
</div>
    </>
  )
}

export default page
