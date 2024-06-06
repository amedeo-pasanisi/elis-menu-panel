import { PanelPlugin } from '@grafana/data';
import { MenuPanelOptions } from './types';
import { MenuPanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<MenuPanelOptions>(MenuPanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'fetchUrl',
      name: 'Url to fetch dashboards'
    })
    .addTextInput({
      path: 'tags',
      name: 'Tags',
      description: 'If a dashboard is tagged with one of theese tags, a button will appear in the panel'
    })
});
