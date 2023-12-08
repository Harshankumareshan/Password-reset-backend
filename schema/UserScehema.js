const mongoose = require('mongoose')

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue); 
  } 
  function validateMobile(e){
    let result = true;
    for(let i = 0;i<e.length;i++)
    {
        if(Number(e[i])==e[i])
        {
            continue;
        }
        else{
            result = false
            break;
        }
    }
    return result
  }

let UserSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,validate:{validator:validateEmail,message:"Invalid Email"}},
    password:{type:String, required:true},
    role:{type:String, default:'student'},
    status:{type:Boolean, default:true},
    ceatedAt:{type:Date, default:Date.now()}
},{Collection:'users',versionKey:false})

let UserModel = mongoose.model('users', UserSchema)

module.exports = {UserModel}
