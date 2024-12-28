import React, { useEffect, useMemo } from "react";
import { FlatList, useWindowDimensions, View } from "react-native";
import { Header } from "../components/Header/Header";
import { usetMyFeedList } from "../selectors/user";
import { Button } from "../components/Button";
import { RemoteImage } from "../components/RemoteImage";
import { useRootNavigation } from "../navigations/RootStackNavigation";
import { useDispatch } from "react-redux";
import { getMyFeedList, TypeUserDispatch } from "../actions/user";

export const MyPageScreen: React.FC = () => {
  const data = usetMyFeedList();
  const rootNavigation = useRootNavigation();
  const dispatch = useDispatch<TypeUserDispatch>();
  const { width } = useWindowDimensions();

  const photoSize = useMemo(() => {
    return width / 3;
  }, [width]);

  useEffect(() => {
    dispatch(getMyFeedList());
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="MYPAGE" />
      </Header>

      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View>
              <Button
                onPress={() => {
                  rootNavigation.navigate("FeedList", { list: data });
                }}
              >
                <RemoteImage
                  url={item.imageUrl}
                  width={photoSize}
                  height={photoSize}
                />
              </Button>
            </View>
          );
        }}
      />
    </View>
  );
};
