import {
  createTemplateAction,
} from '@backstage/plugin-scaffolder-node';
import { Config } from '@backstage/config';

export const AddRepoToCodacyAction = (options: { config: Config }) => {
  const { config } = options;
  return createTemplateAction<{
    provider: string;
    owner: string;
    repository: string;
  }>({
    id: 'codacy:add-repo',
    schema: {
      input: {
        provider: 'string',
        owner: 'string',
        repository: 'string'
      }
    },
    async handler(ctx) {
      // Action logic here
      const codacyApiKey = config.getString('codacy.apiKey');
      const { provider, owner, repository } = ctx.input;
      //console.log(`Hello from my action ${JSON.stringify(parameters)}`);
      const response = await fetch('https://app.codacy.com/api/v3/repositories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-token': codacyApiKey,
        },
        body: JSON.stringify({
          'repositoryFullPath': `${owner}/${repository}`,
          'provider': provider
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add repository to Codacy: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Repository added to Codacy:', data);
    },
  });
}