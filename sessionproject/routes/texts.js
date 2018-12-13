const userText = {
  title: 'All logged users',
  header: 'To all logged users',
  info: 'This page is shown only to users with normal user privileges.' + ' This page requires user to login'
};

const adminText = {
  title: 'Secret data',
  header: 'Secret',
  info: 'This page for admins only.'
};

const allText = {
  title: 'All users',
  header: 'To all users',
  info: 'This page doesn\'t require login.'
};

module.exports = {
  userText,
  adminText,
  allText
};
