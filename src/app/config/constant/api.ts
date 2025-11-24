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
 * Bank code Management
 */
export const API_GET_LIST_USER_ACCOUNT = PRE_FIX_API + 'user/selectList';
export const API_ADD_USER_ACCOUNT = PRE_FIX_API + 'user/insert';
export const API_UPDATE_USER_ACCOUNT = PRE_FIX_API + 'user/update';
export const API_DELETE_USER_ACCOUNT = PRE_FIX_API + 'user/delete';
export const API_SELECT_USER_ACCOUNT = PRE_FIX_API + 'user/select';
export const API_SELECT_ALL_USER_ACCOUNT = PRE_FIX_API + 'user/selectAll';
export const API_SELECT_ALL_ROLE = PRE_FIX_API + 'user/selectAllRole';

/**
 * Action management
 */
export const API_ACTION_SELECTELIST = PRE_FIX_API + 'action/selectList';
export const API_ACTION_SELECT = PRE_FIX_API + 'action/select';
export const API_ACTION_INSERT = PRE_FIX_API + 'action/insert';
export const API_ACTION_UPDATE = PRE_FIX_API + 'action/update';
export const API_ACTION_DELETE = PRE_FIX_API + 'action/delete';

/**
 * Callback url management
 */
export const API_CALL_BACK_URL_SELECTELIST = PRE_FIX_API + 'callBackUrl/selectList';
export const API_CALL_BACK_URL_SELECT = PRE_FIX_API + 'callBackUrl/select';
export const API_CALL_BACK_URL_INSERT = PRE_FIX_API + 'callBackUrl/insert';
export const API_CALL_BACK_URL_UPDATE = PRE_FIX_API + 'callBackUrl/update';
export const API_CALL_BACK_URL_DELETE = PRE_FIX_API + 'callBackUrl/delete';

/**
 * Client gateway management
 */
export const API_CLIENT_GATEWAY_SELECTELIST = PRE_FIX_API + 'clientGw/selectList';
export const API_CLIENT_GATEWAY_SELECT = PRE_FIX_API + 'clientGw/select';
export const API_CLIENT_GATEWAY_INSERT = PRE_FIX_API + 'clientGw/insert';
export const API_CLIENT_GATEWAY_UPDATE = PRE_FIX_API + 'clientGw/update';
export const API_CLIENT_GATEWAY_DELETE = PRE_FIX_API + 'clientGw/delete';

/**
 * Client gateway map managementEDCS
 */
export const API_CLIENT_GATEWAY_MAP_SELECTELIST = PRE_FIX_API + 'clientGwMap/selectList';
export const API_CLIENT_GATEWAY_MAP_SELECT = PRE_FIX_API + 'clientGwMap/select';
export const API_CLIENT_GATEWAY_MAP_INSERT = PRE_FIX_API + 'clientGwMap/insert';
export const API_CLIENT_GATEWAY_MAP_UPDATE = PRE_FIX_API + 'clientGwMap/update';
export const API_CLIENT_GATEWAY_MAP_DELETE = PRE_FIX_API + 'clientGwMap/delete';

/**
 * Client Callback managementEDCS
 */
export const API_CLIENT_CALLBACK_SELECTELIST = PRE_FIX_API + 'mgmtClientCallback/selectList';
export const API_CLIENT_CALLBACK_SELECT = PRE_FIX_API + 'mgmtClientCallback/select';
export const API_CLIENT_CALLBACK_INSERT = PRE_FIX_API + 'mgmtClientCallback/insert';
export const API_CLIENT_CALLBACK_UPDATE = PRE_FIX_API + 'mgmtClientCallback/update';
export const API_CLIENT_CALLBACK_DELETE = PRE_FIX_API + 'mgmtClientCallback/delete';

/**
 * CMS app url
 */
export const API_CMS_APP_URL_SELECTELIST = PRE_FIX_API + 'cmsAppUrl/selectList';
export const CMS_APP_URL_SELECT = PRE_FIX_API + 'cmsAppUrl/select';
export const CMS_APP_URL_INSERT = PRE_FIX_API + 'cmsAppUrl/insert';
export const CMS_APP_URL_UPDATE = PRE_FIX_API + 'cmsAppUrl/update';
export const CMS_APP_URL_DELETE = PRE_FIX_API + 'cmsAppUrl/delete';

