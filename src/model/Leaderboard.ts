export class Leaderboard {
  constructor(
      public id: string,
      public users: string[],
  ) {
      this.id = id;
      this.users = users;
  }
}