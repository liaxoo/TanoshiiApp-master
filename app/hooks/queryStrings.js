export let PopularAnimeQuery = `
query($perPage: Int, $page: Int, $format: MediaFormat) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: POPULARITY_DESC, type: ANIME, format: $format, isAdult: false) {
      id
      title {
        romaji
        english
        userPreferred
		native
      }
      bannerImage
      coverImage {
        medium
        large
        extraLarge
      }
      description
      episodes
    }
  }
}
`;

export let TrendingAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :TRENDING_DESC, type : ANIME){
				id
				favourites
				        trends {
          edges {
            node {
              episode
            }
          }
        }
		        trends {
            nodes {
              popularity
              inProgress
              trending
            }
        }
				title {
					romaji
					english
					userPreferred
					native
				}
				bannerImage
				coverImage {
					color
					medium
        	large
        	extraLarge
				}
				description
				episodes

			}
		}
	}
`;

export let RecentlyUpdatedAnimeQuery = `
query($perPage: Int, $page: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
      currentPage
      lastPage
      hasNextPage
    }
    media(sort: [UPDATED_AT_DESC, POPULARITY_DESC],isAdult: false, type: ANIME, status: RELEASING) {
      id
      title {
        romaji
        english
        userPreferred
		native
      }
      bannerImage
      coverImage {
        medium
        large
        extraLarge
      }
      description
      episodes
    }
  }
}
`;

export let top100AnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :SCORE_DESC, type : ANIME){
				id
				title {
					romaji
					english
					userPreferred
					native
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes

			}
		}
	}
`;

export let favouritesAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort: FAVOURITES_DESC, type: ANIME) {
				id
				title {
					romaji
					english
					userPreferred
					native
				}
				bannerImage
				coverImage {
					medium
					large
					extraLarge
				}
				description
				episodes
			}
		}
	}
`;

export let searchAnimeQuery = `
	query($search: String, $tag: String, $genre: [String], $sort: [MediaSort], $status: [MediaStatus], $season: MediaSeason, $page: Int) {
		Page(page: $page, perPage: 100) {
			media(search: $search, type: ANIME, sort: $sort, isAdult: false, tag: $tag, genre_in: $genre, status_in: $status, season: $season) {
				id
				season
				title {
					romaji
					english
					native
					userPreferred

				}
				genres
				bannerImage
				coverImage {
					extraLarge
					large
				}
			}
		}
	}
`;

export let searchByIdQuery = `
	query($id: Int) {
		Media(id: $id, type: ANIME){
			airingSchedule {
				edges {
				node {
					airingAt
					episode
					id
				}
				}
			}
			      nextAiringEpisode {
        airingAt
        episode
        id
        timeUntilAiring
      }
			trailer {
				id
				thumbnail
				site
			}
			externalLinks {
				url
				icon
				type
				site
				color
			}
			title {
				romaji
				english
				native
				userPreferred
			}
			isFavourite
			mediaListEntry {
				private
				progress
				score
				repeat
				status
				updatedAt
				completedAt {
					day
					month
					year
				}
				startedAt {
					day
					month
					year
				}
			}
			id
			type
			status
			genres
			description
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
            episodes
			characters(perPage: 12, sort: FAVOURITES_DESC) {
				nodes {
					id
					name {
						full
						first
					}
					image {
						large
					}
				}
			}
			studios(sort: FAVOURITES_DESC) {
				nodes {
					name
				}
			}
			staff(sort: FAVOURITES_DESC) {
				nodes {
					name {
						full
					}
				}
			}
			tags {
				name
			}
			format
			averageScore
			bannerImage
			favourites
			reviews(perPage: 3, sort: RATING_DESC) {
				nodes {
					body
					createdAt
					id
					rating
					ratingAmount
					summary
					score
					user {
						name
						avatar {
							large
						}
					}
				}
			}
			coverImage {
				extraLarge
				large
			}
			recommendations(sort: RATING_DESC) {
				edges {
					node {
						mediaRecommendation {
							title {
								english
								romaji
								native
							}
							id
							coverImage {
								extraLarge
							}
						}
					}
				}
			}
		}
	}
