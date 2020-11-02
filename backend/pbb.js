const express = require('express')
const app=express()
const Entry=require('./models/entry')
const cors=require('cors')
app.use(cors())
app.use(express.json())

app.get('/api/Entry',(request,response)=>{
        Entry.find({}).then(entries=>
    {response.json(entries.map(entry=>entry.toJSON()))
    })
})

app.post('/api/Entry',(request,response,next)=>{
        const body=request.body
    const newEntry= new Entry({
         name:body.name,
         number:body.number,
         date:new Date()
         })
         
         newEntry.save().then(savednote=>{response.json(savednote.toJSON())}).catch(err=>next(error))
        })
         
app.put('/api/Entry/:id', (request, response,next) => {
  const body = request.body

  const newEntry = {
    name: body.name,
    number: body.number,
  }

  Entry.findByIdAndUpdate(request.params.id, newEntry, { new: true })
    .then(result=>{Entry.find({}).then(entries=>
    {response.json(entries.map(entry=>entry.toJSON()))
    })})
})
   
app.delete('/api/Entry/:id',(request,response,next)=>{
    Entry.findByIdAndRemove(request.params.id).then(result=>{Entry.find({}).then(entries=>
    {response.json(entries.map(entry=>entry.toJSON()))
    })})
})
         

app.listen(3001)