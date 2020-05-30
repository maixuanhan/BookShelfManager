import { AppRegistry } from 'react-native';
import { Application } from './src/components/application.component';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Application);
