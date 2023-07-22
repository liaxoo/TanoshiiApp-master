import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";
import STYLES from "../styling/styles";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CLIPSIZE = 25;

function AnimeCards({ data, type, query, titleDisp }) {
  const router = useRouter();
  const [titleLanguage, setTitleLanguage] = useState(titleDisp);
  let newQuery = type == "recent" ? "Recently Updated" : "Popular";
  const handlePress = () => {
    AsyncStorage.setItem("moreQuery", newQuery);
    router.push({
      pathname: "../stack/more",
      params: {
        query: newQuery,
      },
    });
  };

  //console.log(newQuery);
  if (data) {
    return (
      <View style={{ flex: 1 }}>
        <View style={STYLES.HOME.cardContainerText}>
          <Text style={STYLES.HOME.cardContainerTitle}>
            {type == "recent" ? "Recently Updated" : "Popular"}
          </Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={STYLES.HOME.showMore}>Show More</Text>
          </TouchableOpacity>
        </View>
        <View style={STYLES.HOME.animeCardContainer}>
          <FlatList
            horizontal
            data={data}
            style={{ flex: 1, height: 200 }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            key={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={STYLES.HOME.animeCard}
                onPress={() => router.push(`../details/${item.id}`)}
              >
                <Image
                  style={STYLES.HOME.animeCardImage}
                  source={{
                    uri: item.coverImage.extraLarge,
                  }}
                />
                <Text style={STYLES.HOME.animeCardText}>
                  {titleLanguage === "english" || titleLanguage === null
                    ? item.title.english !== null
                      ? item.title.english.length > 20
                        ? item.title.english.substring(0, 20) + "..."
                        : item.title.english
                      : item.title.romaji.length > 20
                      ? item.title.romaji.substring(0, 20) + "..."
                      : item.title.romaji
                    : titleLanguage === "romaji"
                    ? item.title.romaji.length > 20
                      ? item.title.romaji.substring(0, 20) + "..."
                      : item.title.romaji
                    : item.title.native.length > 20
                    ? item.title.native.substring(0, 20) + "..."
                    : item.title.native}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}
export default AnimeCards;
