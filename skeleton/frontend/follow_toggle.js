const APIUtil = require('./api_util.js')

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