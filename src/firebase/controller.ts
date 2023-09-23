import { User } from "../model/User";
import { getLeaderboardData } from "./leaderboard";
import { getUser } from "./user";

async function getUsersFromLeaderboard(id: string): Promise<User[]> {
  let lb = await getLeaderboardData(id);
  let users: User[] = [];
  if (!lb) {
    return users;
  }
  for (let i = 0; i < lb.users.length; i++) {
    let user = await getUser(lb.users[i]);
    if (user) {
      users.push(user);
    }
  }
  users.sort((a, b) => {
    return b.carbonSaved - a.carbonSaved;
  });

  return users;
}