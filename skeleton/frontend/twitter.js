const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js')
$(() => {
  $('button.follow-toggle').each( (idx, el) => {
    new FollowToggle(el);
  });

  new UsersSearch($('.users-search'));
  
});