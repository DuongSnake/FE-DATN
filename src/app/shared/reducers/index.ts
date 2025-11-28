import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import layout from '../layout/layout.reducer';
import authentication from './authentication';
import tabAction from '../layout/tab/tabs.reducer';
import payerGroupSelect from '../../modules/common/selector/PayerGroupSelect.reducer';
import userManagement from '@/app/modules/admin/user-management/UserManagement.reducer';
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
  payerGroupSelect
  ,userManagement
  ,majorManagementReducer
  ,admissionPeriodManagementReducer
  ,periodAssignmentManagementReducer
  ,instructorMapPeriodAssignment
  ,studentMapInstructor
  ,assignmentStudentRegister
};

export default rootReducer;
