const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

studentSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=bcrypt.hash(this.password,12);
    }
    next();
});

const StudentSchema=mongoose.model('StudentSchema',studentSchema);
module.exports=StudentSchema;