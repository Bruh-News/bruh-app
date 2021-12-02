import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, SectionList, ViewStyle } from "react-native"
import { Post, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.offWhite,
  flex: 1,
}

export const FeedScreen = observer(function FeedScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState([]);
  const { feedStore } = useStores();
  const { posts } = feedStore;
  const postsPerPage = 7;
  const user = 5; // Replace with app registered user

  const parsePages = () => {
    let paginated = [];
    for(let k = 0; k < posts.length; k++) {
      if(k % postsPerPage === 0) {
        paginated.push({
          title: "Page " + ((k / postsPerPage) + 1),
          data: []
        });
      } else {
        paginated[paginated.length - 1].data.push(posts[k]);
      }
    }
    setPages(paginated);
  }

  useEffect(() => {
    async function fetchData() {
      await feedStore.getFeed(user);
    }

    fetchData().then(() => {
      setLoading(false);
      parsePages();
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
  }, [user])

  const FeedDataDisplayChain = () => {
    if(pages.length > 0) {
      return (
        <SectionList
          sections={pages}
          keyExtractor={(page , index) => page + index}
          renderItem={({ post }: any) => <Post post={post} />}
          renderSectionHeader={({ section: { title }}) => (
            <Text preset="header" text={title} />
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
      <Text preset="header" text="Yeet" />
      <FeedLoadingDisplayChain />
    </Screen>
  )
})