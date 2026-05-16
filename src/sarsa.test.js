import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ACTIONS,
  CliffWalkingEnv,
  createQTable,
  createEpisodeRunner,
  greedyAction,
  maxActionValue,
  dynaQUpdate,
  nStepSarsaUpdate,
  qLearningUpdate,
  qTableDelta,
  selectEpsilonGreedyAction,
  storeModelTransition,
  sarsaUpdate,
} from "./sarsa.js";

test("normal movement returns next state, step reward, and keeps episode alive", () => {
  const env = new CliffWalkingEnv();

  const result = env.step(env.startState, "up");

  assert.deepEqual(result.nextState, { row: 2, col: 0 });
  assert.equal(result.reward, -1);
  assert.equal(result.done, false);
  assert.equal(result.fell, false);
});

test("walking into the cliff returns to start with cliff penalty", () => {
  const env = new CliffWalkingEnv();

  const result = env.step(env.startState, "right");

  assert.deepEqual(result.nextState, env.startState);
  assert.equal(result.reward, -100);
  assert.equal(result.done, false);
  assert.equal(result.fell, true);
});

test("walking into the goal ends the episode", () => {
  const env = new CliffWalkingEnv();

  const result = env.step({ row: 3, col: 10 }, "right");

  assert.deepEqual(result.nextState, env.goalState);
  assert.equal(result.reward, -1);
  assert.equal(result.done, true);
});

test("sarsa update applies the TD target from the actual next action", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 2, col: 3 };
  const nextState = { row: 2, col: 4 };
  q[state.row][state.col].right = 0.5;
  q[nextState.row][nextState.col].up = 0.8;

  const update = sarsaUpdate(q, {
    state,
    action: "right",
    reward: -1,
    nextState,
    nextAction: "up",
    alpha: 0.1,
    gamma: 0.9,
    done: false,
  });

  assert.equal(update.oldValue, 0.5);
  assert.equal(update.tdTarget, -0.28);
  assert.equal(update.tdError, -0.78);
  assert.equal(update.newValue, 0.422);
  assert.equal(q[state.row][state.col].right, 0.422);
});

test("terminal sarsa update ignores next action value", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 3, col: 10 };
  const nextState = { row: 3, col: 11 };
  q[state.row][state.col].right = 0.4;
  q[nextState.row][nextState.col].up = 10;

  const update = sarsaUpdate(q, {
    state,
    action: "right",
    reward: -1,
    nextState,
    nextAction: "up",
    alpha: 0.5,
    gamma: 0.9,
    done: true,
  });

  assert.equal(update.tdTarget, -1);
  assert.equal(update.newValue, -0.3);
});

test("n-step sarsa update bootstraps after the collected rewards", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 2, col: 3 };
  const bootstrapState = { row: 2, col: 6 };
  q[state.row][state.col].right = 1;
  q[bootstrapState.row][bootstrapState.col].up = 5;

  const update = nStepSarsaUpdate(q, {
    state,
    action: "right",
    rewards: [-1, -1, -1],
    bootstrapState,
    bootstrapAction: "up",
    alpha: 0.5,
    gamma: 0.9,
    done: false,
  });

  assert.equal(update.oldValue, 1);
  assert.equal(update.nextValue, 5);
  assert.equal(update.tdTarget, 0.935);
  assert.equal(update.tdError, -0.065);
  assert.equal(update.newValue, 0.9675);
  assert.equal(q[state.row][state.col].right, 0.9675);
});

test("terminal n-step sarsa update ignores bootstrap value", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 2, col: 3 };
  const bootstrapState = { row: 2, col: 5 };
  q[state.row][state.col].right = -2;
  q[bootstrapState.row][bootstrapState.col].up = 99;

  const update = nStepSarsaUpdate(q, {
    state,
    action: "right",
    rewards: [-1, -100],
    bootstrapState,
    bootstrapAction: "up",
    alpha: 0.5,
    gamma: 0.9,
    done: true,
  });

  assert.equal(update.nextValue, 0);
  assert.equal(update.tdTarget, -91);
  assert.equal(update.tdError, -89);
  assert.equal(update.newValue, -46.5);
});

test("max action value returns the greedy next-state value and action", () => {
  const values = { up: -2, right: 4, down: 4, left: 1 };

  assert.deepEqual(maxActionValue(values, ACTIONS), {
    action: "right",
    value: 4,
  });
});

