import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";

import { SplashView } from "./SplashView";
import { RootStackNavigation } from "./navigations/RootStackNavigation";

export const RootApp: React.FC = () => {
  const [initialize, setInitialize] = useState(false);

  if (!initialize) {
    return <SplashView onFinishLoad={() => setInitialize(true)} />;
  }

  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
};
