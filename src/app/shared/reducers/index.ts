import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import layout from '../layout/layout.reducer';
import authentication from './authentication';
import tabAction from '../layout/tab/tabs.reducer';
import payerGroupSelect from '../../modules/common/selector/PayerGroupSelect.reducer';
import bankCodeManagementReducer from '@/app/modules/admin/user-management/UserManagement.reducer';
import actionManagementReducer from '@/app/modules/action-management/ActionManagement.reducer';
import callbackUrlManagementReducer from '@/app/modules/client-config/callback-url-management/CallbackUrlManagement.reducer';
import clientGatewayManagementReducer from '@/app/modules/client-config/client-gateway-management/ClientGatewayManagement.reducer';
import clientGatewayMapManagementReducer from '@/app/modules/client-config/client-gateway-map/ClientGatewayMapManagement.reducer';
import clientCallbackManagementReducer from '@/app/modules/client-config/mgmt-client-callback/ClientCallBackManagement.reducer';
import cmsAppUrlManagementReducer from '@/app/modules/cms-config/cms-app-url/CmsAppUrlManagement.reducer';
import gatewayApiManagementReducer from '@/app/modules/cms-config/gateway-api/GatewayApiManagement.reducer';
import menuManagementReducer from '@/app/modules/cms-config/menu/MenuManagement.reducer';
import menuGroupManagementReducer from '@/app/modules/cms-config/menu-group/MenuGroupManagement.reducer';
import roleManagementReducer from '@/app/modules/cms-config/role/RoleManagement.reducer';
import roleActionManagementReducer from '@/app/modules/cms-config/role-action/RoleActionManagement.reducer';
import accessManagementReducer from '@/app/modules/cms-config/access-log-management/AccessManagement.reducer';
import eventKafkaManagementReducer from '@/app/modules/cms-config/event-kafka-log-management/EventKafkaManagement.reducer';
import codeFromBankManagementReducer from '@/app/modules/code-from-bank-management/CodeFromBankManagement.reducer';
import scrapingManagementReducer from '@/app/modules/cms-config/scraping-log-management/ScrapingLogManagement.reducer';

//Them moi
import majorManagementReducer from '@/app/modules/admin/major/MajorManagement.reducer';
import admissionPeriodManagementReducer from '@/app/modules/admin/admission-period/AdmissionPeriod.reducer';
import periodAssignmentManagementReducer from '@/app/modules/admin/period-assignment/PeriodAssignment.reducer';
import instructorMapPeriodAssignment from '@/app/modules/admin/instructor-map-period-assignment/InstructorMapPeriodAssignment.reducer';
import studentMapInstructor from '@/app/modules/admin/student-map-instructor/StudentMapInstructor.reducer';
import assignmentStudentRegister from '@/app/modules/admin/assignment-student-register/AssignmentStudentRegister.reducer';
const rootReducer = {
  authentication,
  loadingBar,
  layout,
  tabAction,
  payerGroupSelect,
  bankCodeManagementReducer,
  actionManagementReducer,
  callbackUrlManagementReducer,
  clientGatewayManagementReducer,
  clientGatewayMapManagementReducer,
  clientCallbackManagementReducer,
  cmsAppUrlManagementReducer,
  gatewayApiManagementReducer,
  menuManagementReducer,
  menuGroupManagementReducer,
  roleManagementReducer,
  roleActionManagementReducer,
  accessManagementReducer,
  eventKafkaManagementReducer,
  codeFromBankManagementReducer,
  scrapingManagementReducer

  ,majorManagementReducer
  ,admissionPeriodManagementReducer
  ,periodAssignmentManagementReducer
  ,instructorMapPeriodAssignment
  ,studentMapInstructor
  ,assignmentStudentRegister
};

export default rootReducer;
