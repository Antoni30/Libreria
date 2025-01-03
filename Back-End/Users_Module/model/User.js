class User {
    constructor(id_user_role,user_fullname, user_email, user_password,user_phone,user_registration_date,id_user=0){
        this.id_user=id_user;
        this.id_user_role=id_user_role;
        this.user_fullname=user_fullname;
        this.user_email=user_email;
        this.user_password=user_password;
        this.user_phone= user_phone;
        this.user_registration_date=user_registration_date;
    }
    getUserRole(){
        return this.id_user_role;
    }
    getUserFullName(){
        return this.user_fullname;
    }
    getUserEmail(){
        return this.user_email;
    }
    getUserRegistration(){
        return this.user_registration_date;
    }
    getUserPassword(){
        return this.user_password;
    }
    getUserPhone(){
        return this.user_phone;
    }
    getUserID(){
        return this.id_user;
    }
    

    setUserRole(newUserRol){
        this.id_user_role=newUserRol;
    }
    setUserFullName(newUserFullName){
        this.user_fullname=newUserFullName;
    }
    setUserEmail(newEmail){
        this.user_email=newEmail;
    }
    setUserPassword(newPassword){
         this.user_password=newPassword;
    }
    setUserPhone(newUserPhone){
        this.user_phone=newUserPhone;
    }
}

export default User;