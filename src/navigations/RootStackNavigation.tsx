import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { AddFeedScreen } from "../screens/AddFeedScreen";
import { BottomTabNavigation } from "./BottomTabNavigation";
import { FeedInfo } from "../@types/FeedInfo";
import { FeedListScreen } from "../screens/FeedListScreen";

export type RootStackParamList = {
  BottomTab: undefined;
  FeedList: {
    list: FeedInfo[];
  };
  AddFeed: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "containedModal",
      }}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigation}
      ></Stack.Screen>
      <Stack.Screen name="AddFeed" component={AddFeedScreen}></Stack.Screen>
      <Stack.Screen name="FeedList" component={FeedListScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export const useRootNavigation = <
  RouteName extends keyof RootStackParamList
>() => {
  return useNavigation<
    NativeStackNavigationProp<RootStackParamList, RouteName>
  >();
};

export const useRootRoute = <RouteName extends keyof RootStackParamList>() => {
  return useRoute<RouteProp<RootStackParamList, RouteName>>();
};
