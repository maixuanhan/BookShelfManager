import { AppRegistry } from 'react-native';
import { Application } from './src/components/application.component';
import { name as appName } from './app.json';
import { init as InitializeDbConnection } from './src/database';

InitializeDbConnection()
    .then(conn => { console.log("Connected to the database", conn); })
    .catch(e => { console.log("Error occurred", e); });
AppRegistry.registerComponent(appName, () => Application);
