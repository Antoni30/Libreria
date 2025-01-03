import { pool } from "../../db.js"
import User from "../model/User.js"

export const  getUsers = async (req, res)=>{
    try {
        const {rows} = await pool.query("select * from get_data_users()")
        const users= rows.map(row => new User(row.id_user_role,row.user_fullname,row.user_email,row.user_password,row.user_phone,row.user_registration_date,row.id_user))
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}
export const postUser = async (req,res)=>{
    try {
        const { id_user_role,user_fullname,user_email,user_password,user_phone} = req.body;  
        
        if(!id_user_role || !user_fullname || !user_email ||  !user_password){
            return res.status(400).json({
                message: `Missing required: Remenber the structure is {id_user_role,user_fullname,user_email,user_password}`
            })
        }
        const date = new Date()
        const dateFormat=date.toISOString()
        const newUser = new User(id_user_role,user_fullname,user_email,user_password,user_phone,dateFormat)
        await pool.query("Call insert_data_user($1,$2,$3,$4,$5)",[newUser.getUserRole(),newUser.getUserFullName(),newUser.getUserEmail(),newUser.getUserPassword(),newUser.getUserPhone()]);
        res.status(200).json({
            message:"Add new USER",
        })
    } catch (error) {
        res.status(500).json({
            message: "Duplicate Email",
        })
    }
}

export const putUser = async(req,res)=>{
    try {
        const {id}= req.params
        const { id_user_role,user_fullname,user_password,user_phone} = req.body; 
        if(!id_user_role || !user_fullname ||  !user_password){
            return res.status(400).json({
                message: `Missing required: Remenber the structure is {id_user_role,user_fullname,user_password}`
            })
        }

        const {rows} = await pool.query("SELECT does_user_exist($1)",[id])
        if (rows[0].does_user_role_exist===false){
            res.status(400).json({
                message:  `User with ID ${id} does not exists.`
            })
        }
        else{
            const date = new Date()
            const dateFormat=date.toISOString()
            const newUser = new User(id_user_role,user_fullname,"server@server.com",user_password,user_phone,dateFormat)
            await pool.query("Call update_data_user($1,$2,$3,$4,$5)",[id,newUser.getUserRole(),newUser.getUserFullName(),newUser.getUserPassword(),newUser.getUserPhone()]);
            res.status(200).json({
                message:"Update  data"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}
export const deleteUser = async (req,res)=>{
    try {
        const {id}= req.params

        const {rows} = await pool.query("SELECT does_user_exist($1)",[id])
        if (rows[0].does_user_role_exist===false){
            res.status(400).json({
                message:  `User with ID ${id} does not exists.`
            })
        }
        else{
            await pool.query("call delete_data_user($1)",[id]);
            res.status(200).json({
                message: `Delete USER  with ID ${id}`
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}