import React, { useEffect, useRef, useState } from "react"
import RNRestart from "react-native-restart";
import { observer } from "mobx-react-lite"
import { ActivityIndicator, SectionList, TextStyle, ViewStyle } from "react-native"
import { Button, Post, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1
}

const NEXT_BUTTON: ViewStyle = {
  margin: 48,
  marginBottom: 64
}

const DIVIDER: TextStyle = {
  color: color.palette.lightGrey,
  textAlign: "center",
  fontWeight: "normal"
}

export const FeedScreen = observer(function FeedScreen() {
  const [loading, setLoading] = useState(true);
  const [sectionLoading, setSectionLoading] = useState(true);
  const [error, setError] = useState(false);
  const { feedStore, userStore } = useStores();
  const { feed } = feedStore;
  const { user } = userStore;
  const [displayFeed, setDisplayFeed] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(7);
  const listRef = useRef<SectionList>();

  // Delaying load cus some Ignite bloatware somewhere causing recursion errors
  const delayed_setLoading = (val: boolean) => {
    setTimeout(() => {
      setLoading(val);
    }, 500);
  }

  const fetchNewPage = async (page: number, numPosts: number) => {
    setSectionLoading(true);
    setError(false);
    try {
      await feedStore.getFeed(user.id, page, numPosts)
    } catch(e) {
      console.error(e);
      setError(true);
    }
    setDisplayFeed([
      ...displayFeed.filter((item) => {
        return item.page !== "NEXT"
      }), 
      {
        page,
        data: feed.slice()
      },
      {
        page: "NEXT",
        data: [""]
      }
    ]);

    if(page !== 1 && typeof listRef.current !== "undefined") {
      setSectionLoading(false);

      // Delaying scroll cus of state stuff somewhere, needs fixing
      setTimeout(() => {
        listRef.current.scrollToLocation({
          sectionIndex: page - 2,
          itemIndex: postsPerPage - 1
        })
      }, 1000);
    } else {
      setSectionLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const numPosts = await userStore.getSettings();
      setPostsPerPage(numPosts);
      await fetchNewPage(1, numPosts);
      delayed_setLoading(false);
    })()
  }, [])

  const FeedDataDisplayChain = () => {
    if(displayFeed.length > 0) {
      return (
        <>
          <SectionList
            sections={displayFeed}
            ref={listRef}
            keyExtractor={(page, index) => page + index}
            renderItem={({ item, section: { page } }: any) => {
              if(page === "NEXT") {
                const lastPage = displayFeed[displayFeed.length - 2].page;
                return (
                  <Button
                    style={NEXT_BUTTON}
                    text={`Load Page ${lastPage + 1}`}
                    onPress={() => {
                      fetchNewPage(lastPage + 1, postsPerPage);
                    }}
                  />
                );
              } else {
                return <Post post={item} />
              }
            }}
            renderSectionHeader={({ section: { page }}) => (
              page !== 1 && page !== "NEXT" ?
                <Text preset="header" style={DIVIDER} text={"Page " + page} />
              : null
            )}
            onScrollToIndexFailed={() => {
              // Do nothing
            }}
            refreshing={sectionLoading}
            onRefresh={() => {
              RNRestart.Restart();
            }}
          />
        </>
      );
    } else {
      return <Text preset="default" text="No posts found. Check again later." />
    }
  }

  const FeedErrorDisplayChain = () => {
    if(error) {
      return <Text preset="default" text="An error occurred loading the posts. Please reload the app or contact support for assistance." />
    } else {
      return <FeedDataDisplayChain />
    }
  }

  const FeedLoadingDisplayChain = () => {
    if(loading) {
      return <ActivityIndicator size="large" color={color.palette.lightForest} />
    } else {
      return (
        <FeedErrorDisplayChain />
      )
    }
  }

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="fixed">
      <FeedLoadingDisplayChain />
    </Screen>
  )
})
