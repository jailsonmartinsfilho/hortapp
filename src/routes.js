import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import Search from './pages/Search/Search';
import Garden from './pages/Garden/Garden';
import Profile from './pages/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function Routes() {
    const renderizarIcone = (nomeDoIcone) => ({ color, size }) => <Ionicons name={nomeDoIcone} size={size} color={color} />;

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'green', tabBarShowLabel: false, tabBarStyle: {
                position: 'absolute', backgroundColor: '#171626', borderTopWidth: 0,
                bottom: 14, left: 14, right: 14, elevation: 0, borderRadius: 30, height: 70
            }}}>

            <Tab.Screen name="Search" component={Search} options={{ headerShown: false, tabBarIcon: renderizarIcone("search-outline")}}/>
            <Tab.Screen name="Garden" component={Garden} options={{ headerShown: false, tabBarIcon: renderizarIcone("leaf-outline")}}/>
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: renderizarIcone("person-outline")}}/>
        </Tab.Navigator>
    );
}