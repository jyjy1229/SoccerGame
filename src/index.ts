type PlayerType = "ST" | "GK";

interface PlayerInfo {
  name: string;
  height: number;
  weight: number;
}

interface strikerStats {
  goals: number;
  misses: number;
}

interface goalKeeperStats {
  saves: number;
  conceded: number;
}

abstract class Player {
  protected playerInfo: PlayerInfo;

  constructor(playerInfo: PlayerInfo) {
    this.playerInfo = playerInfo;
  }

  abstract printStats(): void;
}

class GoalKeeper extends Player {
  private stats: goalKeeperStats = {
    saves: 0,
    conceded: 0,
  };

  printStats(): void {
    console.log(
      `${this.playerInfo.name} saves ${this.stats.saves} times and concedes ${this.stats.conceded} times`
    );
  }

  saves(times: number): void {
    this.stats.saves += times;
  }

  conceded(times: number): void {
    this.stats.conceded += times;
  }
}

class Striker extends Player {
  private stats: strikerStats = {
    goals: 0,
    misses: 0,
  };

  printStats(): void {
    console.log(
      `${this.playerInfo.name} goals ${this.stats.goals} times and misses ${this.stats.misses} times`
    );
  }

  goals(times: number): void {
    this.stats.goals += times;
  }

  misses(times: number): void {
    this.stats.misses += times;
  }
}

class Soccer {
  static makeStriker(playerInfo: PlayerInfo) {
    const newPlayer = new Striker(playerInfo);
    return newPlayer;
  }

  static makeGoalKeeper(playerInfo: PlayerInfo) {
    const newPlayer = new GoalKeeper(playerInfo);
    return newPlayer;
  }

  static kickPenalty(striker: Striker, goalKeeper: GoalKeeper): void {
    const goals = Math.round(Math.random() * 5);
    const saves = 5 - goals;
    striker.goals(goals);
    striker.misses(saves);
    goalKeeper.saves(saves);
    goalKeeper.conceded(goals);
  }

  static printStats(player: Striker | GoalKeeper) {
    player.printStats();
  }
}

const doolly = Soccer.makeStriker({
  name: "jeyun",
  height: 177,
  weight: 74,
});

const jordan = Soccer.makeGoalKeeper({
  name: "jiwon",
  height: 175,
  weight: 70,
});

Soccer.kickPenalty(doolly, jordan);
Soccer.printStats(doolly);
Soccer.printStats(jordan);
