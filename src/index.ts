interface PlayerInfo {
  name: string;
  height: number;
  weight: number;
}

type ST = {
  numOfMatch: number;
  goals: number;
  misses: number;
};

type GK = {
  numOfMatch: number;
  saves: number;
  conceded: number;
};

abstract class Player<T> {
  protected playerInfo: PlayerInfo;
  protected stats: T;

  constructor(playerInfo: PlayerInfo, stats: T) {
    this.playerInfo = playerInfo;
    this.stats = stats;
  }

  abstract getOverAll(): number;

  getPlayerInfo(): PlayerInfo {
    return this.playerInfo;
  }

  getStats(): T {
    return this.stats;
  }
}

class GoalKeeper extends Player<GK> {
  getOverAll(): number {
    return (
      90 +
      ((this.stats.saves - this.stats.conceded) * 10) / this.stats.numOfMatch
    );
  }

  saves(times: number): void {
    this.stats.saves += times;
  }

  conceded(times: number): void {
    this.stats.conceded += times;
  }
}

class Striker extends Player<ST> {
  getOverAll(): number {
    return (
      90 + ((this.stats.goals - this.stats.misses) * 10) / this.stats.numOfMatch
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
  static makeStriker(playerInfo: PlayerInfo, stats: ST) {
    const newPlayer = new Striker(playerInfo, stats);
    return newPlayer;
  }

  static makeGoalKeeper(playerInfo: PlayerInfo, stats: GK) {
    const newPlayer = new GoalKeeper(playerInfo, stats);
    return newPlayer;
  }

  static play(striker: Striker, goalKeeper: GoalKeeper): void {
    const stOverAll = striker.getOverAll();
    const gkOverAll = goalKeeper.getOverAll();

    const stPf = Math.random() * stOverAll;
    const gkPf = Math.random() * gkOverAll;

    let message = `${striker.getPlayerInfo().name}'s overall: ${stOverAll}, ${
      goalKeeper.getPlayerInfo().name
    }'s overall: ${gkOverAll}, `;
    if (stPf > gkPf) {
      message += `${striker.getPlayerInfo().name} wins`;
    } else if (stPf < gkPf) {
      message += `${goalKeeper.getPlayerInfo().name} wins`;
    } else {
      message += "draws";
    }

    console.log(message);
  }
}

const striker1 = Soccer.makeStriker(
  {
    name: "doolly",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 292,
    goals: 311,
    misses: 19,
  }
);

const striker2 = Soccer.makeStriker(
  {
    name: "timo",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 20,
    goals: 25,
    misses: 3,
  }
);

const striker3 = Soccer.makeStriker(
  {
    name: "issac",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 146,
    goals: 25,
    misses: 1,
  }
);

const goalKeeper1 = Soccer.makeGoalKeeper(
  {
    name: "jordan",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 600,
    saves: 1052,
    conceded: 537,
  }
);

const goalKeeper2 = Soccer.makeGoalKeeper(
  {
    name: "leica",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 700,
    saves: 1052,
    conceded: 427,
  }
);

const goalKeeper3 = Soccer.makeGoalKeeper(
  {
    name: "whosthis",
    height: 175,
    weight: 70,
  },
  {
    numOfMatch: 1,
    saves: 0,
    conceded: 3,
  }
);

Soccer.play(striker1, goalKeeper1);
Soccer.play(striker1, goalKeeper2);
Soccer.play(striker1, goalKeeper3);
Soccer.play(striker2, goalKeeper1);
Soccer.play(striker2, goalKeeper2);
Soccer.play(striker2, goalKeeper3);
Soccer.play(striker3, goalKeeper1);
Soccer.play(striker3, goalKeeper2);
Soccer.play(striker3, goalKeeper3);
