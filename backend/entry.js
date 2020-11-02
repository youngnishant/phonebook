const mongoose=require('mongoose')
console.log("Connecting ....")
mongoose.connect('mongodb+srv://abc:abc@123@cluster0-lfanp.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true})
                 .then(result=>{console.log('Connected Successfully')})
                 .catch(err=>{console.log("Not Connected :"+err)})

const schema=new mongoose.Schema({
    name: {
        type:String,
        
        required:true
          },
    number:{type:Number,
            maxlength:10,
            minlength:10,
            required:true
           },
    date:Date
})
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports= mongoose.model('Entry',schema)




