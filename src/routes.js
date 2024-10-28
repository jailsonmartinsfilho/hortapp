import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Search from './pages/Search/Search';
import Garden from './pages/Garden/Garden';
import Profile from './pages/Profile/Profile';
import DetalhePlanta from './pages/DetalhePlanta/DetalhePlanta';
import DetalhesCultivo from './pages/DetalhesCultivo/DetalhesCultivo';
import Cadastro from './pages/Cadastro/Cadastro';
import Login from './pages/Login/Login';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SearchStack = createStackNavigator();

function SearchStackScreen() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <SearchStack.Screen name="DetalhePlanta" component={DetalhePlanta} options={{ headerShown: false }} />
            <SearchStack.Screen name="DetalhesCultivo" component={DetalhesCultivo} options={{ headerShown: false }} />
        </SearchStack.Navigator>
    );
}

function TabRoutes() {
    const renderizarIcone = (nomeDoIcone) => ({ color, size }) => (
        <Ionicons name={nomeDoIcone} size={size} color={color} />
    );

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'green', tabBarShowLabel: false, tabBarStyle:
            {
                position: 'absolute', backgroundColor: '#171626', borderTopWidth: 0, elevation: 0, height: 70,
            }
        }}>
            <Tab.Screen name="SearchTab" component={SearchStackScreen} options={{ headerShown: false, tabBarIcon: renderizarIcone('search-outline') }} />
            <Tab.Screen name="Garden" component={Garden} options={{ headerShown: false, tabBarIcon: renderizarIcone('leaf-outline') }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: renderizarIcone('person-outline') }} />
        </Tab.Navigator>
    );
}

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="Cadastro">
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="TabRoutes" component={TabRoutes} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
