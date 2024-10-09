import React from 'react'
import { Tabs } from 'expo-router'
import { View } from 'react-native'
import Colors from '@/src/constants/Colors'
import { MagnifyingGlass, Plant, User } from 'phosphor-react-native';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle:
        { backgroundColor: 'white', position: 'absolute', justifyContent: 'center', alignSelf: 'center', height: 63 },
      tabBarShowLabel: false, tabBarInactiveTintColor: '#999', tabBarActiveTintColor: Colors.white
    }}>
      <Tabs.Screen name="index" options={{
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
          <View style={{ padding: 12, borderRadius: 30, backgroundColor: focused ? Colors.white : Colors.white }}>
            <MagnifyingGlass size={20} color={focused ? Colors.golden : Colors.gray} />
          </View>
        ),
      }} />

      <Tabs.Screen name="garden" options={{
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
          <View style={{ padding: 12, borderRadius: 30, backgroundColor: focused ? Colors.white : Colors.white }}>
            <Plant size={20} color={focused ? Colors.golden : Colors.gray} />
          </View>
        ),
      }} />

      <Tabs.Screen name="profile" options={{
        tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean; }) => (
          <View style={{ padding: 12, borderRadius: 30, backgroundColor: focused ? Colors.white : Colors.white }}>
            <User size={20} color={focused ? Colors.golden : Colors.gray} />
          </View>
        ),
      }} />

    </Tabs>
  )
}