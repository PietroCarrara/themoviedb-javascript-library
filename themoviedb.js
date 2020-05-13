/*
 * The MIT License (MIT)
 *
 * Copyright (c) Franco Cavestri
 *
 * https://github.com/cavestri/themoviedb-javascript-library
 *
 */

var theMovieDb = {};

theMovieDb.common = {
    api_key: "YOUR_KEY",
    base_uri: "http://api.themoviedb.org/3",
    images_uri: "http://image.tmdb.org/t/p",
    timeout: 5000,
    language: "en-US",
    generateParams: function (options) {
        var options = options || {};

        options['api_key'] = this.api_key;
        options['language'] = this.language;

        return options;
    },
    getImage: function (size, file) {
        if (size.startsWith('/')) {
            size = size.substring(1);
        }
        if (file.startsWith('/')) {
            file = file.substring(1);
        }

        return `${this.images_uri}/${size}/${file}`;
    },
    fetch: function (path, options) {
        options = options || {};

        if (typeof options.headers === 'undefined') {
            options.headers = {};
        }

        options.url = path;
        options.baseURL = this.base_uri;
        options.params = this.generateParams(options.params);

        options.headers['Content-Type'] = 'application/json';
        options.headers['Accept'] = 'application/json';

        return axios(options).then(r => r.data);
    }
};

theMovieDb.configurations = {
    getConfiguration: function () {
        return theMovieDb.common.fetch('configuration');
    },
    getCountries: function () {
        return theMovieDb.common.fetch("configuration/countries");
    },
    getJobs: function () {
        return theMovieDb.common.client("configuration/jobs");
    },
    getLanguages: function () {
        return theMovieDb.common.client("configuration/languages");
    },
    getPrimaryTranslations: function () {
        return theMovieDb.common.client("configuration/primary_translations");
    },
    getTimezones: function () {
        return theMovieDb.common.client("configuration/timezones");
    }
};

