import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, SectionList, TextStyle, ViewStyle } from "react-native"
import { Post, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

const DIVIDER: TextStyle = {
  color: color.palette.lightGrey,
  textAlign: "center",
  fontWeight: "normal"
}

export const FeedScreen = observer(function FeedScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { feedStore, userStore } = useStores();
  const { feed } = feedStore;
  const { user } = userStore;
  const [displayFeed, setDisplayFeed] = useState([]);
  const postsPerPage = 7;

  // Delaying load cus some Ignite bloatware somewhere causing recursion errors
  const delayed_setLoading = (val: boolean) => {
    setTimeout(() => {
      setLoading(val);
    }, 500);
  }

  const fetchNewPage = async (page: number) => {
    delayed_setLoading(true);
    setError(false);
    try {
      await feedStore.getFeed(user.id, page, postsPerPage)
    } catch(e) {
      console.error(e);
      setError(true);
    }
    setDisplayFeed([...displayFeed, {
      page,
      data: feed.slice()
    }]);
    delayed_setLoading(false);
  }

  useEffect(() => {
    fetchNewPage(1);
  }, [])

  const FeedDataDisplayChain = () => {
    if(displayFeed.length > 0) {
      return (
        <SectionList
          sections={displayFeed}
          keyExtractor={(page, index) => page + index}
          renderItem={({ item }: any) => <Post post={item} />}
          renderSectionHeader={({ section: { page }}) => (
            page !== 1 ?
              <Text preset="header" style={DIVIDER} text={"Page " + page} />
            : null
          )}
        />
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
