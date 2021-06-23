import listCollaborator from "com/list/listCollaborator";
import addCollaborator from "com/add/addCollaborator";
import calendar from "com/calendor/calendor";
import  Profile from "./com/userprofile";
import Addholiday from './com/add/addHoliday';
import Holidaylist from './com/list/holidaylist';
import UnitList from './com/list/UnitList';
import myRequest from './com/list/myRequest';
//import myRequest from './com/vacationrequest/alt';

import Request from './com/list/Request';
import addUnit from './com/add/addUnit';
import changePassword from './com/add/changePassword';
import Home from './components/Home/Home'
import Vacationrequest from "com/vacationrequest/Vacationrequest";
import CollaboratorSolde from './com/list/CollaboratorSolde';
import PaidVacation from "com/vacationrequest/PaidVacation";
import RecoveryVacation from "com/vacationrequest/RecoveryVacation";
import ExceptionVacation from "com/vacationrequest/ExceptionalVacation";
import UnpaidVacation from "com/vacationrequest/UnpaidVacation";
import Historic from "com/vacationrequest/HistoricVacation";
import TypeOfVacation from "com/list/TypeOfVacacionList";
import AddType from "com/add/addType";
const dashboardRoutes = [
  
  {
    path: "/Home",
    class:"IoIosHome",
    name: "Home",
    component: calendar,
    layout: "/admin",
  },/*{
    path: "/calendar",
    name: "calendar",
    icon: "nc-icon nc-chart-pie-35",
    component: calendar,
    layout: "/admin",
  },*/
  {
    path: "/Request",
    name: "REQUEST",
    class:"FaHourglassEnd",
    component: Request,
    layout: "/admin/validator",
  },
  {
    path: "/MyRequest",
    name: "MY REQUEST",
    class: "IoIosPaper",
    component: myRequest,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: Profile,
    layout: "/admin/password",
  },
  
  {
    path: "/collaborator",
    name: "List Users",
    
    class: "IoIosPeople",
    component: listCollaborator,
    layout: "/admin/list",
  },
  {
    path: "/add-user/:id",
    name: "Add employees",
    class: "IoIosPersonAdd",
    component: addCollaborator,
    layout: "/admin/list",
  },
  {
    path: "/holidays",
    name: "Holidays",
    class:"IoCalendar",
    component: Holidaylist,
    layout: "/admin",
  },{
    path: "/:id",
    name:"add holiday",
    component: Addholiday,
    layout: "/admin/holiday",
  },
  {
    path: "/list",
    name: "Organizational Unit",
    class: "unit",
    component: UnitList,
    layout: "/admin/units",
  },{
    path: "/:id",
    name: "Unit",
    component: addUnit,
    layout: "/admin/unit",
  },{
    path: "/change",
    name: "Change password",
    component: changePassword,
    layout: "/admin/password",
  },
  {
    path: "/solde",
    name: "Collaborator balance",
    class: "MdAccountBalanceWallet",
    component: CollaboratorSolde,
    layout: "/admin/validator",
  },
  {
    path: "/vacationrequests",
    name:"Vacation Request",
    class: "FiSend",
    component: Vacationrequest,
    layout: "/admin",
  },
  {
    path: "/paid",
    name:"Vacation Request",
    component: PaidVacation,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/unpaid",
    name:"Vacation Request",
    component: UnpaidVacation,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/exceptional",
    name:"Vacation Request",
    component: ExceptionVacation,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/recovery",
    name:"RecoveryVacation",
    component: RecoveryVacation,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/History",
    name:"Historic",
    component: Historic,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/Type",
    name:"Type of vacation",
    icon: "nc-icon nc-send",
    component: TypeOfVacation,
    layout: "/admin/vacationrequest",
  },
  {
    path: "/:id",
    name:"Type Of Vacation",
    component: AddType,
    layout: "/admin/type",
  }
];

export default dashboardRoutes;
