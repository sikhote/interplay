import { Ionicons } from '@expo/vector-icons';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./public/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (error) {
        // We might want to provide this error information to an error reporting service
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tabBarInfoText}>This is</Text>
      <Text style={styles.tabBarInfoText}>This sdsdsdsd</Text>
      <Text style={styles.tabBarInfoText}>This sdsdsdsd!!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
