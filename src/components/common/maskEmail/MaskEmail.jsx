

  // Fonction pour masquer une partie de l'email
  const maskEmail = (email) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 3) + '...'; // Masquer une partie de l'email
    return maskedUsername + '@' + domain;
  };