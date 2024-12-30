import { pool } from "../../db.js"
import User_Role from "../model/User_Role.js"

export const getRoles = async (req, res)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM get_data_roles()')
        const userRoles= rows.map(row => new User_Role(row.user_role_name,row.id_user_role))
        res.status(200).json(userRoles);
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}

export const postRoles = async (req,res) =>{
    try {
        const { user_role_name } = req.body;
        
        if(!user_role_name){
            return res.status(400).json({
                message: "Missing required field: user_role_name"
            })
        }
        const new_Role = new User_Role(user_role_name)
        await pool.query('call insert_data($1)',[new_Role.getUserRoleName()])
        res.status(200).json({
            message:"Add new Role",
        })
    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}

export const deleteRoles = async(req,res)=>{
    try { 
        const{id} = req.params;
        const {rows} = await pool.query("SELECT does_user_role_exist($1)",[id])
        if (rows[0].does_user_role_exist===false){
            res.status(400).json({
                message:  `Role with ID ${id} does not exists.`
            })
        }
        else{
            await pool.query("call delete_data($1)",[id]);
            res.status(200).json({
                message: `Delete role  with ID ${id}`
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}

export const putRoles = async (req,res)=>{
    try {
        const{id} = req.params;
        const {user_role_name}= req.body;
        if(!user_role_name){
            res.status(400).json({
                message: "Missing required field: user_role_name"
            })
        }
        const {rows} = await pool.query("SELECT does_user_role_exist($1)",[id])
        if (rows[0].does_user_role_exist===false){
            res.status(400).json({
                message:  `Role with ID ${id} does not exists.`
            })
        }
        else{
            await pool.query("call update_data($1,$2)",[id,user_role_name]);
            res.status(200).json({
                message:"Update data"
            })
        }
       
    } catch (error) {
         res.status(500).json({
            message: "Server Error 🛠️⚙️",
            error: error.message
        })
    }
}
