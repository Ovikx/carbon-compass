import { User } from "../model/User";
import { getLeaderboardData, saveLeader } from "./leaderboard";
import { getUser, saveUser } from "./user";

export async function getUsersFromLeaderboard(id: string): Promise<User[]> {
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

export async function registerUser(name: string, carbonSaved: number) {
  let user = await getUser(name);
  if (!user) {
    user = new User(name, "", carbonSaved);
    console.log(user);
    await saveUser(user);
  }
}

export async function addCarbonSavedToUser(name: string, carbonSaved: number) {
  let user = await getUser(name);
  if (user) {
    user.carbonSaved += carbonSaved;
    await saveUser(user);
  }
}

export async function addLeaderboardToUser(name: string, leaderboard: string) {
  let user = await getUser(name);

  if (user) {
    user.leaderboard = leaderboard;
    await saveUser(user);
  } else {
    return;
  }

  let lb = await getLeaderboardData(leaderboard);
  if (!lb) {
    return;
  }

  console.log(lb);
  lb.users.push(user.id);
  await saveLeader(lb);
}
