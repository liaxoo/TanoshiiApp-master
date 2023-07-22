import { Platform, StyleSheet, Text, View } from "react-native";
export const COLORS = {
  WHITE: "#FFFFFF",
  SUBWHITE: "#C6ABE9",
  GRAY: "#9C9FA5",

  TEXT_GRAY: "#E0E0E0",
  SUBTEXT: "rgba(255, 255, 255, 0.6)",
  // Dark
  DARK_BACKGROUND: "#080E1E",
  // Buttons
  BUTTON_PRIMARY: "#9747FF",
  BUTTON_SECONDARY: "#222222",

  GRADIENT1: "#5904C9",
  GRADIENT2: "#2F0080",
  GRADIENT3: "#32145A",
  GRADIENT4: "#903CFF",

  //default 903CFF
  // 1 5904C9
  // 2 4D00B2
  // 3 2F0080

  //Carousel
  CAROUSEL_TITLE_COLOR: "#2E2E2E",
  CAROUSEL_SPECIAL_COLOR: "#848486",

  // Navbar
  NAVBAR_BACKGROUND: "#1B2336",
  NAVBAR_ACTIVE_TINT: "#FFE174",

  //Tags
  TAG_BACKGROUND: "rgba(18, 24, 40, 1)",
  REVIEW_BACKGROUND: "rgba(18, 24, 40, 1)",

  //
  RED: "#CC3451",
};

const LOGIN = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 24,
    height: "100%",
  },
  containerLoggedIn: {
    padding: 24,
    height: "100%",
    backgroundColor: COLORS.DARK_BACKGROUND,
  },
  avatarImage: {
    margin: 12,
    width: "17.5%",
    height: "80%",
    resizeMode: "cover",
    borderRadius: 50,
    aspectRatio: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    height: 150,
    backgroundColor: COLORS.TAG_BACKGROUND,
    borderRadius: 6,
    marginBottom: 24,
    padding: 12,
  },
  statsDataText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
  },
  statsDataContainer: {
    height: "100%",
    width: "20%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  statsTitle: {
    color: COLORS.WHITE,
    fontSize: 12,
    textAlign: "center",
    flexWrap: "wrap",
    width: "100%",
    fontFamily: "Montserrat-Bold",
    marginVertical: 10,
  },

  logoutText: {
    color: COLORS.RED,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  settingsText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    textAlign: "center",
  },
  discordButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#5865F2",
    backgroundColor: "#5865F2",
    borderRadius: 6,
    padding: "5%",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 12,
  },
  logoutButton: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: COLORS.RED,
    borderRadius: 6,
    padding: "5%",
    alignContent: "center",
    justifyContent: "center",
  },
  avatarName: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontFamily: "Montserrat-SemiBold",
  },
  avatarDate: {
    fontSize: 11,
    color: COLORS.SUBTEXT,
    fontFamily: "Montserrat-Medium",
  },
  userInfoContainer: {
    marginTop: 24,
    height: "10%",
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.TAG_BACKGROUND,
    borderRadius: 6,
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.WHITE,
    letterSpacing: 1,
    fontFamily: "Montserrat-SemiBold",
    fontWeight: 600,
    marginTop: "50%",
    marginBottom: "10%",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.SUBWHITE,
    fontFamily: "Montserrat-Medium",
    letterSpacing: 1,
    lineHeight: 22.5,
  },
  logo: {
    position: "absolute",
    top: "0%",
    width: 140, // Adjust the width value to make it smaller
    aspectRatio: 0, // Adjust the aspect ratio value if needed
    resizeMode: "contain",
    alignSelf: "center",
  },
  buttonText: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },
  button: {
    textAlign: "center",
    color: COLORS.WHITE,
    backgroundColor: COLORS.BUTTON_PRIMARY,
    padding: "6%",
    width: "100%",
    bottom: -25,
    borderRadius: 6,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    justifyContent: "center",
  },
});

