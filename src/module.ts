import {
  coreServices,
  createBackendModule,
} from '@backstage/backend-plugin-api';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node/alpha';
import {
  AddRepoToCodacyAction,
} from './actions/codacy';
//import { ScmIntegrations } from '@backstage/integration';

export const scaffolderModuleCodacy = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'codacy',
  register(reg) {
    reg.registerInit({
      deps: {
        logger: coreServices.logger, scaffolder: scaffolderActionsExtensionPoint,
        config: coreServices.rootConfig,
      },
      async init({ logger, scaffolder, config }) {
        logger.info('Registering AddRepoToCodacyAction');
        //const integrations = ScmIntegrations.fromConfig(config);
        scaffolder.addActions(AddRepoToCodacyAction({ config }))
      },
    });
  },
});
