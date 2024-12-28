import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { FeedInfo } from "../@types/FeedInfo";
import { RootReducer } from "../store";
import { sleep } from "../utils/utils";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST" as const;
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS" as const;
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE" as const;

export const CREATE_FEED_REQUEST = "CREATE_FEED_REQUEST" as const;
export const CREATE_FEED_SUCCESS = "CREATE_FEED_SUCCESS" as const;
export const CREATE_FEED_FAILURE = "CREATE_FEED_FAILURE" as const;

export const FAVORITE_FEED_REQUEST = "FAVORITE_FEED_REQUEST" as const;
export const FAVORITE_FEED_SUCCESS = "FAVORITE_FEED_SUCCESS" as const;
export const FAVORITE_FEED_FAILURE = "FAVORITE_FEED_FAILURE" as const;

export const getFeedListRequest = () => {
  return {
    type: GET_FEED_LIST_REQUEST,
  };
};
export const getFeedListSuccess = (list: FeedInfo[]) => {
  return {
    type: GET_FEED_LIST_SUCCESS,
    list,
  };
};

export const getFeedListFailure = () => {
  return {
    type: GET_FEED_LIST_FAILURE,
  };
};

export const createFeedRequest = () => {
  return {
    type: CREATE_FEED_REQUEST,
  };
};

export const createFeedSuccess = (item: FeedInfo) => {
  return {
    type: CREATE_FEED_SUCCESS,
    item: item,
  };
};

export const createFeedFailure = () => {
  return {
    type: CREATE_FEED_FAILURE,
  };
};

export const favoriteFeedRequest = () => {
  return {
    type: FAVORITE_FEED_REQUEST,
  };
};
export const favoriteFeedSuccess = (
  feedId: FeedInfo["id"],
  myId: string,
  action: "add" | "del"
) => {
  return {
    type: FAVORITE_FEED_SUCCESS,
    feedId,
    myId,
    action,
  };
};

export const favoriteFeedFailure = () => {
  return {
    type: FAVORITE_FEED_FAILURE,
  };
};

export const getFeedList = (): FeedListThunkAction => async (dispatch) => {
  dispatch(getFeedListRequest());

  await sleep(2000);

  dispatch(
    getFeedListSuccess([
      {
        id: "ID_01",
        content: "CONTENT_01",
        writer: {
          uid: "WRITER_01",
          name: "WRITER_NAME_01",
        },
        imageUrl:
          "https://docs.expo.dev/static/images/tutorial/background-image.png",
        likeHistory: ["WRITER_01"],
        createdAt: "2021-09-01",
      },
      {
        id: "ID_02",
        content: "CONTENT_02",
        writer: {
          name: "WRITER_02",
          uid: "WRITER_02",
        },
        imageUrl:
          "https://docs.expo.dev/static/images/tutorial/background-image.png",
        likeHistory: ["WRITER_02"],
        createdAt: "2021-09-02",
      },
      {
        id: "ID_03",
        content: "CONTENT_03",
        writer: {
          name: "WRITER_03",
          uid: "WRITER_03",
        },
        imageUrl:
          "https://docs.expo.dev/static/images/tutorial/background-image.png",
        likeHistory: ["WRITER_03"],
        createdAt: "2021-09-03",
      },
    ])
  );
};

export const createFeed =
  (
    item: Omit<FeedInfo, "id" | "writer" | "likeHistory">
  ): FeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(createFeedRequest());

    const createdAt = new Date().getTime();

    await sleep(200);

    dispatch(
      createFeedSuccess({
        id: "ID_001",
        content: item.content,
        writer: {
          name: getState().userInfo.userInfo?.name ?? "Unknown",
          uid: getState().userInfo.userInfo?.uid ?? "Unknown",
        },
        imageUrl: item.imageUrl,
        likeHistory: [],
        createdAt: createdAt.toString(),
      })
    );
  };

export const favoriteFeed =
  (item: FeedInfo): FeedListThunkAction =>
  async (dispatch, getState) => {
    dispatch(favoriteFeedRequest());

    const myId = getState().userInfo.userInfo?.uid || null;

    if (myId === null) {
      dispatch(favoriteFeedFailure());
      return;
    }

    const hasMyId =
      item.likeHistory.filter((linkUserId) => linkUserId === myId).length > 0;

    await sleep(1000);

    if (hasMyId) {
      // 있을경우엔 빼는 액션
      dispatch(favoriteFeedSuccess(item.id, myId, "del"));
    } else {
      // 없을경우엔 추가하는 액션
      dispatch(favoriteFeedSuccess(item.id, myId, "add"));
    }
  };

export type FeedListThunkAction = ThunkAction<
  void,
  RootReducer,
  undefined,
  FeedListActions
>;
export type TypeFeedListDispatch = ThunkDispatch<
  RootReducer,
  undefined,
  FeedListActions
>;
export type FeedListActions =
  | ReturnType<typeof getFeedListSuccess>
  | ReturnType<typeof getFeedListRequest>
  | ReturnType<typeof getFeedListFailure>
  | ReturnType<typeof createFeedRequest>
  | ReturnType<typeof createFeedSuccess>
  | ReturnType<typeof createFeedFailure>
  | ReturnType<typeof favoriteFeedRequest>
  | ReturnType<typeof favoriteFeedSuccess>
  | ReturnType<typeof favoriteFeedFailure>;