const HOME = StyleSheet.create({
  searchContainer: {
    backgroundColor: COLORS.NAVBAR_BACKGROUND,
    height: "100%",
    width: "90%",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  animeCard: {
    paddingVertical: 15,
    marginRight: 10,
    width: 90, // Decrease the width to make the images smaller
    alignItems: "center",
    overflow: "visible",
  },
  animeCard2: {
    paddingVertical: 15,
    marginRight: 18,
    width: 90, // Decrease the width to make the images smaller
    alignItems: "center",
    overflow: "hidden",
  },
  animeCardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    justifyContent: "flex-start", // Align the container with the left wall
    flex: 1,
  },
  animeCardContainer3: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    justifyContent: "flex-start", // Align the container with the left wall
  },
  animeCardContainer2: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap items to the next line
    flex: 1,
    justifyContent: "space-around", // Align the cards to the left
  },
  animeCardImage: {
    resizeMode: "cover",
    borderRadius: 10,
    width: "100%", // Decrease the width of the image to make it smaller
    aspectRatio: 3 / 4, // Adjust the aspect ratio accordingly
  },
  animeCardText: {
    color: COLORS.TEXT_GRAY,
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
    textAlign: "center",
    flexWrap: "wrap",
  },

  container: {
    alignItems: "center",
    backgroundColor: COLORS.DARK_BACKGROUND,
    width: "100%",
    height: "100%",
    padding: 17.5,
  },
  top: {
    height: "5.5%",
    width: "100%",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  search: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    width: "85%",
  },
  featured: {
    width: "100%",
    flex: 1,
    height: 200,
  },
  cardContainerTitle: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  cardContainerTitle2: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    width: "80%",
    textAlign: "center",
  },
  cardContainerTitle3: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
  showMore: {
    color: COLORS.GRAY,
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
  },
  cardContainerText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  cardContainerText2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 24,
  },
  cardContainer: {
    flex: 1,
    height: 200,
    paddingBottom: 10,
  },
});

const DETAILS = StyleSheet.create({
  container: {
    backgroundColor: COLORS.DARK_BACKGROUND,
    width: "100%",
    flexGrow: 1,
  },
  score: {
    color: COLORS.NAVBAR_ACTIVE_TINT,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
  },
  banner: {
    padding: 0,
    resizeMode: "cover",
    aspectRatio: 16 / 9,
    width: "100%",
    height: "100%",

    zIndex: 0,
  },
  bannerContainer: {
    height: 300,
  },
  bannerButtons: {
    padding: 24,
    marginTop: 24,
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    width: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  buttonBackContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 42,
    height: 42,
    backgroundColor: COLORS.WHITE,
    borderRadius: 50,
  },
  buttonBackContainer2: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 42,
    height: 42,
    backgroundColor: COLORS.BUTTON_PRIMARY,
    borderRadius: 50,
  },
  buttonBack: {
    color: "black",
    fill: "black",
  },
  blurView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
    zIndex: 1, // Make sure this is higher than the other elements to display the blur properly
  },
  type: {
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
    color: "rgba(255, 255, 255, 0.6)",
    paddingBottom: 8,
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    paddingBottom: 8,
    width: "72.5%",
    flexWrap: "wrap",
  },
  otherContainer: {
    padding: 17.5,
    position: "absolute",
    marginBottom: 32,
  },

  scoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  coverImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  coverImageContainer: {
    width: 100,
    height: "100%",
  },
  titleContainer: {
    height: 200,
    top: 175,
    flexDirection: "row",
    position: "absolute",
    padding: 24,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    shadowRadius: 10,
    justifyContent: "center", // Add this line
    alignItems: "center", // Add this line
  },
  titleInfoContainer: {
    marginLeft: 10,
    flex: 1, // Add this line
  },

  // Below Title
  contentContainer: {
    padding: 17.5,
    width: "100%",
    flex: 1,
    marginTop: 64,
  },

  editButtonText: {
    color: COLORS.WHITE,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
  },
  editButtonTextContainer: {
    padding: 10,
    borderRadius: 6,
    borderColor: "white",
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: COLORS.BUTTON_PRIMARY,
    padding: 14,
    borderRadius: 10,
    fontSize: "Montserrat-Regular",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shortStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  editButtonContainer: {
    marginBottom: 24,
  },
  shortStatsType: {
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "Montserrat-Regular",
    paddingVertical: 8,
    marginRight: 8,
    textAlign: "center",
  },
  shortStatsNumber: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  shortStatsDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-around",
    textAlign: "center",
  },

  // Description
  descriptionTitleText: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    color: COLORS.SUBTEXT,
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
    letterSpacing: 0.25,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  readMore: {
    fontSize: 13,
    letterSpacing: 0.25,
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },

  // Releasing
  releasingTitleText: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
  },
  releasingTitleEpisodeText: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-SemiBold",
    fontSize: 15,
  },
  // Tags
  tagContainer2: {
    padding: 10,
    backgroundColor: "#080E1E",
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#080E1E",
  },
  selectedTagContainer: {
    borderColor: "white",
  },
  tagContainer: {
    padding: 10,
    backgroundColor: COLORS.TAG_BACKGROUND,
    marginRight: 8,
    borderRadius: 4,
  },
  tag2Container: {
    padding: 10,
    backgroundColor: COLORS.TAG_BACKGROUND,
    marginRight: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  tagText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
  },

  characterImagecontainer: {
    width: 50,
    height: 50,
  },
  characterImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  characterContainer: {
    padding: 10,
    marginRight: 8,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  characterName: {
    marginTop: 8,
    color: COLORS.WHITE,
    fontSize: 12,
    fontFamily: "Montserrat-Regular",
  },

  // Short Reviews
  shortReviewContainer: {
    width: "100%",
    padding: 16,
    backgroundColor: COLORS.REVIEW_BACKGROUND,
    borderTopEndRadius: 16,
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16,
  },
  shortReviewInfoContainer: {
    flexDirection: "row",
    height: 50,
    marginBottom: 12,
  },
  reviewInfoContainer: {
    flexDirection: "row",
    height: 60,
    marginBottom: 16,
  },
  shortReviewUserImage: {
    height: "100%",
    width: 50,
    borderRadius: 50,
    marginRight: 16,
  },
  reviewUserImage: {
    height: "100%",
    width: 60,
    borderRadius: 50,
    marginRight: 16,
  },
  shortReviewUsername: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
  reviewUsername: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 19,
  },
  shortReviewScore: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    textAlign: "center",
  },
  reviewScore: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    textAlign: "center",
  },
  shortReviewText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "Montserrat-Medium",
  },
  shortReviewTitle: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  reviewTitle: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginBottom: 16,
  },
  shortReviewButtonsContainer: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 16,
  },
  shortReviewRatingText: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
  },
  shortReviewButtonsContainerSection: {
    flexDirection: "row",
    marginRight: 20,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  shortReviewRatingDivider: {
    width: 1,
    backgroundColor: COLORS.WHITE,
    height: "60%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: 20,
  },
  showMore: {
    color: "rgba(173, 150, 244, 1)",
    fontFamily: "Montserrat-Regular",
    marginBottom: 8,
  },

  descriptionTextContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    //Trailer
    trailerImage: {
      width: 200,
      height: 125,
      resizeMode: "cover",
    },
  },
});

