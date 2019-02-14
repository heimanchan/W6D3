const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

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