theMovieDb.account = {
    getInformation: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id"]);

        return theMovieDb.common.fetch("account", options);
    },
    getLists: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/lists`, options);
    },
    getFavoritesMovies: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/favorite/movies`, options);
    },
    getFavoritesTvShows: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/favorite/tv`, options);
    },
    addFavorite: function (id, mediaType, mediaId, favorite, options) {
        options = options || {};

        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "favorite"]);

        options.method = 'post';
        options.body = {
            'media_type': mediaType,
            'media_id': mediaId,
            'favorite': favorite,
        };

        return theMovieDb.common.fetch(`account/${id}/favorite`, options);
    },
    getRatedMovies: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/rated/movies`, options);
    },
    getRatedTvShows: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/rated/tv`, options);
    },
    getRatedTvEpisodes: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/rated/tv/episodes`, options);
    },
    getMovieWatchlist: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/watchlist/movies`, options);
    },
    getTvShowsWatchlist: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`account/${id}/watchlist/tv`, options);
    },
    addToWatchlist: function (id, mediaType, mediaId, watchlist, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_type", "media_id", "watchlist"]);

        options.method = 'post';
        options.body = {
            "media_type": mediaType,
            "media_id": mediaId,
            "watchlist": watchlist
        }

        return theMovieDb.common.fetch(`account/${id}/watchlist`, options);
    }
};

theMovieDb.authentication = {
    generateToken: function () {
        theMovieDb.common.client({
            url: "authentication/token/new" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    },
    askPermissions: function (options) {
        window.open("https://www.themoviedb.org/authenticate/" + options.token + "?redirect_to=" + options.redirect_to);

    },
    validateUser: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["request_token", "username", "password"]);

        theMovieDb.common.client({
            url: "authentication/token/validate_with_login" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    generateSession: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["request_token"]);

        theMovieDb.common.client({
            url: "authentication/session/new" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    generateGuestSession: function () {
        theMovieDb.common.client({
            url: "authentication/guest_session/new" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    }
};

theMovieDb.certifications = {
    getMovieList: function () {
        theMovieDb.common.client({
            url: "certification/movie/list" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    },
    getTvList: function () {
        theMovieDb.common.client({
            url: "certification/tv/list" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    }
};

theMovieDb.changes = {
    getMovieChanges: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "movie/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getPersonChanges: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "person/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTvChanges: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "tv/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.collections = {
    getDetails: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "collection/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getImages: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "collection/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTranslations: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "collection/" + options.id + "/translations" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.companies = {
    getDetails: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "company/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAlternativeNames: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "company/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }

};

theMovieDb.credits = {
    getDetails: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "credit/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.discover = {
    getMovies: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "discover/movie" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTvShows: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "discover/tv" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }

};

theMovieDb.find = {
    getById: function (id, externalSource, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id", "external_source"]);
        options = options || {};

        options.params = options.params || {};
        options.params.external_source = externalSource;

        return theMovieDb.common.fetch(`/find/${id}`, options);
    }
};

theMovieDb.genres = {
    getMovieList: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "genre/movie/list" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getMovies: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "genre/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTvList: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "genre/tv/list" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }

};

theMovieDb.guestSession = {
    getRatedMovies: function () {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/movies" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    },
    getRatedTvShows: function () {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/tv" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    },
    getRatedTvEpisodes: function () {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, ["id"]);

        theMovieDb.common.client({
            url: "guest_session/" + options.id + "/rated/tv/episodes" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    }
};

theMovieDb.keywords = {
    getById: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "keyword/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getMovies: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "keyword/" + options.id + "/movies" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.lists = {
    getById: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "list/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getStatusById: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id", "movie_id"]);

        theMovieDb.common.client({
            url: "list/" + options.id + "/item_status" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    addList: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "name", "description"]);

        var body;

        body = {
            "name": options.name,
            "description": options.description
        };

        delete options.name;
        delete options.description;

        if (options.hasOwnProperty("language")) {
            body["language"] = options.language;

            delete options.language;
        }

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list" + theMovieDb.common.generateQuery(options),
            body: body
        },
            success,
            error
        );
    },
    addItem: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        var body;

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list/" + options.id + "/add_item" + theMovieDb.common.generateQuery(options),
            body: body
        },
            success,
            error
        );
    },
    removeItem: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "media_id"]);

        var body;

        body = {
            "media_id": options.media_id
        };

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "list/" + options.id + "/remove_item" + theMovieDb.common.generateQuery(options),
            body: body
        },
            success,
            error
        );
    },
    removeList: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        theMovieDb.common.client({
            method: "DELETE",
            status: 204,
            url: "list/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    clearList: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id", "confirm"]);

        theMovieDb.common.client({
            method: "POST",
            status: 204,
            body: {},
            url: "list/" + options.id + "/clear" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.movies = {
    getById: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}`, options);
    },
    getAccountStates: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`/movie/${id}/account_states`, options);
    },
    getAccountStatesGuest: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

        return theMovieDb.common.fetch(`/movie/${id}/account_states`, options);
    },
    getAlternativeTitles: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/alternative_titles`, options);
    },
    getChanges: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/changes`, options);
    },
    getCredits: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/credits`, options);
    },
    getExternalIds: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/external_ids`, options);
    },
    getImages: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/images`, options);
    },
    getKeywords: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/keywords`, options);
    },
    getReleases: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/release_dates`, options);
    },
    getVideos: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/videos`, options);
    },
    getTranslations: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/translations`, options);
    },
    getRecommendations: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/recommendations`, options);
    },
    getSimilarMovies: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/similar`, options);
    },
    getReviews: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/reviews`, options);
    },
    getLists: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`/movie/${id}/lists`, options);
    },
    getLatest: function () {
        return theMovieDb.common.fetch('/movie/latest');
    },
    getUpcoming: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('/movie/upcoming', options);
    },
    getNowPlaying: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('movie/now_playing', options);
    },
    getPopular: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('movie/popular', options);
    },
    getTopRated: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('movie/top_rated', options);
    },
    rate: function (id, rating, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 4, options, ["session_id || guest_session_id", "id"]);

        options.method = 'post';
        options.body = {
            'value': rating,
        };

        return theMovieDb.common.fetch(`movie/${id}/rating`, options);
    },
    removeRate: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id || guest_session_id", "id"]);

        options.method = 'delete';

        return theMovieDb.common.fetch(`movie/${id}/rating`, options);
    },
};

