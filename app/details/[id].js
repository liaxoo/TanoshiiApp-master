import {
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Linking,
  useWindowDimensions,
} from "react-native";
import {
  Link,
  Stack,
  Tabs,
  useFocusEffect,
  useRouter,
  useSearchParams,
} from "expo-router";
import React, { useEffect, useReducer, useState, useRef } from "react";
import STYLES, { COLORS } from "../styling/styles";
import axios from "axios";

import Loading from "../components/Loading";
import { searchByIdQuery, userMutationQuery } from "../hooks/queryStrings";

// Icons
import Tick from "../assets/icons/tick-circle.svg";
import ArrowLeft from "../assets/icons/arrow-left.svg";
import ArrowLeftWhite from "../assets/icons/arrow-left-white.svg";
import Heart from "../assets/icons/heart.svg";
import ArrowUpScore from "../assets/icons/arrow-up.svg";
import Edit from "../assets/icons/edit.svg";
import Crown from "../assets/icons/crown.svg";
import Play from "../assets/icons/play.svg";
import { LinearGradient } from "expo-linear-gradient";
import {
  TagCards,
  StudioCards,
  ProducerCards,
  Tag2Cards,
  ReviewShortCards,
  AnimeCardsRecommendations,
  ExternalLinksCards,
  CharacterCards,
} from "../components/TagCards";
import * as NavigationBar from "expo-navigation-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Modal
import { RefreshControl } from "react-native";

import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import TimerCountdown from "react-native-timer-countdown";

import { Dropdown } from "react-native-element-dropdown";
const SPRING_CONFIG = {
  damping: 80,
  stiffness: 500,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
};
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";

const statusData = [
  { label: "Current", value: "CURRENT" },
  { label: "Planning", value: "PLANNING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Dropped", value: "DROPPED" },
  { label: "Paused", value: "PAUSED" },
  { label: "Repeating", value: "REPEATING" },
];

