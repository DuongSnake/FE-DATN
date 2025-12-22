import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import layout from '../layout/layout.reducer';
import authentication from './authentication';
import tabAction from '../layout/tab/tabs.reducer';
import payerGroupSelect from '../../modules/common/selector/PayerGroupSelect.reducer';
//ADmin API
import userManagement from '@/app/modules/admin-side/user-management/UserManagement.reducer';
import majorManagementReducer from '@/app/modules/admin-side/major/MajorManagement.reducer';
import admissionPeriodManagementReducer from '@/app/modules/admin-side/admission-period/AdmissionPeriod.reducer';
import periodAssignmentManagementReducer from '@/app/modules/admin-side/period-assignment/PeriodAssignment.reducer';
import instructorMapPeriodAssignment from '@/app/modules/admin-side/instructor-map-period-assignment/InstructorMapPeriodAssignment.reducer';
import studentMapInstructor from '@/app/modules/admin-side/student-map-instructor/StudentMapInstructor.reducer';
import assignmentStudentRegister from '@/app/modules/admin-side/assignment-student-register/AssignmentStudentRegister.reducer';
import scoreAssignement from '@/app/modules/admin-side/score-assignment/ScoreAssignment.reducer';
//Student API
import registerAssignmentStudent from '@/app/modules/user-side/student-side/register-assignment-student/RegisterAssignmentStudent.reducer';
import fileUploadAssignmentApprove from '@/app/modules/user-side/student-side/file-upload-assignment-approve/FileUploadAssignmentApprove.reducer';

//Instructor API

//Phan bien API
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
  ,registerAssignmentStudent
  ,fileUploadAssignmentApprove
  ,scoreAssignement
};

export default rootReducer;
