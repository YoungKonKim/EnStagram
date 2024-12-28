import { useSelector } from "react-redux";
import { RootReducer } from "../store";
import { FeedInfo } from "../@types/FeedInfo";
import { UserInfo } from "../@types/UserInfo";

export const useMyInfo = () =>
  useSelector<RootReducer, UserInfo | null>((state) => state.userInfo.userInfo);

export const usetMyFeedList = () =>
  useSelector<RootReducer, FeedInfo[]>((state) => {
    return state.userInfo.myFeedList;
  });