test("q-learning update uses max next-state value instead of behavior next action", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 2, col: 3 };
  const nextState = { row: 2, col: 4 };
  q[state.row][state.col].right = 0.5;
  q[nextState.row][nextState.col].up = 0.8;
  q[nextState.row][nextState.col].left = 2;

  const update = qLearningUpdate(q, {
    state,
    action: "right",
    reward: -1,
    nextState,
    alpha: 0.1,
    gamma: 0.9,
    done: false,
  });

  assert.equal(update.bestNextAction, "left");
  assert.equal(update.nextValue, 2);
  assert.equal(update.tdTarget, 0.8);
  assert.equal(update.tdError, 0.3);
  assert.equal(update.newValue, 0.53);
  assert.equal(q[state.row][state.col].right, 0.53);
});

test("terminal q-learning update ignores max next-state value", () => {
  const q = createQTable(4, 12, ACTIONS);
  const state = { row: 3, col: 10 };
  const nextState = { row: 3, col: 11 };
  q[state.row][state.col].right = 0.4;
  q[nextState.row][nextState.col].up = 10;

  const update = qLearningUpdate(q, {
    state,
    action: "right",
    reward: -1,
    nextState,
    alpha: 0.5,
    gamma: 0.9,
    done: true,
  });

  assert.equal(update.tdTarget, -1);
  assert.equal(update.newValue, -0.3);
});

test("dyna-q update stores the real transition in the model", () => {
  const q = createQTable(4, 12, ACTIONS);
  const model = new Map();
  const state = { row: 2, col: 3 };
  const nextState = { row: 2, col: 4 };
  q[nextState.row][nextState.col].up = 3;

  const result = dynaQUpdate(q, model, {
    state,
    action: "right",
    reward: -1,
    nextState,
    alpha: 0.1,
    gamma: 0.9,
    done: false,
    planningSteps: 0,
  });

  assert.equal(result.modelSize, 1);
  assert.equal(result.realUpdate.tdTarget, 1.7);
  assert.equal(result.realUpdate.newValue, 0.17);
  assert.deepEqual(result.modelEntry, {
    state,
    action: "right",
    reward: -1,
    nextState,
    done: false,
  });
});

test("dyna-q planning replays sampled model transitions", () => {
  const q = createQTable(4, 12, ACTIONS);
  const model = new Map();
  const rememberedState = { row: 1, col: 1 };
  const rememberedNextState = { row: 1, col: 2 };
  q[rememberedNextState.row][rememberedNextState.col].down = 4;
  storeModelTransition(model, {
    state: rememberedState,
    action: "right",
    reward: -1,
    nextState: rememberedNextState,
    done: false,
  });

  const result = dynaQUpdate(q, model, {
    state: { row: 2, col: 0 },
    action: "up",
    reward: -1,
    nextState: { row: 1, col: 0 },
    alpha: 0.1,
    gamma: 0.9,
    done: false,
    planningSteps: 1,
    random: () => 0,
  });

  assert.equal(result.planningUpdates.length, 1);
  assert.deepEqual(result.planningUpdates[0].state, rememberedState);
  assert.equal(result.planningUpdates[0].tdTarget, 2.6);
  assert.equal(result.planningUpdates[0].newValue, 0.26);
  assert.equal(q[rememberedState.row][rememberedState.col].right, 0.26);
});

test("greedy action returns the highest valued action with stable tie breaking", () => {
  const values = { up: -2, right: 4, down: 4, left: 1 };

  assert.equal(greedyAction(values, ACTIONS), "right");
});

test("epsilon-greedy selection can be deterministic for exploration and exploitation", () => {
  const values = { up: -2, right: 4, down: 1, left: 0 };

  assert.equal(
    selectEpsilonGreedyAction(values, ACTIONS, {
      epsilon: 0,
      random: () => 0.99,
    }),
    "right",
  );
  assert.equal(
    selectEpsilonGreedyAction(values, ACTIONS, {
      epsilon: 1,
      random: () => 0.51,
    }),
    "down",
  );
});

test("episode runner applies per-step epsilon when resetting after terminal state", () => {
  const env = new CliffWalkingEnv({ rows: 1, cols: 2 });
  const q = createQTable(env.rows, env.cols, ACTIONS);
  const randomValues = [0.99, 0.99, 0, 0.51];
  q[env.startState.row][env.startState.col].right = 1;

  const runner = createEpisodeRunner({
    env,
    q,
    epsilon: 0,
    random: () => randomValues.shift() ?? 0.99,
  });

  assert.equal(runner.stepOnce().done, true);

  const result = runner.stepOnce({ epsilon: 1 });

  assert.equal(result.action, "down");
  assert.equal(result.done, false);
});

test("q table delta sums absolute changes across every state action value", () => {
  const before = createQTable(2, 2, ACTIONS);
  const after = createQTable(2, 2, ACTIONS);
  after[0][0].up = -0.1;
  after[0][1].right = 2;
  after[1][0].down = -3.25;

  assert.equal(qTableDelta(before, after), 5.35);
});