/**
 * Client gateway map managementEDCS
 */
export const API_GATEWAY_API_SELECTELIST = PRE_FIX_API + 'gatewayApi/selectList';
export const API_GATEWAY_API_SELECT = PRE_FIX_API + 'gatewayApi/select';
export const API_GATEWAY_API_INSERT = PRE_FIX_API + 'gatewayApi/insert';
export const API_GATEWAY_API_UPDATE = PRE_FIX_API + 'gatewayApi/update';
export const API_GATEWAY_API_DELETE = PRE_FIX_API + 'gatewayApi/delete';


/**
 * Menu
 */
export const CMS_MENU_SELECTELIST = PRE_FIX_API + 'menu/selectList';
export const CMS_MENU_SELECT = PRE_FIX_API + 'menu/select';
export const CMS_MENU_INSERT = PRE_FIX_API + 'menu/insert';
export const CMS_MENU_UPDATE = PRE_FIX_API + 'menu/update';
export const CMS_MENU_DELETE = PRE_FIX_API + 'menu/delete';

/**
 * Menu group
 */
export const CMS_MENU_GROUP_SELECTELIST = PRE_FIX_API + 'menuGroup/selectList';
export const CMS_MENU_GROUP_SELECT = PRE_FIX_API + 'menuGroup/select';
export const CMS_MENU_GROUP_INSERT = PRE_FIX_API + 'menuGroup/insert';
export const CMS_MENU_GROUP_UPDATE = PRE_FIX_API + 'menuGroup/update';
export const CMS_MENU_GROUP_DELETE = PRE_FIX_API + 'menuGroup/delete';

/**
 * Role
 */
export const CMS_ROLE_SELECTELIST = PRE_FIX_API + 'role/selectList';
export const CMS_ROLE_SELECT = PRE_FIX_API + 'role/select';
export const CMS_ROLE_INSERT = PRE_FIX_API + 'role/insert';
export const CMS_ROLE_UPDATE = PRE_FIX_API + 'role/update';
export const CMS_ROLE_DELETE = PRE_FIX_API + 'role/delete';


/**
 * Role action
 */
export const CMS_ROLE_ACTION_SELECTELIST = PRE_FIX_API + 'roleAction/selectList';
export const CMS_ROLE_ACTION_SELECT = PRE_FIX_API + 'roleAction/select';
export const CMS_ROLE_ACTION_INSERT = PRE_FIX_API + 'roleAction/insert';
export const CMS_ROLE_ACTION_UPDATE = PRE_FIX_API + 'roleAction/update';
export const CMS_ROLE_ACTION_DELETE = PRE_FIX_API + 'roleAction/delete';


/**
 * Access log
 */
export const CMS_ACCESS_LOG_SELECTELIST = PRE_FIX_API + 'accessLog/selectList2';
export const CMS_ACCESS_LOG_SELECT = PRE_FIX_API + 'accessLog/select';


/**
 * Event kafka log
 */
export const CMS_EVENT_KAFKA_SELECTELIST = PRE_FIX_API + 'eventKafka/selectList2';
export const CMS_EVENT_KAFKA_SELECT = PRE_FIX_API + 'eventKafka/select';
export const CMS_EVENT_KAFKA_RE_SEND_MESSAGE_FAIL = PRE_FIX_API + 'eventKafka/reSendMessageFail';
/**
 * Scraping log
 */
export const CMS_SCAPING_SELECTELIST = PRE_FIX_API + 'scrapingLog/selectList';


/**
 * Code From Bank
 */
export const CMS_CODE_FROM_BANK_SELECTELIST = PRE_FIX_API + 'codeFromBank/selectList';
export const CMS_CODE_FROM_BANK_SELECT = PRE_FIX_API + 'codeFromBank/select';
export const CMS_CODE_FROM_BANK_INSERT = PRE_FIX_API + 'codeFromBank/insert';
export const CMS_CODE_FROM_BANK_UPDATE = PRE_FIX_API + 'codeFromBank/update';
export const CMS_CODE_FROM_BANK_DELETE = PRE_FIX_API + 'codeFromBank/delete';


