import mongoose from "mongoose";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken"



// schema is structure of the format of the data 
const userSchema = new mongoose.Schema(
    {   

    username : {
       type:String, 
       required:true, // mandate from the backend 
       unique:true,  // every user document will have unique username 
       lowercase:true, 
       trim:true, // trimming the leading and trailing the whitespaces 
       index:true, // enabling the searching functionality based on index.    
    },
 
   
    email:{
        type:String,
        required:true,
        unique:true , 
        lowercase:true, 
        trim:true 
    },


    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true      
    },

 
    // sundar sa photo
    
    // uploding the image in the cloudinary and saving its url in the database  
    avatar:{
        type:String,
        required:true  
    },

    coverImage:{
        type:String, 
    },

    // storing the array of previously matched videos in the db
    watchHistory:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video" // passing the name of the schema as the reference 
        }
    ]
,

    password:{
        type:String,
        required:[true,'password is required']
    },

    refreshToken:{ // its for bit longer duration we save in the database when the accesstoken expires if the user refreshToken is valid
        // and has not expired , taking the refreshToken into the consideration new accessToken is assigned to the user   
      type:String   
    },




}

,{
    timestamps:true  // when that document got created  
}

)

// adding custom middlewares to the db, that will execute the callback functionality just before the data save

userSchema.pre("save",async function(next){

    // this refers to the current document 
    if(!this.isModified(password)){
        return next()
    }

    console.log("here"+this.password)
    
    this.password = bcrypt.hash(this.password,10) // hashing the password 
})



userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password) // this.passsword : is the password saved in the database 

    // pasword: is the password ie entered by the user 
}



// playlist model
// comments model
// likes model
