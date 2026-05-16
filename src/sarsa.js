export const ACTIONS = ["up", "right", "down", "left"];

const DELTAS = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

export class CliffWalkingEnv {
  constructor({ rows = 4, cols = 12 } = {}) {
    this.rows = rows;
    this.cols = cols;
    this.startState = { row: rows - 1, col: 0 };
    this.goalState = { row: rows - 1, col: cols - 1 };
  }

  clampState(state) {
    return {
      row: Math.max(0, Math.min(this.rows - 1, state.row)),
      col: Math.max(0, Math.min(this.cols - 1, state.col)),
    };
  }

  isGoal(state) {
    return state.row === this.goalState.row && state.col === this.goalState.col;
  }

  isCliff(state) {
    return (
      state.row === this.rows - 1 &&
      state.col > 0 &&
      state.col < this.cols - 1
    );
  }

  step(state, action) {
    const delta = DELTAS[action];
    if (!delta) {
      throw new Error(`Unknown action: ${action}`);
    }

    const candidate = this.clampState({
      row: state.row + delta[0],
      col: state.col + delta[1],
    });

    if (this.isCliff(candidate)) {
      return {
        nextState: { ...this.startState },
        reward: -100,
        done: false,
        fell: true,
      };
    }

    return {
      nextState: candidate,
      reward: -1,
      done: this.isGoal(candidate),
      fell: false,
    };
  }
}

export function createQTable(rows, cols, actions = ACTIONS) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      Object.fromEntries(actions.map((action) => [action, 0])),
    ),
  );
}

export function stateKey(state) {
  return `${state.row},${state.col}`;
}

export function greedyAction(actionValues, actions = ACTIONS) {
  return actions.reduce((best, action) => {
    if (actionValues[action] > actionValues[best]) {
      return action;
    }
    return best;
  }, actions[0]);
}

export function maxActionValue(actionValues, actions = ACTIONS) {
  const action = greedyAction(actionValues, actions);
  return {
    action,
    value: actionValues[action],
  };
}

export function selectEpsilonGreedyAction(
  actionValues,
  actions = ACTIONS,
  { epsilon = 0.1, random = Math.random } = {},
) {
  if (random() < epsilon) {
    const index = Math.min(actions.length - 1, Math.floor(random() * actions.length));
    return actions[index];
  }

  return greedyAction(actionValues, actions);
}

export function round(value, places = 6) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function sarsaUpdate(
  q,
  { state, action, reward, nextState, nextAction, alpha, gamma, done },
) {
  const oldValue = q[state.row][state.col][action];
  const nextValue = done ? 0 : q[nextState.row][nextState.col][nextAction];
  const tdTarget = reward + gamma * nextValue;
  const tdError = tdTarget - oldValue;
  const newValue = oldValue + alpha * tdError;

  q[state.row][state.col][action] = round(newValue, 6);

  return {
    oldValue: round(oldValue, 6),
    nextValue: round(nextValue, 6),
    tdTarget: round(tdTarget, 6),
    tdError: round(tdError, 6),
    newValue: q[state.row][state.col][action],
  };
}

export function qLearningUpdate(q, { state, action, reward, nextState, alpha, gamma, done }) {
  const oldValue = q[state.row][state.col][action];
  const bestNext = done
    ? { action: null, value: 0 }
    : maxActionValue(q[nextState.row][nextState.col], ACTIONS);
  const tdTarget = reward + gamma * bestNext.value;
  const tdError = tdTarget - oldValue;
  const newValue = oldValue + alpha * tdError;

  q[state.row][state.col][action] = round(newValue, 6);

  return {
    oldValue: round(oldValue, 6),
    nextValue: round(bestNext.value, 6),
    bestNextAction: bestNext.action,
    tdTarget: round(tdTarget, 6),
    tdError: round(tdError, 6),
    newValue: q[state.row][state.col][action],
  };
}

export function modelKey(state, action) {
  return `${state.row},${state.col}:${action}`;
}

export function storeModelTransition(model, { state, action, reward, nextState, done }) {
  const entry = {
    state: { ...state },
    action,
    reward,
    nextState: { ...nextState },
    done,
  };
  model.set(modelKey(state, action), entry);
  return entry;
}