const MODAL = StyleSheet.create({
  //notification modal
  notificationModalContainer: {
    backgroundColor: COLORS.DARK_BACKGROUND,
    height: 100,
    marginBottom: 12,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },
  notificationModalDateText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
  },
  notificationModalImageContainer: {
    height: "100%",
    width: "22.5%",
    marginRight: 12,
  },
  notificationModalImage: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    borderRadius: 6,
  },
  notificationModalTitleText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "Montserrat-Medium",
    fontSize: 12,
  },
  notificationModalTypeText: {
    color: "white",
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
  },
  notificationModalInfoText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "Montserrat-Light",
    fontSize: 12,
  },
  // [id] modal
  textFilters: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
  },
  changePageTextOff: {
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  changePageText: {
    textAlign: "center",
    color: COLORS.WHITE,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
  },
  bar: {
    width: "35%",
    height: 5,
    borderRadius: 50,
    backgroundColor: "rgba(217, 217, 217, 0.4)",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 12,
  },
  episodeCount: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    zIndex: 2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121828",
    color: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 24,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  container2: {
    flex: 1,
    zIndex: 2,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#121828",
    color: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 24,
    overflow: "hidden",
  },
  button: {
    backgroundColor: COLORS.BUTTON_PRIMARY,
    borderRadius: 50,
    padding: 12,
  },
  buttonText: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 14,
    textAlign: "center",
  },

  container1: {
    flex: 1,
    backgroundColor: "#080E1E",
  },
  dropdown: {
    marginVertical: 12,
    height: 50,
    color: "white",
    backgroundColor: "#080E1E",
    borderRadius: 6,
    padding: 12,
    shadowColor: "#080E1E",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown2: {
    height: 40,
    color: "white",
    backgroundColor: "#080E1E",
    borderRadius: 6,
    padding: 12,
    shadowColor: "#080E1E",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  dropdown3: {
    color: "white",
    backgroundColor: COLORS.TAG_BACKGROUND,
    borderRadius: 6,
    marginTop: 6,
    paddingHorizontal: 12,
    shadowColor: "#080E1E",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#080E1E",
  },
  textItem: {
    backgroundColor: "transparent",
    color: "white",
    borderWidth: 0,
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "white",
  },
});
const WATCHING = StyleSheet.create({
  // Uh oh
  uhOhTitle: {
    color: COLORS.WHITE,
    fontFamily: "Montserrat-Medium",
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
  },
  uhOhSubtitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
  cardContainer: {
    width: "100%",
    height: 130,
    marginBottom: 20,
    flexDirection: "row",
  },
  cardImageContainer: {
    width: "30%",
    height: "100%",
    marginRight: 15,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 12,
  },
  cardTitle: {
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  cardInfoText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.4)",
    marginBottom: 10,
  },
  statusText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 13,
    color: "white",
  },
  addEpisodeContainer: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: "#0F182F",
    flexDirection: "row",
    alignItems: "center",
  },
  addEpisodeText: {
    fontFamily: "Montserrat-Regular",
    fontSize: 12,
    color: "white",
  },
});

const SETTINGS = StyleSheet.create({
  sectionContainer: {
    marginVertical: 12,
  },
});
const STYLES = { LOGIN, HOME, DETAILS, MODAL, WATCHING, SETTINGS };

export default STYLES;
