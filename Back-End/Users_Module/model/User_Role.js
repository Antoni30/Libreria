class User_Role{
    constructor(user_role_name,id=0){
        this.id=id;
        this.user_role_name=user_role_name;
    }

    getUserRoleName() {
        return this.user_role_name;
    }

    getId(){
        return this.id;
    }

    setUserRoleName(id) {
         this.user_role_name= id;
    }


}
export default User_Role;