const AnimeDetails = () => {
  componentDidMount = () => {
    NavigationBar.setVisibilityAsync("hidden");
  };
  useFocusEffect(
    React.useCallback(() => {
      NavigationBar.setVisibilityAsync("hidden");

      return () => {
        // Clean up or unsubscribe from the event if needed
      };
    }, [])
  );
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { id } = useSearchParams();
  const [readMore, setReadMore] = useState(false);
  const [userEpisodeProgress, setUserEpisodeProgress] = useState(1);
  const [dateText, setDateText] = useState("Select Date");
  const [showDateChanger, setShowDateChanger] = useState(false);
  const [showEndDateChanger, setShowEndDateChanger] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [userScore, setUserScore] = useState(50);
  const [userStatus, setUserStatus] = useState("CURRENT");
  const [userPrivate, setUserPrivate] = useState(false);
  const [modalPage, setModalPage] = useState(1);
  const [userStartDate, setUserStartDate] = useState(new Date());
  const [userEndDate, setUserEndDate] = useState(new Date());
  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const [titleLanguage, setTitleLanguage] = useState("english");

  const router = useRouter();
  const scrollRef = useRef();
  const onDateChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDateChanger(false);
    setUserStartDate(currentDate);
    setDateText(currentDate.toLocaleString());
  };
  const onDateChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowEndDateChanger(false);
    setUserEndDate(currentDate);
    setDateText(currentDate.toLocaleString());
  };
  const showDatepicker = () => {
    setShowDateChanger(true);
  };
  function handleDescription() {
    setReadMore(!readMore);
  }
  async function isLoggedIn() {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  async function onRefresh() {
    setRefreshing(true);
    await getAnime({ anilistId: parseInt(id, 10) });
    setRefreshing(false);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    const getLanguage = async () => {
      let language = await AsyncStorage.getItem("titleDisplay");
      setTitleLanguage(language);
    };
    setReadMore(false);
    isLoggedIn();
    const parsedId = parseInt(id, 10);
    getLanguage();
    getAnime({ anilistId: parsedId });
  }, [id]);

  // Rest of the code remains unchanged
  async function getAnime({ anilistId }) {
    let userToken2 = await AsyncStorage.getItem("token");
    response = await axios({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(userToken2 ? { Authorization: `Bearer ${userToken2}` } : {}),
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id: anilistId,
        },
      },
    })
      .catch((err) => {})
      .then((data) => {
        setData(data.data.data.Media);
        setUserEpisodeProgress(
          data.data.data.Media.mediaListEntry !== null
            ? data.data.data.Media.mediaListEntry.progress
            : 0
        );
        setUserScore(
          data.data.data.Media.mediaListEntry !== null
            ? data.data.data.Media.mediaListEntry.score
            : 50
        );
        setUserPrivate(
          data.data.data.Media.mediaListEntry !== null
            ? data.data.data.Media.mediaListEntry.private
            : false
        );
        shortDescription = data.data.data.Media.description;
        setUserStartDate(
          data.data.data.Media.mediaListEntry?.startedAt
            ? new Date(
                data.data.data.Media.mediaListEntry.startedAt.year,
                data.data.data.Media.mediaListEntry.startedAt.month - 1,
                data.data.data.Media.mediaListEntry.startedAt.day
              )
            : null
        );
        setUserEndDate(
          data.data.data.Media.mediaListEntry?.completedAt
            ? new Date(
                data.data.data.Media.mediaListEntry.completedAt.year,
                data.data.data.Media.mediaListEntry.completedAt.month - 1,
                data.data.data.Media.mediaListEntry.completedAt.day
              )
            : null
        );
        setIsUserFavorite(data.data.data.Media.isFavourite);
        setLoaded(true);
      });
  }
  async function handleFavorite() {
    let token = await AsyncStorage.getItem("token");
    if (token !== null) {
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
          mutation($animeId: Int) {
        ToggleFavourite(animeId: $animeId) {
          anime {
            edges {
              id
            }
          }
        }
      }
          `,
          variables: {
            animeId: data.id,
          },
        },
      }).catch((err) => {
        console.log("2");
      });
      setIsUserFavorite(!isUserFavorite);
    }
  }
  async function editMediaList() {
    top.value = withTiming(dimensions.height * 1.25);

    let token = await AsyncStorage.getItem("token");

    await axios({
      url: "https://graphql.anilist.co",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        query: userMutationQuery,
        variables: {
          mediaId: data.id,
          progress: userEpisodeProgress,
          status: userStatus,
          score: userScore,
          private: userPrivate,
          startedAt:
            userStartDate !== null
              ? {
                  year: userStartDate.getFullYear(),
                  month: userStartDate.getMonth() + 1,
                  day: userStartDate.getDate(),
                }
              : null,
          completedAt:
            userEndDate !== null
              ? {
                  year: userEndDate.getFullYear(),
                  month: userEndDate.getMonth() + 1,
                  day: userEndDate.getDate(),
                }
              : null,
        },
      },
    });
  }
  async function handleTrailerClick() {
    if (data.trailer !== null) {
      await Linking.openURL(
        `https://www.youtube.com/watch?v=${data.trailer.id}`
      );
    }
  }
  const renderItem = (item) => {
    return (
      <View style={STYLES.MODAL.item}>
        <Text style={STYLES.MODAL.textItem}>{item.label}</Text>
      </View>
    );
  };
  const dimensions = useWindowDimensions();

  const top = useSharedValue(dimensions.height * 1.1);

  const style = useAnimatedStyle(() => {
    return {
      top: top.value,
    };
  });

  let content;
  if (loaded) {
    content = (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <Animated.View
          style={[
            STYLES.MODAL.container,
            { height: dimensions.height, width: dimensions.width },
            style,
          ]}
        >
          <View style={{ marginBottom: 12, flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignContent: "center",
                marginBottom: 24,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalPage(1);
                }}
              >
                <Text
                  style={
                    modalPage === 1
                      ? STYLES.MODAL.changePageText
                      : STYLES.MODAL.changePageTextOff
                  }
                >
                  Main
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 2,
                  height: 24,
                  backgroundColor: "gray",
                  borderRadius: 6,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalPage(2);
                }}
              >
                <Text
                  style={
                    modalPage === 2
                      ? STYLES.MODAL.changePageText
                      : STYLES.MODAL.changePageTextOff
                  }
                >
                  Extra
                </Text>
              </TouchableOpacity>
            </View>
            {modalPage === 1 && (
              <View>
                <Text style={STYLES.MODAL.textFilters}>Status</Text>
                <Dropdown
                  style={STYLES.MODAL.dropdown}
                  placeholderStyle={STYLES.MODAL.placeholderStyle}
                  selectedTextStyle={STYLES.MODAL.selectedTextStyle}
                  inputSearchStyle={STYLES.MODAL.inputSearchStyle}
                  iconStyle={STYLES.MODAL.iconStyle}
                  data={statusData}
                  fontFamily="Montserrat-Medium"
                  maxHeight={300}
                  width={150}
                  onChange={(item) => setUserStatus(item.value)}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Status"
                  searchPlaceholder="Search..."
                  value={
                    data.mediaListEntry
                      ? data.mediaListEntry.status
                      : "Not Watching"
                  }
                  renderItem={renderItem}
                />
                <Text style={STYLES.MODAL.textFilters}>Episode</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  <Slider
                    style={{ width: "90%", height: 40 }}
                    minimumValue={0}
                    thumbTintColor="#FFFFFF"
                    maximumValue={data.episodes}
                    value={
                      data.mediaListEntry ? data.mediaListEntry.progress : 0
                    }
                    step={1}
                    onValueChange={(value) => setUserEpisodeProgress(value)}
                    minimumTrackTintColor="#080E1E"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={STYLES.MODAL.episodeCount}>
                    {userEpisodeProgress}/
                    {data.episodes ? data.episodes : "N/A"}
                  </Text>
                </View>
                <Text style={STYLES.MODAL.textFilters}>Score</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    width: "100%",
                  }}
                >
                  <Slider
                    style={{ width: "90%", height: 40 }}
                    minimumValue={0}
                    thumbTintColor="#FFFFFF"
                    maximumValue={100}
                    value={data.mediaListEntry ? data.mediaListEntry.score : 50}
                    step={1}
                    onValueChange={(item) => setUserScore(item)}
                    minimumTrackTintColor="#080E1E"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
                  />
                  <Text style={STYLES.MODAL.episodeCount}>{userScore}/100</Text>
                </View>
              </View>
            )}
            {modalPage === 2 && (
              <View>
                <Text style={STYLES.MODAL.textFilters}>Start Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDateChanger(true);
                  }}
                  style={{
                    backgroundColor: "#080E1E",
                    padding: 12,
                    justifyContent: "center",
                    marginVertical: 12,
                    borderRadius: 6,
                  }}
                >
                  <Text style={STYLES.MODAL.episodeCount}>
                    <Text>
                      {userStartDate !== null &&
                        `${
                          userStartDate.getMonth() + 1
                        }/${userStartDate.getDate()}/${userStartDate.getFullYear()}`}
                      {userStartDate == null && "Choose Date"}
                    </Text>
                  </Text>
                </TouchableOpacity>
                <Text style={STYLES.MODAL.textFilters}>End Date</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowEndDateChanger(true);
                  }}
                  style={{
                    backgroundColor: "#080E1E",
                    padding: 12,
                    justifyContent: "center",
                    marginVertical: 12,
                    borderRadius: 6,
                  }}
                >
                  <Text style={STYLES.MODAL.episodeCount}>
                    {" "}
                    {userEndDate !== null &&
                      `${
                        userEndDate.getMonth() + 1
                      }/${userEndDate.getDate()}/${userEndDate.getFullYear()}`}
                    {userStartDate == null && "Choose Date"}
                  </Text>
                </TouchableOpacity>
                {showDateChanger && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={userStartDate ? userStartDate : new Date()}
                    mode={"date"}
                    is24Hour={true}
                    minimumDate={new Date(2000, 0, 1)}
                    onChange={onDateChangeStart}
                  />
                )}
                {showEndDateChanger && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={userEndDate ? userEndDate : new Date()}
                    mode={"date"}
                    is24Hour={true}
                    minimumDate={new Date(2000, 0, 1)}
                    onChange={onDateChangeEnd}
                  />
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setUserPrivate(!userPrivate)}
                    style={{
                      backgroundColor: "#080E1E",
                      padding: 12,
                      justifyContent: "center",
                      marginVertical: 12,
                      width: "45%",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={STYLES.MODAL.episodeCount}>
                      Private: {userPrivate.toString()}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#080E1E",
                      padding: 12,
                      justifyContent: "center",
                      marginVertical: 12,
                      width: "45%",
                      borderRadius: 6,
                    }}
                  >
                    <Text style={STYLES.MODAL.episodeCount}>
                      Repeat:{" "}
                      {data.mediaListEntry !== null
                        ? data.mediaListEntry.repeat.toString()
                        : "0"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginTop: "20%",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  top.value = withTiming(dimensions.height * 1.1);
                }}
              >
                <ArrowLeftWhite
                  width={24}
                  height={24}
                  style={{ marginRight: 24 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={STYLES.DETAILS.buttonBackContainer2}
                onPress={editMediaList}
              >
                <Tick
                  width={"65%"}
                  height={"65%"}
                  style={STYLES.DETAILS.buttonBack}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <ScrollView
          contentContainerStyle={STYLES.DETAILS.container}
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={STYLES.DETAILS.bannerContainer}>
            <View style={STYLES.DETAILS.bannerButtons}>
              <TouchableOpacity
                style={STYLES.DETAILS.buttonBackContainer}
                onPress={router.back}
              >
                <ArrowLeft
                  width={"65%"}
                  height={"65%"}
                  style={STYLES.DETAILS.buttonBack}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleFavorite}>
                <Heart
                  width={24}
                  height={24}
                  fill={isUserFavorite === true ? "white" : "none"}
                />
              </TouchableOpacity>
            </View>
            <Image
              style={STYLES.DETAILS.banner}
              source={{
                uri:
                  data.bannerImage !== null
                    ? data.bannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg",
              }}
            />
            <LinearGradient
              colors={["rgba(8,14,30,0)", "rgba(8,14,30,0.9)"]}
              style={STYLES.DETAILS.gradient}
            />
          </View>
          <View style={STYLES.DETAILS.otherContainer}>
            <View style={STYLES.DETAILS.titleContainer}>
              <View style={STYLES.DETAILS.coverImageContainer}>
                <Image
                  style={STYLES.DETAILS.coverImage}
                  source={{ uri: data.coverImage.extraLarge }}
                />
              </View>
              <View style={STYLES.DETAILS.titleInfoContainer}>
                <Text style={STYLES.DETAILS.type}>
                  {data.type} • {data.endDate.year ? data.endDate.year : "TBA"}
                </Text>
                <Text style={STYLES.DETAILS.title}>
                  {titleLanguage === "english" || titleLanguage === null
                    ? data.title.english !== null
                      ? data.title.english
                      : data.title.romaji
                    : titleLanguage === "romaji"
                    ? data.title.romaji
                    : data.title.native}
                </Text>
                {data.averageScore ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ArrowUpScore width={16} height={16} />
                    <Text style={STYLES.DETAILS.score}>
                      Popularity: {data.averageScore}%
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
          <View style={STYLES.DETAILS.contentContainer}>
            {loggedIn !== false && data.mediaListEntry !== null && (
              <View style={STYLES.DETAILS.editButtonContainer}>
                <TouchableOpacity
                  style={STYLES.DETAILS.editButton}
                  onPress={() => {
                    top.value = withTiming(dimensions.height / 2.5);
                  }}
                >
                  <View style={STYLES.DETAILS.editButtonTextContainer}>
                    <Text style={STYLES.DETAILS.editButtonText}>
                      {data.mediaListEntry.status
                        .toLowerCase()
                        .charAt(0)
                        .toUpperCase() +
                        data.mediaListEntry.status.toLowerCase().slice(1)}
                    </Text>
                  </View>
                  <Edit width={24} height={24} />
                </TouchableOpacity>
              </View>
            )}
            {loggedIn !== false && data.mediaListEntry == null && (
              <View style={STYLES.DETAILS.editButtonContainer}>
                <TouchableOpacity
                  style={STYLES.DETAILS.editButton}
                  onPress={() => {
                    top.value = withTiming(dimensions.height / 2.5);
                  }}
                >
                  <View style={STYLES.DETAILS.editButtonTextContainer}>
                    <Text style={STYLES.DETAILS.editButtonText}>
                      Not Watching
                    </Text>
                  </View>

                  <Edit width={24} height={24} />
                </TouchableOpacity>
              </View>
            )}
            <View style={STYLES.DETAILS.shortStatsContainer}>
              <View style={STYLES.DETAILS.shortStats}>
                <Text style={STYLES.DETAILS.shortStatsType}>Favorites</Text>
                <View style={STYLES.DETAILS.shortStatsDataContainer}>
                  <Heart width={20} height={20} />
                  <Text style={STYLES.DETAILS.shortStatsNumber}>
                    {data.favourites > 10000
                      ? Math.round(data.favourites / 100) / 10 + "k+"
                      : data.favourites}
                  </Text>
                </View>
              </View>
              <View style={STYLES.DETAILS.shortStats}>
                <Text style={STYLES.DETAILS.shortStatsType}>Format</Text>
                <View style={STYLES.DETAILS.shortStatsDataContainer}>
                  <Text style={STYLES.DETAILS.shortStatsNumber}>
                    {data.format}
                  </Text>
                </View>
              </View>
              {data.episodes !== null && (
                <View style={STYLES.DETAILS.shortStats}>
                  <Text style={STYLES.DETAILS.shortStatsType}>Episodes</Text>
                  <View style={STYLES.DETAILS.shortStatsDataContainer}>
                    <Crown width={20} height={20} />
                    <Text style={STYLES.DETAILS.shortStatsNumber}>
                      {data.episodes}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={STYLES.DETAILS.descriptionContainer}>
              <View style={STYLES.DETAILS.descriptionTextContainer}>
                <Text style={STYLES.DETAILS.descriptionTitleText}>
                  Description
                </Text>
                {data.description && (
                  <View style={{ marginBottom: 12 }}>
                    <Text style={STYLES.DETAILS.description}>
                      {!readMore && data.description.length >= 200
                        ? data.description
                            .substring(0, 200)
                            .replace(/<\/?i>/g, "")
                            .replace(/<br>/g, "\n") + "... "
                        : data.description
                            .replace(/<br>/g, "\n")
                            .replace(/<\/?i>/g, "")}
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          alignContent: "center",
                          justifyContent: "center",
                        }}
                        onPress={handleDescription}
                      >
                        {!readMore && data?.description.length >= 200 ? (
                          <Text style={STYLES.DETAILS.readMore}>read more</Text>
                        ) : readMore && data.description.length >= 200 ? (
                          <Text style={STYLES.DETAILS.readMore}>read less</Text>
                        ) : null}
                      </TouchableOpacity>
                    </Text>
                  </View>
                )}

                <TagCards data={data} style={{ marginBottom: 24 }} />
              </View>
            </View>

            {data.status === "RELEASING" && data.nextAiringEpisode !== null && (
              <View
                style={{
                  height: "6.5%",
                  backgroundColor: COLORS.TAG_BACKGROUND,
                  borderRadius: 6,
                  width: "100%",
                  marginBottom: 24,
                  padding: 12,
                  alignContent: "center",
                  justifyContent: "space-around",
                  flexDirection: "column",
                }}
              >
                <Text style={STYLES.DETAILS.releasingTitleText}>
                  Episode Releasing
                </Text>
                <TimerCountdown
                  initialSecondsRemaining={
                    data.nextAiringEpisode.timeUntilAiring * 60
                  }
                  formatSecondsRemaining={(milliseconds) => {
                    const remainingSec = Math.round(milliseconds / 1000);
                    const seconds = parseInt(
                      (remainingSec % 60).toString(),
                      10
                    );
                    const minutes = parseInt(
                      ((remainingSec / 60) % 60).toString(),
                      10
                    );
                    let hours = parseInt((remainingSec / 3600).toString(), 10);
                    let days = parseInt((hours / 24).toString(), 10);

                    if (days > 1) {
                      hours -= days * 24;
                    }

                    const s = seconds < 10 ? "0" + seconds : seconds;
                    const m = minutes < 10 ? "0" + minutes : minutes;
                    let d = days < 10 ? "0" + days : days;
                    d = d === "00" ? "" : d;
                    let h = hours < 10 ? "0" + hours : hours;
                    h = h === "00" ? "" : h;

                    return (
                      `${d > 0 ? d + " days, " : ""}` +
                      `${h > 0 ? h + " hours, " : ""}` +
                      m +
                      ` minutes, ` +
                      s +
                      ` seconds `
                    );
                  }}
                  style={STYLES.DETAILS.releasingTitleEpisodeText}
                />
                <Text style={STYLES.DETAILS.releasingTitleText}>
                  Episode {data.nextAiringEpisode.episode}
                </Text>
              </View>
            )}
            <View style={STYLES.DETAILS.descriptionContainer}>
              <View style={STYLES.DETAILS.descriptionTextContainer}>
                <Text style={STYLES.DETAILS.descriptionTitleText}>
                  Characters
                </Text>
                <View></View>
                <CharacterCards data={data} style={{ marginBottom: 24 }} />
              </View>
            </View>
            <View style={STYLES.DETAILS.descriptionContainer}>
              <View style={STYLES.DETAILS.descriptionTextContainer}>
                <Text style={STYLES.DETAILS.descriptionTitleText}>Studios</Text>
                <StudioCards data={data} style={{ marginBottom: 24 }} />
              </View>
            </View>
            <View style={STYLES.DETAILS.descriptionContainer}>
              <View style={STYLES.DETAILS.descriptionTextContainer}>
                <Text style={STYLES.DETAILS.descriptionTitleText}>
                  Producers
                </Text>
                <ProducerCards data={data} style={{ marginBottom: 24 }} />
              </View>
            </View>
            <View style={STYLES.DETAILS.descriptionContainer}>
              <View style={STYLES.DETAILS.descriptionTextContainer}>
                <Text style={STYLES.DETAILS.descriptionTitleText}>Tags</Text>
                <Tag2Cards data={data} style={{ marginBottom: 24 }} />
              </View>
            </View>
            {data.reviews.nodes.length > 0 && (
              <View style={STYLES.DETAILS.descriptionContainer}>
                <View style={STYLES.DETAILS.descriptionTextContainer2}>
                  <Text style={STYLES.DETAILS.descriptionTitleText}>
                    Popular Reviews
                  </Text>
                  <Link
                    href={{
                      pathname: "../stack/allReviews",
                      params: {
                        id: data.id,
                      },
                    }}
                    style={STYLES.DETAILS.showMore}
                  >
                    View all{" "}
                  </Link>
                </View>
                <ReviewShortCards data={data} style={{ marginBottom: 24 }} />
              </View>
            )}

            {data.recommendations.edges.length > 0 && (
              <View style={STYLES.DETAILS.descriptionContainer}>
                <View style={STYLES.DETAILS.descriptionTextContainer}>
                  <Text style={STYLES.DETAILS.descriptionTitleText}>
                    Recommendations
                  </Text>

                  <AnimeCardsRecommendations
                    data={data.recommendations.edges}
                    dispTitle={titleLanguage}
                  />
                </View>
              </View>
            )}
            {data.trailer !== null && (
              <View style={STYLES.DETAILS.descriptionContainer}>
                <View style={STYLES.DETAILS.descriptionTextContainer}>
                  <Text style={STYLES.DETAILS.descriptionTitleText}>
                    Trailer
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={handleTrailerClick}
                  style={STYLES.DETAILS.trailerImageContainer}
                >
                  <View style={{ position: "relative" }}>
                    <Image
                      source={{
                        uri: data.trailer.thumbnail,
                      }}
                      style={{
                        width: "100%",
                        height: 175,
                        borderRadius: 10,
                        resizeMode: "cover",
                      }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: [{ translateX: -25 }, { translateY: -25 }],
                        zIndex: 1,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 2,
                        },
                        shadowOpacity: 0.5,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <Play
                        width={50}
                        height={50}
                        style={{
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            {data.externalLinks && (
              <View style={STYLES.DETAILS.descriptionContainer}>
                <View style={STYLES.DETAILS.descriptionTextContainer}>
                  <Text style={STYLES.DETAILS.descriptionTitleText}>
                    External Links
                  </Text>

                  <ExternalLinksCards data={data.externalLinks} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    content = <Loading />;
  }
  return content;
};

export default AnimeDetails;

/*
          <View style={STYLES.DETAILS.descriptionContainer}>
            <Text style={STYLES.DETAILS.description}>
              {!readMore
                ? data.description.substring(0, 200) + "..."
                : data.description}
            </Text>
            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 5 }}
              onPress={handleDescription}
            >
              {!readMore ? (
                <ArrowDown width={30} height={30} />
              ) : (
                <ArrowUp width={30} height={30} />
              )}
            </TouchableOpacity>
          </View>
*/
