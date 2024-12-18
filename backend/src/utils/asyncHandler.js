// Higher Order Function 


export const asyncHandler = (requestHandler) =>{  // requestHandler is the fxn that is to be executed 
    return (req,res,next)=>{  // taking the fxn as the input and returning 
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}





