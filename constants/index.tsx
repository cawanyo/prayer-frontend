import { Calendar1, Church, CircleUserRound, House, NotebookPen } from "lucide-react"

export enum FormFieldType {
    INPUT = 'input',
    TEXT_AREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton',
    PASSWORD = 'password'
  
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


  export const HeaderType = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Dashboard',
      href: 'dashboard'
    },
    {
      name: 'Submit',
      href: 'prayer'
    },
    {
      name: 'Community',
      href: 'community'
    }
  ]


  export const NavbarType = [
    {
      name: 'Accueil' ,
      href: '/',
      icon: <House color='gray' />
    },
    {
      name: 'Prière',
      href: '/dashboard/prayers',
      icon: <Church  color='gray'/>
    },
    {
      name: 'Disponibilité',
      href: '/dashboard/member/availability',
      icon: <Calendar1 color='gray'/>
    },
    {
      name: 'Planing',
      href: '/dashboard/planing',
      icon: <NotebookPen color='gray' />
    },
    {
      name: 'Profile',
      href: '/dashboard/user',
      icon: <CircleUserRound color='gray' />
    }
  ]