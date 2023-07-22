import { View, Text, FlatList, Image, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import STYLES, { COLORS } from "../styling/styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import StarGold from "../assets/icons/starGold.svg";
import ThumbsUp from "../assets/icons/thumbs-up.svg";
import ThumbsDown from "../assets/icons/thumbs-down.svg";
import { Link, useNavigation, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
async function resetQuery() {
  await AsyncStorage.removeItem("genres");
  await AsyncStorage.removeItem("tags");
}

const TagCards = ({ data }) => {
  const router = useRouter();
  async function redirectSearch(tag) {
    resetQuery();
    await AsyncStorage.setItem("genres", tag.toString());
    router.push("../stack/results");
  }

  return (
    <FlatList
      horizontal
      data={data.genres}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      key={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={STYLES.DETAILS.tagContainer}
          onPress={() => redirectSearch(item)}
        >
          <Text style={STYLES.DETAILS.tagText}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const FilterGenreCards = () => {
  const data = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Music",
    "Psychological",
    "Romance",
    "Supernatural",
    "Slice of Life",
    "Thriller",
  ];

  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    AsyncStorage.setItem("tags", selectedTags.toString());
  }, [selectedTags]);

  const addTag = async (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((item) => item !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        STYLES.DETAILS.tagContainer2,
        selectedTags.includes(item) && STYLES.DETAILS.selectedTagContainer,
      ]}
      onPress={() => addTag(item)}
    >
      <Text
        style={[
          STYLES.DETAILS.tagText,
          selectedTags.includes(item) && STYLES.DETAILS.selectedTagText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      key={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};
const FilterSortCards = () => {
  const data = [
    { label: "Popularity", value: "POPULARITY_DESC" },
    { label: "Score", value: "SCORE_DESC" },
    { label: "Start Date", value: "START_DATE_DESC" },
    { label: "End Date", value: "END_DATE_DESC" },
    { label: "Favorites", value: "FAVOURITES_DESC" },
  ];

  const [selectedSort, setSelectedSort] = useState([]);

  useEffect(() => {
    AsyncStorage.setItem("sort", selectedSort.toString());
  }, [selectedSort]);

  const addTag = (tag) => {
    if (selectedSort.includes(tag)) {
      setSelectedSort(selectedSort.filter((item) => item !== tag));
    } else {
      setSelectedSort([...selectedSort, tag]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        STYLES.DETAILS.tagContainer2,
        selectedSort.includes(item.value) &&
          STYLES.DETAILS.selectedTagContainer,
      ]}
      onPress={() => addTag(item.value)}
    >
      <Text
        style={[
          STYLES.DETAILS.tagText,
          selectedSort.includes(item.value) && STYLES.DETAILS.selectedTagText,
        ]}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      key={(item, index) => index.toString()}
      renderItem={renderItem}
    />
  );
};
const FilterStatusCards = () => {
  const data = [
    { label: "Finished", value: "FINISHED" },
    { label: "Releasing", value: "RELEASING" },
    { label: "Not released yet", value: "NOT_YET_RELEASED" },
    { label: "Cancelled", value: "CANCELLED" },
    { label: "Hiatus", value: "HIATUS" },
  ];
  const router = useRouter();

  async function setData(item) {
    await AsyncStorage.setItem("status", item.value);
  }

  const renderItem = (item) => {
    return (
      <View style={STYLES.MODAL.item}>
        <Text style={STYLES.MODAL.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={STYLES.MODAL.dropdown2}
      placeholderStyle={STYLES.MODAL.placeholderStyle}
      selectedTextStyle={STYLES.MODAL.selectedTextStyle}
      inputSearchStyle={STYLES.MODAL.inputSearchStyle}
      iconStyle={STYLES.MODAL.iconStyle}
      data={data}
      onChange={(item) => setData(item)}
      fontFamily="Montserrat-Regular"
      //onChange={(item) => ()}
      labelField="label"
      valueField="value"
      placeholder="Status"
      searchPlaceholder="Search..."
      value={
        AsyncStorage.getItem("status")
          ? AsyncStorage.getItem("status")
          : "Status"
      }
      renderItem={renderItem}
    />
  );
};
const FilterSeasonCards = () => {
  const data = [
    { label: "Winter", value: "WINTER" },
    { label: "Spring", value: "SPRING" },
    { label: "Summer", value: "SUMMER" },
    { label: "Fall", value: "FALL" },
  ];
  const router = useRouter();

  const renderItem = (item) => {
    return (
      <View style={STYLES.MODAL.item}>
        <Text style={STYLES.MODAL.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={STYLES.MODAL.dropdown2}
      placeholderStyle={STYLES.MODAL.placeholderStyle}
      selectedTextStyle={STYLES.MODAL.selectedTextStyle}
      inputSearchStyle={STYLES.MODAL.inputSearchStyle}
      iconStyle={STYLES.MODAL.iconStyle}
      data={data}
      fontFamily="Montserrat-Regular"
      //onChange={(item) => ()}
      onChange={(item) => AsyncStorage.setItem("season", item.value)}
      value={
        AsyncStorage.getItem("season")
          ? AsyncStorage.getItem("season")
          : "Season"
      }
      labelField="label"
      valueField="value"
      placeholder="Season"
      searchPlaceholder="Search..."
      renderItem={renderItem}
    />
  );
};

const StudioCards = ({ data }) => {
  return (
    <FlatList
      horizontal
      data={data.studios.nodes}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      key={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={STYLES.DETAILS.tagContainer}>
          <Text style={STYLES.DETAILS.tagText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};
const ExternalLinksCards = ({ data }) => {
  async function handleClick({ link }) {
    await Linking.openURL(`${link}`);
  }
  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleClick({ link: item.url })}
          style={{
            padding: 10,
            backgroundColor: COLORS.TAG_BACKGROUND,
            borderColor: item.color ? item.color : "white",
            borderWidth: 1,
            marginRight: 8,
            borderRadius: 4,
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {item.icon ? (
            <Image
              source={{ uri: item.icon }}
              style={{
                width: 20,
                height: 15,
                marginRight: 5,
                resizeMode: "contain",
              }}
            />
          ) : null}
          <Text style={STYLES.DETAILS.tagText}>{item.site}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const ProducerCards = ({ data }) => {
  return (
    <FlatList
      horizontal
      data={data.staff.nodes}
      showsHorizontalScrollIndicator={false}
      style={{ width: "100%" }}
      keyExtractor={(item, index) => index.toString()}
      key={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={STYLES.DETAILS.tagContainer}>
          <Text style={STYLES.DETAILS.tagText}>{item.name.full}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const Tag2Cards = ({ data }) => {
  const router = useRouter();

  async function redirectSearch(tag) {
    await resetQuery();
    await AsyncStorage.setItem("tags", tag.toString()).then(() => {
      router.push("../stack/results");
    });
  }
  return (
    <FlatList
      horizontal
      data={data.tags}
      showsHorizontalScrollIndicator={false}
      key={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={STYLES.DETAILS.tag2Container}
          onPress={() => redirectSearch(item.name)}
        >
          <Text style={STYLES.DETAILS.tagText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ flexDirection: "row" }}
    />
  );
};

const ReviewShortCards = ({ data }) => {
  return (
    <>
      {data.reviews.nodes.map((item, index) => (
        <View key={index}>
          <View style={STYLES.DETAILS.shortReviewContainer}>
            <View style={STYLES.DETAILS.shortReviewInfoContainer}>
              <Image
                source={{ uri: item.user.avatar.large }}
                style={STYLES.DETAILS.shortReviewUserImage}
              />
              <View>
                <Text style={STYLES.DETAILS.shortReviewUsername}>
                  {item.user.name}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <StarGold
                    style={{
                      marginRight: 4,
                    }}
                  />
                  <Text style={STYLES.DETAILS.shortReviewScore}>
                    {item.score / 10}/10
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={STYLES.DETAILS.shortReviewText}>{item.summary}</Text>
            </View>
          </View>
          <View style={STYLES.DETAILS.shortReviewButtonsContainer}>
            <View style={STYLES.DETAILS.shortReviewButtonsContainerSection}>
              <ThumbsUp style={{ marginRight: 8 }} />
              <Text style={STYLES.DETAILS.shortReviewRatingText}>
                {item.rating}
              </Text>
            </View>
            <View style={STYLES.DETAILS.shortReviewRatingDivider} />
            <View style={STYLES.DETAILS.shortReviewButtonsContainerSection}>
              <ThumbsDown style={{ marginRight: 8 }} />
              <Text style={STYLES.DETAILS.shortReviewRatingText}>
                {item.ratingAmount - item.rating}
              </Text>
            </View>
            <View style={STYLES.DETAILS.shortReviewRatingDivider} />

            <View style={STYLES.DETAILS.shortReviewButtonsContainerSection}>
              <TouchableOpacity>
                <Link
                  href={{
                    pathname: "../stack/review",
                    params: {
                      id: item.id,
                    },
                  }}
                  style={STYLES.DETAILS.shortReviewRatingText}
                >
                  Read full review
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};

function AnimeCardsRecommendations({ data, dispTitle }) {
  const [titleLanguage, setTitleLanguage] = useState(dispTitle);

  const router = useRouter();
  const navigation = useNavigation();

  const CLIPSIZE = 25;
  if (data) {
    return (
      <View style={STYLES.HOME.animeCardContainer3}>
        <FlatList
          horizontal
          key={(item, index) => index.toString()}
          data={data}
          showsHorizontalScrollIndicator={false}
          height={180}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={STYLES.HOME.animeCard}
              onPress={
                () =>
                  router.push(`../details/${item.node.mediaRecommendation.id}`) // Replace '112153' with the desired ID
              }
            >
              <Image
                style={STYLES.HOME.animeCardImage}
                source={{
                  uri: item.node.mediaRecommendation.coverImage.extraLarge,
                }}
              />
              <Text style={STYLES.HOME.animeCardText}>
                {titleLanguage === "english" || titleLanguage === null
                  ? item.node.mediaRecommendation.title.english !== null
                    ? item.node.mediaRecommendation.title.english.length > 20
                      ? item.node.mediaRecommendation.title.english.substring(
                          0,
                          20
                        ) + "..."
                      : item.node.mediaRecommendation.title.english
                    : item.node.mediaRecommendation.title.romaji.length > 20
                    ? item.node.mediaRecommendation.title.romaji.substring(
                        0,
                        20
                      ) + "..."
                    : item.node.mediaRecommendation.title.romaji
                  : titleLanguage === "romaji"
                  ? item.node.mediaRecommendation.title.romaji.length > 20
                    ? item.node.mediaRecommendation.title.romaji.substring(
                        0,
                        20
                      ) + "..."
                    : item.node.mediaRecommendation.title.romaji
                  : item.node.mediaRecommendation.title.native.length > 20
                  ? item.node.mediaRecommendation.title.native.substring(
                      0,
                      20
                    ) + "..."
                  : item.node.mediaRecommendation.title.native}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

function AnimeCardsFavorites({ data }) {
  const [titleLanguage, setTitleLanguage] = useState("english");

  const router = useRouter();
  const navigation = useNavigation();
  useEffect(() => {
    const getLanguage = async () => {
      let language = await AsyncStorage.getItem("titleDisplay");
      setTitleLanguage(language);
    };
    getLanguage();
  }, []);

  const CLIPSIZE = 25;
  return (
    <View style={STYLES.HOME.animeCardContainer3}>
      <FlatList
        horizontal
        data={data}
        style={{ height: 175 }}
        key={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={STYLES.HOME.animeCard}
            onPress={() => router.push(`../details/${item.node.id}`)}
          >
            <Image
              style={STYLES.HOME.animeCardImage}
              source={{
                uri: item.node.coverImage.extraLarge,
              }}
            />
            <Text style={STYLES.HOME.animeCardText}>
              {titleLanguage === "english" || titleLanguage === null
                ? item.node.title.english !== null
                  ? item.node.title.english.length > 20
                    ? item.node.title.english.substring(0, 20) + "..."
                    : item.node.title.english
                  : item.node.title.romaji.length > 20
                  ? item.node.title.romaji.substring(0, 20) + "..."
                  : item.node.title.romaji
                : titleLanguage === "romaji"
                ? item.node.title.romaji.length > 20
                  ? item.node.title.romaji.substring(0, 20) + "..."
                  : item.node.title.romaji
                : item.node.title.native.length > 20
                ? item.node.title.native.substring(0, 20) + "..."
                : item.node.title.native}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
function CharacterCards({ data }) {
  const router = useRouter();

  return (
    <View>
      <FlatList
        horizontal
        data={data.characters.nodes}
        showsHorizontalScrollIndicator={false}
        style={{ width: "100%" }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={STYLES.DETAILS.characterContainer}
            onPress={() =>
              router.push({
                pathname: "../stack/character",
                params: { id: item.id },
              })
            }
          >
            <View style={STYLES.DETAILS.characterImagecontainer}>
              <Image
                source={{ uri: item.image.large }}
                style={STYLES.DETAILS.characterImage}
              />
            </View>
            <Text style={STYLES.DETAILS.characterName}>{item.name.first}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
export {
  TagCards,
  StudioCards,
  ProducerCards,
  Tag2Cards,
  ReviewShortCards,
  AnimeCardsRecommendations,
  AnimeCardsFavorites,
  ExternalLinksCards,
  FilterGenreCards,
  FilterStatusCards,
  FilterSeasonCards,
  FilterSortCards,
  CharacterCards,
};
