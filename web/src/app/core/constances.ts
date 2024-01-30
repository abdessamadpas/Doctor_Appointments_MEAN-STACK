export const constances = {
  menus: [
    //! PATIENT ROUTES menu
    {
      name: 'Dashboard',
      url: '/patient/dashboard',
      icon: 'icon-speedometer',
      roles: ['patient'],
    },
    {
      name: 'Pick Doctor',
      url: '/patient/pickDoctor',
      icon: 'icon-drop',
      roles: ['patient'],
    },
    {
      name: 'Appointments',
      url: '/patient/appointments',
      icon: 'icon-pencil',
      roles: ['patient'],
    },

    //! DOCTOR ROUTES menu

    {
      name: 'Dashboard',
      url: '/doctor/dashboard',
      icon: 'icon-speedometer',
      roles: ['doctor'],
    },
    {
      name: 'Calendar',
      url: '/doctor/calendar',
      icon: 'icon-drop',
      roles: ['doctor'],
    },
    {
      name: 'Appointments',
      url: '/doctor/appointments',
      icon: 'icon-pencil',
      roles: ['doctor'],
    },
    {
      name: 'Patients',
      url: '/doctor/patients',
      icon: 'icon-drop',
      roles: ['doctor'],
    },

    //! ADMIN ROUTES menu
    {
      name: 'Dashboard',
      url: '/admin/dashboard',
      icon: 'icon-speedometer',
      roles: ['admin'],
    },

    {
      name: 'Doctors',
      url: '/admin/doctors',
      icon: 'icon-pencil',
      roles: ['admin'],
    },
    {
      name: 'Patients',
      url: '/admin/patients',
      icon: 'icon-pencil',
      roles: ['admin'],
    },
    {
      name: 'Requests',
      url: '/admin/requests',
      roles: ['admin'],
    },
    //! COMMON ROUTES menu
    {
      name: 'profile',
      url: '/profile',
      icon: 'icon-speedometer',
      roles: ['admin', 'doctor', 'patient'],
    },
  ],
};
