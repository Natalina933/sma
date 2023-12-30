import React from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import styles from './update.module.css';

const UpdateProfile = () => {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users/update', {
      id: session.user.id,
      email: user.email,
      name: user.name,
    })
      .then(() => {
        setUser({ ...user });
        router.push('/profile');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (session.user) {
      axios.get('/api/users/' + session.user.id)
        .then(response => setUser(response.data))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [session.user]);

  return (
    <div className={styles.container}>
      <h1>Mise à jour du profil</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
        />
        <label>Nom:</label>
        <input
          type="text"
          value={user.name}
          onChange={(event) => setUser({ ...user, name: event.target.value })}
        />
        <button type="submit">Sauvegarder</button>
      </form>
    </div>
  );
};

export default UpdateProfile;