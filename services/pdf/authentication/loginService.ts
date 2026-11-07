const user_login = (payload) => {
    try{
        console.log("try block")
    }catch(error:any){
        return {
            type :"error",
            message : error.message,
            componentData : null
        }
    }
}

export default user_login