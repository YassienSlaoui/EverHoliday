import listCollaborator from "com/list/listCollaborator";
import addCollaborator from "com/add/addCollaborator";
import calendar from "com/calendor/calendar5";
import  Profile from "./com/userprofile";
import Addholiday from './com/add/addHoliday';
import Holidaylist from './com/list/holidaylist';
import UnitList from './com/list/UnitList';
import myRequest from './com/list/myRequest';
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
//import historic from "com/vacationrequest/HistoricVacation";
const dashboardRoutes = [
  
  {
    path: "/Home",
    icon: "nc-icon nc-album-2",
    name: "Home",
    component: Home,
    layout: "/admin",
  },{
    path: "/calendar",
    name: "calendar",
    icon: "nc-icon nc-chart-pie-35",
    component: calendar,
    layout: "/admin",
  },
  {
    path: "/Request",
    name: "REQUEST",
    icon: "nc-icon nc-chart-pie-35",
    component: Request,
    layout: "/admin/validator",
  },
  {
    path: "/MyRequest",
    name: "MY REQUEST",
    icon: "nc-icon nc-chart-pie-35",
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
    icon: "nc-icon nc-paper-2",
    component: listCollaborator,
    layout: "/admin/list",
  },
  {
    path: "/add-user/:id",
    name: "Add employees",
    icon: "nc-icon nc-simple-add",
    component: addCollaborator,
    layout: "/admin/list",
  },
  {
    path: "/holidays",
    name: "Holidays",
    icon: "nc-icon nc-album-2",
    component: Holidaylist,
    layout: "/admin",
  },{
    path: "/:id",
    name:"addholiday",
    component: Addholiday,
    layout: "/admin/holiday",
  },
  {
    path: "/list",
    name: "Organizational Unit",
    icon: "nc-icon nc-badge",
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
    icon: "nc-icon nc-badge",
    component: CollaboratorSolde,
    layout: "/admin/validator",
  },
  {
    path: "/vacationrequests",
    name:"Vacation Request",
    icon: "nc-icon nc-send",
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
  }
];

export default dashboardRoutes;
