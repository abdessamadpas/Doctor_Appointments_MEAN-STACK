

export class User {

    _id: any 
    username:any 
    email: any
    password:any 
    firstName:any 
    lastName: any
    isDoctor: any
    specialty :any 
    isPatient : any
    isAdmin: any
    notifications: any
    seennotifications: any
    healthConditions: any
    isSuspended: any
 


    constructor(
        _id?: any,
        username?:any,
        email?: any,
        password?:any,
        firstName?:any,
        lastName?: any,
        isDoctor?: any,
        specialty ?:any,
        isPatient ?: any,
        isAdmin?: any,
        notifications?: any,
        seennotifications?: any,
        healthConditions?: any,
        isSuspended?: any
    ) {
        this._id = _id ?? ''
        this.username = username ?? ''
        this.email = email ?? ''
        this.password = password ?? ''
        this.firstName = firstName ?? ''
        this.lastName = lastName ?? ''
        this.isDoctor = isDoctor ?? false
        this.specialty = specialty ?? ''
        this.isPatient = isPatient ?? false
        this.isAdmin = isAdmin ?? false
        this.notifications = notifications ?? ''
        this.seennotifications = seennotifications ?? ''
        this.healthConditions = healthConditions ?? ''
        this.isSuspended = isSuspended ?? false
    }
    
}

