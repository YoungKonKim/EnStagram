import React from "react";
import { FlatList, View } from "react-native";
import { Header } from "../components/Header/Header";
import { FeedListItem } from "../components/FeedListItem";
import { Spacer } from "../components/Spacer";
import {
  useRootNavigation,
  useRootRoute,
} from "../navigations/RootStackNavigation";

export const FeedListScreen: React.FC = () => {
  const route = useRootRoute<"FeedList">();
  const navigation = useRootNavigation<"FeedList">();

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Feed List" />
        <Header.Icon
          iconName="close"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Header>

      <FlatList
        data={route.params.list}
        renderItem={({ item }) => {
          return (
            <FeedListItem
              image={item.imageUrl}
              writer={item.writer.name}
              likeCount={item.likeHistory.length}
              comment={item.content}
              onPressFeed={() => {
                console.log("onPressFeed");
              }}
            ></FeedListItem>
          );
        }}
        ItemSeparatorComponent={() => <Spacer space={24} />}
      />
    </View>
  );
};
