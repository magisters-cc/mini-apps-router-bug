import { FC } from 'react';
import { Button, Div, NavIdProps, Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { DEFAULT_VIEW_PANELS } from '../routes';

export const Game: FC<NavIdProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const params = useParams({ panel: DEFAULT_VIEW_PANELS.GAME });
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Game
      </PanelHeader>
      <Placeholder>
        <Div>
          <pre>{JSON.stringify(params, null, 2)}</pre>
        </Div>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('/quests')}>
            В задания
          </Button>
        </Div>
      </Placeholder>
    </Panel>
  );
};
