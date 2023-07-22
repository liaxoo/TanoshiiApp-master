import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useFocusEffect, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import STYLES, { COLORS } from "../styling/styles";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { SafeAreaView } from "react-navigation";

import { userInfoTokenQuery } from "../hooks/queryStrings";
import { AnimeCardsFavorites, CharacterCards } from "../components/TagCards";
import * as Linking from "expo-linking";
// Icons
import Award from "../assets/icons/award.svg";
import VideoPlay from "../assets/icons/video-play.svg";
import Cup from "../assets/icons/cup.svg";
import Settings from "../assets/icons/setting-2.svg";

import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

// Authorization

const authEndpoint = "https://anilist.co/api/v2/oauth/authorize";
const clientId = "11772";
const redirectUri = "tanoshii://auth"; // Replace this with your production URL

WebBrowser.maybeCompleteAuthSession();

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  let testing = "";
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === "android") {
        NavigationBar.setBackgroundColorAsync(COLORS.NAVBAR_BACKGROUND, true);
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor("transparent", false);

        return () => {
          // Reset the StatusBar color when the screen is unfocused
          StatusBar.setBackgroundColor("#080E1E", false);
          StatusBar.setBarStyle("default");
        };
      }
    }, [])
  );

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      response_type: "token",
      scopes: [],
      extraParams: {
        approval_prompt: "force", // Change to 'force' to always prompt for login
      },
    },
    { authorizationEndpoint: authEndpoint }
  );
  async function getTokenFromCode() {
    let options = {
      url: "https://anilist.co/api/v2/oauth/token",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        grant_type: "authorization_code",
        client_id: "11772",
        client_secret: "AWD2LNxcfSRXpcapeU8hqv84D19dbj4ZB3hUFTCm",
        redirect_uri: redirectUri,
        code: `${testing}`, // The Authorization Code received previously
      }),
    };
    axios(options).then((response) => {
      // Handle the response
      //console.log(response.data.access_token);
      storeToken(response.data.access_token);

      AsyncStorage.setItem("token", response.data.access_token);
      AsyncStorage.getItem("token").then(async (token) => {
        setToken(token);
        await axios({
          url: "https://graphql.anilist.co",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            query: `
                    query {
            Viewer {
              id
            }
          }
          `,
          },
        })
          .then(async (data) => {
            await AsyncStorage.setItem(
              "clientId",
              data.data.data.Viewer.id.toString()
            );
          })
          .catch((error) => {
            console.error(error);
            return "There was a problem authenticating your account. Please send an issue on GitHub.";
          });
        setLoading(false);
      });
    });
  }

  useEffect(() => {
    AsyncStorage.getItem("token").then((storedToken) => {
      if (storedToken) {
        setLoggedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      const code = response.params.code;
      getTokenFromCode(code);
    }
  }, [response]);

  async function getUserData() {
    let token2 = await AsyncStorage.getItem("token");
    await axios({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: {
        Authorization: `Bearer ${token2}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: userInfoTokenQuery,
      },
    })
      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        setUserData(data.data.data.Viewer);
        let dates = new Date(data.data.data.Viewer.createdAt * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        setDate(dates);
        setLoggedIn(true);
        setLoading(false);
      });
  }
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");
      AsyncStorage.getItem("token").then((token) => {
        if (token) {
          getUserData();
        } else {
          setLoggedIn(false);
          setLoading(false);
        }
      });
    }, [])
  );

  const handleLogin = async () => {
    // Prompt user to login with AniList
    const result = await promptAsync();
    // Store the response in AsyncStorage
    storeResponse(result);
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("clientId");
    setLoggedIn(false);
  };
  let content;
  if (loading) {
    content = <Loading />;
  } else if (!loggedIn && !loading) {
    content = (
      <View>
        <StatusBar barStyle={"light-content"} backgroundColor="transparent" />
        <LinearGradient
          colors={[COLORS.GRADIENT3, COLORS.GRADIENT4]}
          style={STYLES.LOGIN.container}
        >
          <View style={STYLES.LOGIN.main}>
            <Text style={STYLES.LOGIN.title}>
              Welcome, it's great to see you!
            </Text>
            <Text style={STYLES.LOGIN.subtitle}>
              Seamlessly track your progress, discover new shows, and connect
              with a vibrant community of anime enthusiasts. Personalized
              recommendations, intuitive progress tracking, and easy-to-use
              features make Tanoshii the ultimate companion for anime lovers.
            </Text>
            <TouchableOpacity
              href="/screens/home"
              style={STYLES.LOGIN.button}
              onPress={handleLogin}
            >
              <Text>
                <Text style={STYLES.LOGIN.buttonText}> Login with AniList</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  } else {
    content = (
      <SafeAreaView style={STYLES.LOGIN.containerLoggedIn}>
        <View style={STYLES.LOGIN.userInfoContainer}>
          <Image
            style={STYLES.LOGIN.avatarImage}
            source={{ uri: userData.avatar.large }}
          />
          <View>
            <Text style={STYLES.LOGIN.avatarName}>Hi, {userData.name}!</Text>
            <Text style={STYLES.LOGIN.avatarDate}>
              You've been on AniList since {date.getMonth() + 1}/
              {date.getDate()}/{date.getFullYear()}.
            </Text>
          </View>
          <View style={{ position: "absolute", top: 12, right: 12 }}>
            <TouchableOpacity
              onPress={() => {
                router.push("../stack/settings");
              }}
            >
              <Settings width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            height: "75%",
          }}
        >
          <View>
            <View>
              <Text style={[STYLES.HOME.cardContainerTitle, { marginTop: 12 }]}>
                Your Stats
              </Text>
              <View style={STYLES.LOGIN.statsContainer}>
                <View style={STYLES.LOGIN.statsDataContainer}>
                  <Award width={30} height={30} />
                  <Text style={STYLES.LOGIN.statsTitle}>Days Watched</Text>
                  <Text style={STYLES.LOGIN.statsDataText}>
                    {Math.round(
                      userData.statistics.anime.minutesWatched / 60 / 24
                    )}
                  </Text>
                </View>
                <View style={STYLES.LOGIN.statsDataContainer}>
                  <VideoPlay width={30} height={30} />
                  <Text style={STYLES.LOGIN.statsTitle}>Episodes Watched</Text>
                  <Text style={STYLES.LOGIN.statsDataText}>
                    {userData.statistics.anime.episodesWatched}
                  </Text>
                </View>
                <View style={STYLES.LOGIN.statsDataContainer}>
                  <Cup width={30} height={30} />
                  <Text style={STYLES.LOGIN.statsTitle}>Average Score</Text>
                  <Text style={STYLES.LOGIN.statsDataText}>
                    {userData.statistics.anime.meanScore}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={STYLES.HOME.cardContainerTitle}>Favorite Anime</Text>
            <AnimeCardsFavorites data={userData.favourites.anime.edges} />
            <Text style={STYLES.HOME.cardContainerTitle}>
              Favorite Characters
            </Text>
            <CharacterCards data={userData.favourites} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return content;
};

export default ProfilePage;
