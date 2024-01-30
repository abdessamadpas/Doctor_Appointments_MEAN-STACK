export interface Appointment {
  _id: string;
  patient: {
    _id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isDoctor: boolean;
    specialty: string; // adjust the type if needed
    isPatient: boolean;
    isAdmin: boolean;
    notifications: any[]; // adjust the type as needed
    seennotifications: any[]; // adjust the type as needed
    healthConditions: any[]; // adjust the type as needed
    isSuspended: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  doctor: {
    isAdmin: boolean;
    notifications: any[]; // adjust the type as needed
    seennotifications: any[]; // adjust the type as needed
    isSuspended: boolean;
    _id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isDoctor: boolean;
    specialty: string; // adjust the type if needed
    isPatient: boolean;
    healthConditions: any[]; // adjust the type as needed
    __v: number;
  };
  status: 'pending' | 'confirm' | 'decline';
  date: string;
  city: string;
  email : string;
  phone : string;
  timePicked : string;

  createdAt: string;
  updatedAt: string;
  __v: number;
}