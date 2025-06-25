import { Calendar1, CalendarClock, Church, CircleUserRound, NotebookPen, Settings } from "lucide-react"

export enum FormFieldType {
    INPUT = 'input',
    TEXT_AREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
    PASSWORD = 'password',
    TIME = 'time'
  
  }

  export const SubjectType = [
    {
      image: "/assets/images/family.jpg",
      name: "Famille"
    },
    {
      image: "/assets/images/etude.jpg",
      name: "Etude"
    },
    {
      image: "/assets/images/travail.jpg",
      name: "Professionnel"
    },
    {
      image: "/assets/images/autre.jpg",
      name: "Autre"
    },
  ]

  interface HeaderType {
    name: string, 
    href: string
  }

  export const HeaderContent  = (isAuthenticated?: boolean) : HeaderType[] => [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Submit',
      href: '/prayer'
    },
    {
      name: 'Community',
      href: '/community'
    },
    {
      name: isAuthenticated? 'Dashboard' : '',
      href: isAuthenticated? '/dashboard' : ''
    },
  ]


  export const NavbarType = ( isIntercesseur?:boolean, isResponsable?: boolean) => {
    
    let out = [
    {
      name: 'Prière',
      href: '/dashboard/prayers',
      icon: <Church  color='gray'/>
    },
    {
      name: 'Profile',
      href: '/dashboard/user',
      icon: <CircleUserRound color='gray' />
    }
  ]

  if (isIntercesseur || isResponsable){

  out = out.concat( [
    {
      name: 'Disponibilité' ,
      href: '/dashboard/member/availability',
      icon: <Calendar1 color='gray'/>
    },
    {
      name: 'Planing',
      href: '/dashboard/member/planing',
      icon: <NotebookPen color='gray' />
    },
    {
      name: 'Rendez-vous',
      href: '/dashboard/member/rdv',
     
      icon:  <CalendarClock color='gray' />
    },
    
  ])
  }

  if (isResponsable){
    out = out.concat( [
      {
        name: 'Toutes les prières' ,
        href: '/dashboard/responsable/prayers',
        icon: <Church  color='gray'/>
      },
      {
        name: 'Gestion membres' ,
        href: '/dashboard/responsable/member',
        icon:<Settings  color='gray'/>
      },
    ])
  }

  return out


}