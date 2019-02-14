/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: 'JSON'
    })
  },

  unfollowUser: id => {
    return $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: 'JSON'
    })
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      url: '/users/search',
      data: {query: queryVal},
      dataType: 'JSON',
      success: function(data){
        success(data);
      }
    });
  }
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js")

class FollowToggle {
  constructor(el, options){
    this.userId = $(el).data('user-id') || options.userId;

    console.log(options);
    if (options) {
      this.followState = String(options.followState);
    } else {
      this.followState = String($(el).data('follow-state'));
    }
    // this.followState = (options.followState || 'false');
    // this.followState = String(this.followState);
    // console.log(typeof String($(el).data('follow-state')));
    // $(el).data('follow-state'
    
    this.$el = $(el);

    this.render();
    this.$el.on('click', (e) =>{ 
      e.preventDefault();
      this.handleClick();
    });
  }

  render() {
    if (this.followState === 'false') {
      this.$el.prop("disabled", false)
      this.$el.text("Follow!");
    } else if (this.followState === 'true') {
      this.$el.prop("disabled", false)
      this.$el.text("Unfollow!");
    } else if (this.followState === 'following' || this.followState === 'unfollowing' ){
      this.$el.prop("disabled", true);
    }
  }


  handleClick() {
      if (this.followState === 'false') {
        this.followState = 'following';
        this.render();

        APIUtil.followUser(this.userId)
        .then(() => {
          this.followState = 'true';
          this.render();
        });

      } else if (this.followState === 'true') {
        this.followState = 'unfollowing';
        this.render();
        APIUtil.unfollowUser(this.userId).then(() => {
          this.followState = 'false';
          this.render();
        })
      }
  }
}

module.exports = FollowToggle;

/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js")
$(() => {
  $('button.follow-toggle').each( (idx, el) => {
    new FollowToggle(el);
  });

  new UsersSearch($('.users-search'));
  
});

/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = this.$el.children("input").first();
    this.$ul = $(".users");

    this.$input.on('input', e => {
      e.preventDefault();
      this.handleInput();
    });
  }

  handleInput() {
    APIUtil.searchUsers(this.$input.val(), this.renderResults.bind(this));

    // APIUtil.searchUsers(this.$input.val(), (data) => {
    //   this.renderResults(data);
    // });
  }

  renderResults(json){
    this.$ul.empty();
    json.forEach( el => {
      // List
      const $li = $("<li>");
      $li.append($(`<a href="/users/${el.id}/">${el.username}</a>`));
      //Button
      const $button = $('<button>');
      // $button.attr("data-user-id", el.id);
      $li.append($button);
      console.log(new FollowToggle($button, {followState: el.followed, userId: el.id }));

      // Append to UL
      this.$ul.append($li);

    });

  }

}

module.exports = UsersSearch;



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map