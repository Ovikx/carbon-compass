export class User {
  constructor(
      public id: string,
      public leaderboard: string,
      public carbonSaved: number,
  ) {
      this.id = id;
      this.leaderboard = leaderboard;
      this.carbonSaved = carbonSaved;
  }
}