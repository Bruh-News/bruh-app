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
  const { feedStore } = useStores();
  const { feed } = feedStore;
  const [displayFeed, setDisplayFeed] = useState([]);
  const postsPerPage = 7;
  const user = 5; // Replace with app registered user

  const fetchNewPage = (page: number) => {
    setLoading(true);
    setError(false);
    feedStore.getFeed(user, page, postsPerPage)
      .then(() => {
        setDisplayFeed([...displayFeed, {
          page,
          data: feed.slice()
        }]);
      })
      .catch(e => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      })
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