/**
 * Keycloak role
 */
export const CMS_KEYCLOAK_ROLE_SELECTELIST = PRE_FIX_API + 'keycloack/role/selectList';
export const CMS_KEYCLOAK_ROLE_SELECT = PRE_FIX_API + 'keycloack/role/select';
export const CMS_KEYCLOAK_ROLE_INSERT = PRE_FIX_API + 'keycloack/role/insert';
export const CMS_KEYCLOAK_ROLE_UPDATE = PRE_FIX_API + 'keycloack/role/update';
export const CMS_KEYCLOAK_ROLE_DELETE = PRE_FIX_API + 'keycloack/role/delete';
export const CMS_KEYCLOAK_ROLE_MAPPING = PRE_FIX_API + 'keycloack/role/roleMapping';
export const CMS_KEYCLOAK_ROLE_UN_MAPPING = PRE_FIX_API + 'keycloack/role/unAssignRole';

/**
 * Keycloak user
 */
export const CMS_KEYCLOAK_USER_SELECTELIST = PRE_FIX_API + 'keycloack/user/selectList';
export const CMS_KEYCLOAK_USER_SELECT = PRE_FIX_API + 'keycloack/user/select';
export const CMS_KEYCLOAK_USER_INSERT = PRE_FIX_API + 'keycloack/user/insert';
export const CMS_KEYCLOAK_USER_UPDATE = PRE_FIX_API + 'keycloack/user/update';
export const CMS_KEYCLOAK_USER_DELETE = PRE_FIX_API + 'keycloack/user/delete';
export const CMS_KEYCLOAK_USER_BY_USER_ID = PRE_FIX_API + 'keycloack/role/selectListByUserId';
export const CMS_KEYCLOAK_USER_RESET_PASSWORD = PRE_FIX_API + 'keycloack/user/resetPassword';

/**
 * Keycloak resource
 */
export const CMS_KEYCLOAK_RESOURCE_SELECTELIST = PRE_FIX_API + 'keycloack/resource/selectList';
export const CMS_KEYCLOAK_RESOURCE_SELECT = PRE_FIX_API + 'keycloack/resource/select';
export const CMS_KEYCLOAK_RESOURCE_INSERT = PRE_FIX_API + 'keycloack/resource/insert';
export const CMS_KEYCLOAK_RESOURCE_UPDATE = PRE_FIX_API + 'keycloack/resource/update';
export const CMS_KEYCLOAK_RESOURCE_DELETE = PRE_FIX_API + 'keycloack/resource/delete';

/**
 * Keycloak policy
 */
export const CMS_KEYCLOAK_POLICY_SELECTELIST = PRE_FIX_API + 'keycloack/policy/selectList';
export const CMS_KEYCLOAK_POLICY_SELECT = PRE_FIX_API + 'keycloack/policy/select';
export const CMS_KEYCLOAK_POLICY_INSERT = PRE_FIX_API + 'keycloack/policy/insert';
export const CMS_KEYCLOAK_POLICY_UPDATE = PRE_FIX_API + 'keycloack/policy/update';
export const CMS_KEYCLOAK_POLICY_DELETE = PRE_FIX_API + 'keycloack/policy/delete';

/**
 * Keycloak permission
 */
export const CMS_KEYCLOAK_PERMISSION_SELECTELIST = PRE_FIX_API + 'keycloack/permission/selectList';
export const CMS_KEYCLOAK_PERMISSION_SELECT = PRE_FIX_API + 'keycloack/permission/select';
export const CMS_KEYCLOAK_PERMISSION_INSERT = PRE_FIX_API + 'keycloack/permission/insert';
export const CMS_KEYCLOAK_PERMISSION_UPDATE = PRE_FIX_API + 'keycloack/permission/update';
export const CMS_KEYCLOAK_PERMISSION_DELETE = PRE_FIX_API + 'keycloack/permission/delete';
export const CMS_KEYCLOAK_PERMISSION_FIND_RESOURCE = PRE_FIX_API + 'keycloack/permission/findResourceByPermissionId';
export const CMS_KEYCLOAK_PERMISSION_FIND_POLICY = PRE_FIX_API + 'keycloack/permission/findAssociatedPolicies';
