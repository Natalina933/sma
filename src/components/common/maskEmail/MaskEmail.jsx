
const maskEmail = (email) => {
  const [username, domain] = email.split('@');
  if (username.length <= 3) {
    return '*'.repeat(username.length) + '@' + domain;
  }
  const maskedUsername = username.slice(0, 2) + '***' + username.slice(-1);
  return maskedUsername + '@' + domain;
};
