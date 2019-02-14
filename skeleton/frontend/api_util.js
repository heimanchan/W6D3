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