theMovieDb.networks = {
    getById: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "network/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAlternativeNames: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "network/" + options.id + "/alternative_names" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.people = {
    getById: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getMovieCredits: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/movie_credits" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTvCredits: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/tv_credits" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/combined_credits" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/external_ids" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/images" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTaggedImages: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/tagged_images" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "person/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getPopular: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.client({
            url: "person/popular" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getLatest: function (success, error) {
        theMovieDb.common.client({
            url: "person/latest" + theMovieDb.common.generateQuery()
        },
            success,
            error
        );
    }
};

theMovieDb.reviews = {
    getById: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "review/" + options.id + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.search = {
    getMovie: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/movie" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getCollection: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/collection" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getTv: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/tv" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getPerson: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/person" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getCompany: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/company" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getKeyword: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/keyword" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getMulti: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["query"]);

        theMovieDb.common.client({
            url: "search/multi" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.tv = {
    getById: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}`, options);
    },
    getAccountStates: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "id"]);

        return theMovieDb.common.fetch(`tv/${id}/account_states`, options);
    },
    getAccountStatesGuest: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "id"]);

        return theMovieDb.common.fetch(`tv/${id}/account_states`, options);
    },
    getAlternativeTitles: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/alternative_titles`, options);
    },
    getChanges: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/changes`, options);
    },
    getContentRatings: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/content_ratings`, options);
    },
    getCredits: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/credits`, options);
    },
    getExternalIds: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/external_ids`, options);
    },
    getImages: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client(`tv/${id}/images`, options);
    },
    getKeywords: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client(`tv/${id}/keywords`, options);

    },
    getRecommendations: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/recommendations`, options);
    },
    getReviews: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/reviews`, options);
    },
    getScreenedTheatrically: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/screened_theatrically`, options);
    },
    getSimilar: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        return theMovieDb.common.fetch(`tv/${id}/similar`, options);
    },
    getTranslations: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client(`tv/${id}/translations`, options);
    },
    getVideos: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client(`tv/${id}/videos`, options);
    },
    getAiringToday: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        theMovieDb.common.fetch('tv/airing_today', options);
    },
    getLatest: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 2, "", "", true);

        return theMovieDb.common.fetch('tv/latest', options);
    },
    getOnTheAir: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch(`tv/on_the_air`, options);
    },
    getPopular: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('tv/popular', options);
    },
    getTopRated: function (options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, "", "", true);

        return theMovieDb.common.fetch('tv/top_rated', options);
    },
    rate: function (id, rating, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 4, options, ["session_id || guest_session_id", "id"]);

        options.method = 'post';
        options.body = {
            value: rating
        };

        return theMovieDb.common.fetch(`tv/${id}/rating`, options);
    },
    removeRate: function (id, options) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id || guest_session_id", "id"]);

        options.method = 'delete';

        return theMovieDb.common.fetch(`tv/${id}/rating`, options);
    },
};

theMovieDb.tvSeasons = {
    getById: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "tv/season/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAccountStates: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAccountStatesGuest: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/account_states" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/credits" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/external_ids" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/images" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/videos" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

theMovieDb.tvEpisodes = {
    getById: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getChanges: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["id"]);

        theMovieDb.common.client({
            url: "tv/episode/" + options.id + "/changes" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAccountStates: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["session_id", "episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getAccountStatesGuest: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["guest_session_id", "episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/account_states" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getCredits: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/credits" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getExternalIds: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/external_ids" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getImages: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/images" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    getVideos: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "id"]);

        theMovieDb.common.client({
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/videos" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    rate: function (options, rate, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "session_id", "id"]);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": rate
            }
        },
            success,
            error
        );
    },
    rateGuest: function (options, rate, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 4, options, ["episode_number", "season_number", "guest_session_id", "id"]);

        theMovieDb.common.client({
            method: "POST",
            status: 201,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options),
            body: {
                "value": rate
            }
        },
            success,
            error
        );
    },
    removeRate: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "session_id", "id"]);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    },
    removeRateGuest: function (options, success, error) {
        // TODO: Validate arguments
        // theMovieDb.common.validateRequired(arguments, 3, options, ["episode_number", "season_number", "guest_session_id", "id"]);

        theMovieDb.common.client({
            method: "DELETE",
            status: 200,
            url: "tv/" + options.id + "/season/" + options.season_number + "/episode/" + options.episode_number + "/rating" + theMovieDb.common.generateQuery(options)
        },
            success,
            error
        );
    }
};

if ((typeof module != 'undefined') && (module.exports)) {
    module.exports = theMovieDb;
}
