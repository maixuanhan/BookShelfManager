import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text, Button, Icon } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const FacebookIcon = (props: any) => (
  <Icon name='facebook' {...props} />
);

const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
);

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>HOME</Text>
    <LoginButton></LoginButton>
  </Layout>
);

const App = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </>
  );
};

export default App;
