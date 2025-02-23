import { auth } from "../firebaseAdmin.js";


export const deleteEmail =  async (req, res) => {
    try {
      const { uid } = req.params;
      await auth.deleteUser(uid);
      res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Error deleting user" });
    }
  }
  
export const updatePassword =  async (req, res) => {
    const {uid} = req.params
    const { newPassword } = req.body;
  
    try {
      await auth.updateUser(uid, { password: newPassword });
      res.status(200).send({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).send({ error: "Error updating password" });
    }
  }