

export default class Common{

  isSupervisor(): boolean {
    var role = localStorage.getItem("role");
    return role == "SUPERVISOR";
  }

    isSupport(): boolean {
        var role = localStorage.getItem("role");
        return role == "SUPPORT" || role == "SUPPORT_L2";
      }
    
      isAdminSupport(): boolean {
        var role = localStorage.getItem("role");
        return role == "ADMIN_SUPPORT" ;
      }

      isERP(): boolean {
        var role = localStorage.getItem("role");
        return role == "ERP" ;
      }

      isSupportL1(): boolean {
        var role = localStorage.getItem("role");
        return role == "SUPPORT";
      }
    
      isSupportL2(): boolean {
        var role = localStorage.getItem("role");
        return role == "SUPPORT_L2";
      }

    isManager(): boolean {
        var role = localStorage.getItem("role");
        return role == "FUNERAL_HOME_MANAGER";
    }

    isManagerAgent(): boolean {
        var role = localStorage.getItem("role");
        return role == "FUNERAL_HOME_MANAGER_AGENT";
    }

    getUserCurrentRole():string{
        return localStorage.getItem("role") ;
    }

    isEnsure(): boolean {
      var role = localStorage.getItem("role");
      return role == "ENSURE_MANAGER";
  }

  getTokenName(){
    return "token"
  }

  getUserName(){
    return localStorage.getItem("userName")
  }
}