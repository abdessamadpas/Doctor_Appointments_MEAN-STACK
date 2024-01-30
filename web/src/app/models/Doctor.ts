export interface Doctor {
  _id: string;
  doctor: {
    _id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isDoctor: boolean;
    isPatient: boolean;
    isAdmin: boolean;
    notifications: any[]; // Adjust the type as needed
    seennotifications: any[]; // Adjust the type as needed
    healthConditions: any[]; // Adjust the type as needed
    isSuspended: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  isBusy: boolean;
  __v: number;
}
