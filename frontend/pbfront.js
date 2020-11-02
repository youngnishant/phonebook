import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css'

//Component to add Footer to WebApp
const Footer=()=>{
    const footer={
        color:'black',
        background:'lightGray',
        fontSize:16,
        fontStyle:'italic',
        
    }
    return(<div><div>
                <br/><br/><br/><br/><br/><br/>  <br/>              <br/><br/><br/><br/><br/><br/>

</div>
    <div style={footer}>
        <em>Phone book Developed by Nishant Sharma, Computer Science & Engineering Department (CIFER X)</em>
        </div></div>
    )
}

//Component for Notification on any action taken
const Notification=({notify})=>{
    if(notify==null){
        return null
    }
    return(
    <div className='notify'>
        {notify}
    </div>
    )
}
const App=(props)=>{
 const [person,setPerson]=useState([])
 const [filter,setFilter]=useState('')
 const [newName,setNewName]=useState(' Name')
 const [newPhone,setNewPhone]=useState(' Phone No.')
 const [notify,setNotify]=useState("Welcome to PhoneBook Deveoped by Nishant Sharma !")

        setTimeout(()=>setNotify(null),3000)

 
 const getData=()=>{
     axios.get('http://localhost:3001/api/Entry').then(response=>{setPerson(response.data)})}
 useEffect(getData,[])
 const add=(event)=>{
     event.preventDefault()
     const newObj={name:newName,number:newPhone}
    let existing=person.find(p=>p.name===newName)
    if(existing){
        const ok=window.confirm(`Do You Want to Modify the Phone No. of : ${existing.name}`)
        if(ok){
     axios.put(`http://localhost:3001/api/Entry/${existing._id}`,newObj).then(response=>
             setPerson(person.map(p=>p.name===existing.name?newObj:p)))
            
        }
        setNewName(' Name')
     setNewPhone('Phone No. ')
              setNotify("Person Modified Successfully")
               setTimeout(()=>setNotify(null),3000)


    }
     else{
     axios.post('http://localhost:3001/api/Entry',newObj)

     setPerson(person.concat(newObj))
     }
     setNewName(' ')
     setNewPhone(' ')
           setNotify("Person Added Successfully")
            setTimeout(()=>setNotify(null),3000)


 }
 const removePerson=(id)=>{
     console.log(id)
     axios.delete(`http://localhost:3001/api/Entry/${id}`).then(response=>
          setPerson(person.filter(p => p._id !== id)))
      setNotify("Person Deleted Successfully")
            setTimeout(()=>setNotify(null),3000)


 }
 
 const check=()=>{
     let bool
     
      return (bool)
    
     
}
 //Helps to Syncronize between the Component and Event of Input of Value in Box
 
 const handleNewName=(event)=>{
     setNewName(event.target.value)
 }
 const handleNewPhone=(event)=>{
     setNewPhone(event.target.value)
 }
 const handleFilter=(event)=>{
     setFilter(event.target.value)
 }
    const personToShow = filter.length === 0 ? person : (person.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase())>-1))
     

 return(

 <div className='whole'>
          <Notification notify={notify}/>

     <div><h1>PhoneBook</h1></div>
         Search: <input value={filter} onChange={handleFilter}/>

     <br>
     </br><br></br><br></br><br></br>
     <form onSubmit={add}>
     <input placeholder="Name"value={newName} onChange={handleNewName}/>
     <input placeholder="Phone Number"value={newPhone} onChange={handleNewPhone}/>

     <button type='submit'>Add</button>
     <br/>
     <br/>
     </form>
     <table border="1"align='center'>
     <tr><td><h3>Name</h3></td><td><h3>Phone No.</h3></td><td><h3>Operation</h3></td></tr>
     {
     personToShow.map(person=><>
    <tr><td>{person.name}</td><td>{person.number}</td><td><button onClick={()=>removePerson(person._id)} >Delete</button></td></tr>
</>
     ) 
     
     }
     </table>


<Footer/>

     </div>

 )
}

ReactDOM.render(<App/>,document.getElementById('root'))