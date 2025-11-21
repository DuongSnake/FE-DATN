import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';
import layout from '../layout/layout.reducer';
import authentication from './authentication';
import tabAction from '../layout/tab/tabs.reducer';
import payerGroupSelect from '../../modules/common/selector/PayerGroupSelect.reducer';
import bankCodeManagementReducer from '@/app/modules/bank-code-management/BankCodeManagement.reducer';
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
import roleKeycloakManagementReducer from '@/app/modules/keycloak-authorization/role/RoleManagement.reducer';
import userKeycloakManagementReducer from '@/app/modules/keycloak-authorization/user/UserManagement.reducer';
import userMapRoleKeycloakManagementReducer from '@/app/modules/keycloak-authorization/user-map-role/UserMapRoleManagement.reducer';
import resourceKeycloakManagementReducer from '@/app/modules/keycloak-authorization/resource/ResourceManagement.reducer';
import policyKeycloakManagementReducer from '@/app/modules/keycloak-authorization/policy/PolicyManagement.reducer';
import permissionKeycloakManagementReducer from '@/app/modules/keycloak-authorization/permission/PermissionManagement.reducer';
import scrapingManagementReducer from '@/app/modules/cms-config/scraping-log-management/ScrapingLogManagement.reducer';

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
  roleKeycloakManagementReducer,
  userKeycloakManagementReducer,
  userMapRoleKeycloakManagementReducer,
  resourceKeycloakManagementReducer,
  policyKeycloakManagementReducer,
  permissionKeycloakManagementReducer,
  scrapingManagementReducer
};

export default rootReducer;