export function dynaQUpdate(
  q,
  model,
  {
    state,
    action,
    reward,
    nextState,
    alpha,
    gamma,
    done,
    planningSteps = 0,
    random = Math.random,
  },
) {
  const realUpdate = qLearningUpdate(q, {
    state,
    action,
    reward,
    nextState,
    alpha,
    gamma,
    done,
  });
  const modelEntry = storeModelTransition(model, {
    state,
    action,
    reward,
    nextState,
    done,
  });
  const planningUpdates = [];

  for (let step = 0; step < planningSteps && model.size > 0; step += 1) {
    const entries = Array.from(model.values());
    const index = Math.min(entries.length - 1, Math.floor(random() * entries.length));
    const sampled = entries[index];
    const update = qLearningUpdate(q, {
      state: sampled.state,
      action: sampled.action,
      reward: sampled.reward,
      nextState: sampled.nextState,
      alpha,
      gamma,
      done: sampled.done,
    });

    planningUpdates.push({
      ...sampled,
      ...update,
      planningStep: step + 1,
    });
  }

  return {
    realUpdate: {
      state: { ...state },
      action,
      reward,
      nextState: { ...nextState },
      done,
      ...realUpdate,
    },
    modelEntry,
    planningUpdates,
    modelSize: model.size,
  };
}

export function nStepSarsaUpdate(
  q,
  { state, action, rewards, bootstrapState, bootstrapAction, alpha, gamma, done },
) {
  const oldValue = q[state.row][state.col][action];
  const nextValue = done || !bootstrapState || !bootstrapAction
    ? 0
    : q[bootstrapState.row][bootstrapState.col][bootstrapAction];
  const discountedRewards = rewards.reduce(
    (total, reward, index) => total + (gamma ** index) * reward,
    0,
  );
  const tdTarget = discountedRewards + (done ? 0 : (gamma ** rewards.length) * nextValue);
  const tdError = tdTarget - oldValue;
  const newValue = oldValue + alpha * tdError;

  q[state.row][state.col][action] = round(newValue, 6);

  return {
    oldValue: round(oldValue, 6),
    nextValue: round(nextValue, 6),
    tdTarget: round(tdTarget, 6),
    tdError: round(tdError, 6),
    newValue: q[state.row][state.col][action],
    rewards: rewards.map((reward) => round(reward, 6)),
  };
}

export function cloneQTable(q) {
  return q.map((row) => row.map((cell) => ({ ...cell })));
}

export function qTableDelta(before, after) {
  let total = 0;

  for (let row = 0; row < after.length; row += 1) {
    for (let col = 0; col < after[row].length; col += 1) {
      for (const action of Object.keys(after[row][col])) {
        total += Math.abs(after[row][col][action] - before[row][col][action]);
      }
    }
  }

  return round(total, 6);
}

export function getStateValues(q, state) {
  return q[state.row][state.col];
}

export function createEpisodeRunner({
  env = new CliffWalkingEnv(),
  q = createQTable(env.rows, env.cols, ACTIONS),
  alpha = 0.1,
  gamma = 0.9,
  epsilon = 0.1,
  random = Math.random,
} = {}) {
  function selectRunnerAction(point, settings = {}) {
    return selectEpsilonGreedyAction(getStateValues(q, point), ACTIONS, {
      epsilon: settings.epsilon ?? epsilon,
      random,
    });
  }

  let state = { ...env.startState };
  let action = selectRunnerAction(state);
  let done = false;
  let totalReward = 0;
  let steps = 0;

  function resetEpisode(settings = {}) {
    state = { ...env.startState };
    action = selectRunnerAction(state, settings);
    done = false;
    totalReward = 0;
    steps = 0;
  }

  function stepOnce(settings = {}) {
    if (done) {
      resetEpisode(settings);
    }

    const currentState = { ...state };
    const currentAction = action;
    const transition = env.step(currentState, currentAction);
    const nextAction = transition.done
      ? null
      : selectRunnerAction(transition.nextState, settings);

    const update = sarsaUpdate(q, {
      state: currentState,
      action: currentAction,
      reward: transition.reward,
      nextState: transition.nextState,
      nextAction,
      alpha: settings.alpha ?? alpha,
      gamma: settings.gamma ?? gamma,
      done: transition.done,
    });

    state = { ...transition.nextState };
    action = nextAction ?? selectRunnerAction(env.startState, settings);
    done = transition.done;
    totalReward += transition.reward;
    steps += 1;

    return {
      state: currentState,
      action: currentAction,
      nextState: { ...transition.nextState },
      nextAction,
      reward: transition.reward,
      done: transition.done,
      fell: transition.fell,
      update,
      totalReward,
      steps,
    };
  }

  return {
    get state() {
      return { ...state };
    },
    get action() {
      return action;
    },
    get done() {
      return done;
    },
    get totalReward() {
      return totalReward;
    },
    resetEpisode,
    stepOnce,
  };
}
