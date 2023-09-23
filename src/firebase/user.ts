import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../main.tsx';
import { User } from '../model/User.ts';

async function getUser(id: string): Promise<User | null> {
  const userDocumentRef = doc(firestore, 'user', id);
  const userDocument = await getDoc(userDocumentRef);

  if (userDocument.exists() && userDocument.data()) {
      return new User(id, userDocument.data().leaderboard, userDocument.data().carbonSaved);
  } else {
      return null;
  }
}

async function saveUser(user: User) {
  const userDocumentRef = doc(firestore, 'user', user.id);
  await setDoc(userDocumentRef, {
      leaderboard: user.leaderboard,
      carbonSaved: user.carbonSaved,
  });
}