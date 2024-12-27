import { useState, useEffect, ReactNode } from 'react';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import { Quests, Game, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME, panelsHistory } = useActiveVkuiLocation();
  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner size="large" />);
  const router = useRouteNavigator();

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      setUser(user);
      setPopout(null);
    }
    fetchData();
  }, []);

  useEffect(() => {
    bridge.send("VKWebAppInit");
    bridge.send(
      panelsHistory.length > 1
        ? "VKWebAppDisableSwipeBack"
        : "VKWebAppEnableSwipeBack"
    );
  }, [panelsHistory]);

  return (
    <SplitLayout popout={popout}>
      <SplitCol>
        <View activePanel={activePanel} history={panelsHistory} onSwipeBack={() => router.back()}>
          <Home id={DEFAULT_VIEW_PANELS.HOME} fetchedUser={fetchedUser} />
          <Game id={DEFAULT_VIEW_PANELS.GAME} />
          <Quests id={DEFAULT_VIEW_PANELS.QUESTS} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
