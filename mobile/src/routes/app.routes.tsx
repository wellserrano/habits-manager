import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Habit } from '../screens/Habit';
import { Home } from '../screens/Home';
import { New } from '../screens/New';


export function AppRoutes() {
  return (
    <Navigator>
      <Screen name="new" component={ New }/>
      <Screen name="home" component={ Home }/>
      <Screen name="habit" component={ Habit }/>
    </Navigator>
  )
}