import Global  from "../helper/message"
const { ObjectId } = require('mongodb');


export const checkId = async(table,id) => {
    try {
        if(!id)
        throw Global.message.Id_REQ
        if(id){
            const findData = await table.findById(id);
            if (findData && findData !== null) {
                return findData             
            }
            else
            throw Global.message.NO_Data_
        }       
    } catch (error) {
       return error
    }
}

export const findByEmail = (table,email) => {
    return new Promise((resolve, reject) => {
        table.findOne({
            email: email
        }).then(result => {
            resolve({ result })
        }).catch((err) => {
            reject(err)
        })
    })
}


export const findByCustomerId = (table,id) => {
    return new Promise((resolve, reject) => {
        table.findById(  id
        ).then(result => {
            resolve({ result })
        }).catch((err) => {
            reject(err)
        })
    })
}
