import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import {
  Stack,
  Tabs,
  Link,
  useSearchParams,
  useLocalSearchParams,
  useFocusEffect,
  useGlobalSearchParams,
  useRouter,
} from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import STYLES, { COLORS } from "../styling/styles";
import axios from "axios";
import { characterQuery, searchAnimeQuery } from "../hooks/queryStrings";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
// Icons
import Heart from "../assets/icons/heart.svg";
import ArrowLeft from "../assets/icons/arrow-left-white.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SPRING_CONFIG = {
  damping: 80,
  stiffness: 500,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};
import Markdown from "react-native-markdown-package";
import Loading from "../components/Loading";

const CharacterScreen = () => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const { id } = useLocalSearchParams();
  // text will be 'some text to pass'
  const router = useRouter();
  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10);
      getAnime({ id: parsedId });
    }
  }, [id]);

  getAnime = async ({ id }) => {
    let token = await AsyncStorage.getItem("token");
    response = await axios({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data: {
        query: characterQuery,
        variables: {
          id: id,
        },
      },
    })
      .then((data) => {
        setData(data.data.data.Character);
        setFavorited(data.data.data.Character.isFavourite);
        setLoaded(true);
      })
      .catch((e) => {
        console.error(e);
        return e;
      });
  };

  const toggleFavorite = async () => {
    let token = await AsyncStorage.getItem("token");
    response = await axios({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data: {
        query: `
          mutation($id: Int) {
            ToggleFavourite(characterId: $id ) {
              characters {
                edges {
                  id
                }
              }
            }
          }
        `,
        variables: {
          id: parseInt(id, 10),
        },
      },
    }).then((data) => {
      setFavorited(!favorited);
    });
  };
  // Status bar height
  let statusBarHeight = 0;
  if (Platform.OS === "android") {
    statusBarHeight = StatusBar.currentHeight;
  } else {
    let insets = useSafeAreaInsets();
    statusBarHeight = insets.top;
  }
  let content;
  if (loaded) {
    content = (
      <View style={{ backgroundColor: COLORS.DARK_BACKGROUND, flex: 1 }}>
        <View style={{ flex: 1, marginTop: statusBarHeight }}>
          <StatusBar style="light" backgroundColor={COLORS.DARK_BACKGROUND} />
          <ScrollView
            contentContainerStyle={{
              backgroundColor: COLORS.DARK_BACKGROUND,
              width: "100%",
              height: "100%",
              padding: 24,
            }}
          >
            <View
              style={{
                height: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: 24,
                }}
              >
                <TouchableOpacity
                  onPressIn={router.back}
                  style={{
                    position: "absolute",
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  <ArrowLeft width={20} height={20} />
                </TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: 18,
                    fontFamily: "Montserrat-Medium",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Character Details
                </Text>
                <TouchableOpacity
                  onPress={toggleFavorite}
                  style={{
                    position: "absolute",
                    right: 0,
                  }}
                >
                  <Heart
                    fill={favorited ? "white" : "none"}
                    width={20}
                    height={20}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View
                  style={{
                    width: "100%",
                    height: 115,
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{
                      uri: data.image.large,
                    }}
                    style={{
                      height: "100%",
                      width: "32.5%",
                      borderRadius: 100,
                      resizeMode: "cover",
                      marginRight: 24,
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: COLORS.WHITE,
                        fontSize: 18,
                        fontFamily: "Montserrat-Medium",
                      }}
                    >
                      {data.name.full}
                    </Text>

                    {data.age && (
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 13,
                          fontFamily: "Montserrat-Medium",
                        }}
                      >
                        Age: {data.age}, (
                        {data.dateOfBirth.month ? data.dateOfBirth.month : "NA"}
                        /{data.dateOfBirth.day ? data.dateOfBirth.day : "NA"}/
                        {data.dateOfBirth.year ? data.dateOfBirth.year : "NA"})
                      </Text>
                    )}
                    {data.favourites && (
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: 13,
                          fontFamily: "Montserrat-Medium",
                        }}
                      >
                        {data.favourites} Favorites
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontFamily: "Montserrat-SemiBold",
                      fontSize: 18,
                      marginTop: 16,
                    }}
                  >
                    Description
                  </Text>
                  <View>
                    <View>
                      {data.description ? (
                        <Markdown styles={markdownStyle.collectiveMd}>
                          {data.description
                            .replace(/~!(.*?)!~/g, "")
                            .replace(/__(.*?)__/g, "**$1**")}
                        </Markdown>
                      ) : (
                        <Markdown styles={markdownStyle.collectiveMd}>
                          **No Description Available**
                        </Markdown>
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  } else {
    content = <Loading />;
  }
  return content;
};
const markdownStyle = {
  collectiveMd: {
    a: {
      color: "white",
      textDecoration: "none",
      fontFamily: "Montserrat-Regular",
    },
    strong: {
      color: "rgba(255, 255, 255, 0.6)",
      fontFamily: "Montserrat-SemiBold",
      fontWeight: "600",
    },
    em: {
      color: "rgba(255, 255, 255, 0.4)",
      fontFamily: "Montserrat-Bold",
    },

    text: {
      color: "rgba(255, 255, 255, 0.4)",
      fontFamily: "Montserrat-Medium",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontFamily: "Montserrat-Regular",
    },
  },
};

export default CharacterScreen;
