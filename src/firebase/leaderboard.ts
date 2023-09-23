import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../main.tsx';
import { Leaderboard } from '../model/Leaderboard.ts';
// get the leaderboard data from the firebase leaderboard
export async function getLeaderboardData(id: string): Promise<Leaderboard | null> {
    const leaderboardDocumentRef = doc(firestore, 'leaderboard', id);
    const leaderboardDocument = await getDoc(leaderboardDocumentRef);

    if (leaderboardDocument.exists()) {
        return new Leaderboard(id, leaderboardDocument.data().users);
    } else {
        return null;
    }
}


export async function saveLeader(lb: Leaderboard) {
    const lbDocumentRef = doc(firestore, 'leaderboard', lb.id);
    await setDoc(lbDocumentRef, {
        users: lb.users,
    });
  }