`;

export let searchWatchedId = `
	query($ids: [Int]) {
		Page(page: 1, perPage: 100) {
			media(idMal_in: $ids, type: ANIME, sort: SEARCH_MATCH){
				title {
					romaji
					userPreferred
					english
					native
				}
				coverImage {
					large
					extraLarge
				}
				idMal
			}
		}
	}
`;

export let searchByAniIdQuery = `
	query($id: Int) {
		Media(id: $id){
			title {
				romaji
				english
				native
				userPreferred
			}
			type
			status
			genres
			description
			startDate {
				year
				month
				day
			}
			endDate {
				year
				month
				day
			}
			averageScore
			bannerImage
			coverImage {
				extraLarge
				large
			}
		}
	}
`;

export let searchByReviewId = `
	query($id: Int) {
		Review(id: $id) {
			body
			createdAt
			id
			rating
			ratingAmount
			summary
			score
			user {
				name
				avatar {
					large
				}
			}
		}
	}
`;

export let userInfoTokenQuery = `
	query { 
		Viewer {
			id
			name
			avatar {
			large
			}
			statistics {
				anime {
					count
					episodesWatched
					meanScore
					minutesWatched
					genres {
					genre
					count
					}
				}
			}
			favourites {
				characters {
					nodes {
					name {
						first
						full
					}
					image {
						large
					}
					id
					isFavourite
					}
				}
				anime {
					edges {
					node {
						id
						coverImage {
						extraLarge
						}
						title {
						romaji
						english
						native
						userPreferred
						}
					}
				}
			}
			}
		createdAt
		about
		}
	}
`;

export let userNotificationQuery = `
query {
  Viewer {
  unreadNotificationCount
}

  Page {
    notifications(type: AIRING, resetNotificationCount: true) {
            ... on ActivityMessageNotification {
        id
        userId
        type
        activityId
        context
        createdAt
        message {
          message
          messenger {
            avatar {
              large
            }
            name
          }
        }
        user {
        name
        avatar {
          large
        }  
        }
      }
      ... on AiringNotification {
        id
        type
        animeId
        episode
        contexts
        createdAt
        media {
          coverImage {
            extraLarge
          }
          type
          seasonYear
          id
          title {
            userPreferred
			native
			english
			romaji
          }
        }
      }

    }
  }
}
`;

export let userWatchingQuery = `
query($userId: Int) {
  MediaListCollection(userId: $userId, type: ANIME, status: CURRENT) {
    lists {
      entries {
        id
        progress
        completedAt {
          day
          month
          year
        }
        startedAt {
          day
          month
          year
        }
        score
        media {
          id
          season
          title {
            english
            userPreferred
			romaji
			native
          }
          coverImage {
            extraLarge
          }
          episodes
        }
      }
    }
  }
}
`;

export let userMutationQuery = `
mutation($mediaId: Int, $progress: Int, $status: MediaListStatus, $repeat: Int, $private: Boolean, $startedAt: FuzzyDateInput, $completedAt: FuzzyDateInput, $score: Float) {
  SaveMediaListEntry(mediaId: $mediaId, progress: $progress, status: $status, repeat: $repeat, private: $private, startedAt: $startedAt, completedAt: $completedAt, score: $score) {
    id
  }
}
`;

export let characterQuery = `
query($id: Int) {
  Character(id: $id) {
    age
    image {
      large
    }
    name {
      full
      first
      userPreferred
    }
    description
    dateOfBirth {
      day
      month
      year
    }
    gender
    isFavourite
    favourites
  }
}
`;

export let fullReviewQuery = `
query($id: Int) {
		Media(id: $id, type: ANIME){
			reviews(perPage: 30, sort: RATING_DESC) {
				nodes {
					summary
					body
					createdAt
					id
					rating
					ratingAmount
					summary
					score
					user {
						name
						avatar {
							large
						}
					}
				}
			}
			}
		}
	
`;
