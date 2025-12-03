export const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const PRE_FIX_AUTH = '/api/auth/';
const PRE_FIX_USER = '/user/v1/';
const PRE_FIX_API = '/api/v1/';

export const API_GET_LIST_MANAGER = PRE_FIX_API + 'user/manager/find';
export const API_DELETE_USER = PRE_FIX_API + 'user';
export const API_GET_LIST_RESIDENT = PRE_FIX_API + 'user/resident/find';
export const APT_POST_UPDATE_SITE_ASSIGNMENT = PRE_FIX_API + 'siteAssignment';

/**
 * Login and extend
 */
export const APT_POST_SIGNIN = PRE_FIX_AUTH + 'login';
export const API_EXTEND_TOKEN = PRE_FIX_AUTH + 'extend';
export const API_CHANGE_PASSWORD = PRE_FIX_USER + 'changePassword';
export const API_CHANGE_LOGIN_PASSWORD = PRE_FIX_USER + 'changeLoginPassword';
export const API_FORGOT_PASSWORD = PRE_FIX_AUTH + 'forgotPassword';
export const API_CHECK_RESET_CODE = PRE_FIX_AUTH + 'checkResetCode';
export const API_RESET_PASSWORD = PRE_FIX_AUTH + 'resetPassword';
export const APT_POST_MENULIST = PRE_FIX_API + 'Authen/listMenus';
export const API_POST_EXPIRE_PASSWORD = PRE_FIX_AUTH + 'expirePassword';

/**
 * Setting payer group management
 */
export const API_GET_LIST_GROUP = PRE_FIX_API + 'A002/selectList';
export const API_GENERAL_INFORMATION_SELECT = PRE_FIX_API + 'C001/selectList';

/**
 * User Management
 */
export const API_GET_LIST_USER_ACCOUNT = PRE_FIX_API + 'user/selectList';
export const API_ADD_USER_ACCOUNT = PRE_FIX_API + 'user/insert';
export const API_UPDATE_USER_ACCOUNT = PRE_FIX_API + 'user/update';
export const API_DELETE_USER_ACCOUNT = PRE_FIX_API + 'user/delete';
export const API_SELECT_USER_ACCOUNT = PRE_FIX_API + 'user/select';
export const API_SELECT_ALL_USER_ACCOUNT = PRE_FIX_API + 'user/selectAll';
export const API_SELECT_ALL_ROLE = PRE_FIX_API + 'user/selectAllRole';
export const API_SELECT_ALL_INSTRUCTOR_ACTIVE = PRE_FIX_API + 'user/selectAllInstructor';
export const API_SELECT_ALL_STUDENT_ACTIVE = PRE_FIX_API + 'user/selectAllStudent';

/**
 * Major Management
 */
export const API_GET_LIST_MAJOR = PRE_FIX_API + 'major/selectList';
export const API_ADD_MAJOR = PRE_FIX_API + 'major/insert';
export const API_UPDATE_MAJOR = PRE_FIX_API + 'major/update';
export const API_DELETE_MAJOR = PRE_FIX_API + 'major/delete';
export const API_SELECT_MAJOR = PRE_FIX_API + 'major/select';
export const API_GET_ALL_SELECT_MAJOR_ACITVE = PRE_FIX_API + 'major/selectListAllActive';

/**
 * Admission Period Management
 */
export const API_GET_LIST_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/selectList';
export const API_ADD_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/insert';
export const API_UPDATE_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/update';
export const API_DELETE_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/delete';
export const API_SELECT_ADMISSION_PERIOD = PRE_FIX_API + 'admissionPeriod/select';
export const API_GET_ALL_SELECT_ADMISSION_PERIOD_ACITVE = PRE_FIX_API + 'admissionPeriod/selectListAllActive';

/**
 * Period Assignment Management
 */
export const API_GET_LIST_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/selectList';
export const API_ADD_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/insert';
export const API_UPDATE_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/update';
export const API_DELETE_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/delete';
export const API_SELECT_PERIOD_ASSIGNMENT = PRE_FIX_API + 'periodAssignment/select';
export const API_GET_ALL_PERIOD_ASSIGNMENT_ACITVE = PRE_FIX_API + 'periodAssignment/selectListAllActive';

/**
 * Instructor Map Period Assignment Management
 */
export const API_GET_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/selectList';
export const API_ADD_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/insert';
export const API_UPDATE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/update';
export const API_DELETE_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/delete';
export const API_SELECT_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/select';
export const API_INSERT_LIST_INSTRUCTOR_MAP_PERIOD_ASSIGNMENT = PRE_FIX_API + 'instructorMapPeriodAssignment/insertListInstructorMapPeriodAssignment';

/**
 * Student map Instructor Management
 */
export const API_GET_LIST_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/selectList';
export const API_ADD_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/insert';
export const API_UPDATE_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/update';
export const API_DELETE_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/delete';
export const API_SELECT_STUDENT_MAP_INSTRUCTOR = PRE_FIX_API + 'studentMapInstructor/select';
export const API_GET_ALL_STUDENT_MAP_INSTRUCTOR_ACTIVE = PRE_FIX_API + 'studentMapInstructor/selectListAllActive';

/**
 * Assignment Student Register Management(cai nay sau se bo)
 */
export const API_GET_LIST_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/selectList';
export const API_ADD_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/update';
export const API_DELETE_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_REGISTER = PRE_FIX_API + 'assignmentStudentRegister/select';

/**
 * Student side
 */
export const API_GET_LIST_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/selectList';
export const API_ADD_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/insert';
export const API_UPDATE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/update';
export const API_DELETE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/delete';
export const API_SELECT_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/select';
export const API_RESERVE_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/reserveListAssignment';
export const API_SEND_REQUEST_ASSIGNMENT_STUDENT_USER_SIDE = PRE_FIX_API + 'assignmentRegister/sendRequestAssignment';
