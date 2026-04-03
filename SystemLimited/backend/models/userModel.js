import {Schema,model} from 'mongoose'

const UserSchema = new Schema({
    first_name:{
         type:String,
         require: true
    },
    last_name:{
         type:String,
         require: true
    },
    email:{
         type:String,
         require: true
    },
    password:{
         type:String,
         require: true
    },
    username:{
         type:String,
         default:''
    },
    profile_image:{
         type:String,
         default:'profile.jpg'
    },
    role:{
         type:[String],
         default:['buyer']
    },
    isBlock:{
         type:Boolean,
         require: false
    },
    isAdmin:{
         type:Boolean,
         require: false
    },
    otp:{type:String},
     otpExpiry: {type: Date},
     
    address:{type:String,default:''},
    state:{type:String,default:''},
    city:{type:String,default:''},
    country:{type:String,default:''},
    postal_code:{type:String,default:''},
    dob:{type:String,default:''},
    phone_number:{type:String,default:''},
    gender:{type:String,default:''}
},{timestamps: true})

const User = model("users",UserSchema)

export default User