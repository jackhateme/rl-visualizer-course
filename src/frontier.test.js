import assert from "node:assert/strict";
import { test } from "node:test";

import {
  FRONTIER_ALGORITHMS,
  behaviorCloningCompoundingError,
  buildFrontierBatchDemo,
  buildFrontierFrame,
  cemDistributionUpdate,
  centralizedCriticInputSize,
  cqlConservativeTarget,
  gailDiscriminatorReward,
  herRelabelReward,
  mbpoRolloutTradeoff,
} from "./frontier.js";

function algorithmById(id) {
  return FRONTIER_ALGORITHMS.find((algorithm) => algorithm.id === id);
}

function valueByLabel(items, label) {
  return items.find((item) => item.label === label).value;
}

test("frontier algorithms cover every BoyuAI frontier chapter", () => {
  assert.deepEqual(
    FRONTIER_ALGORITHMS.map((algorithm) => algorithm.id),
    ["imitation", "mpc", "mbpo", "offline-rl", "goal-rl", "marl-intro", "maddpg"],
  );
  assert.equal(FRONTIER_ALGORITHMS[0].chapter, "第 15 章 模仿学习");
  assert.equal(FRONTIER_ALGORITHMS.at(-1).chapter, "第 21 章 多智能体强化学习进阶");
});

test("every frontier chapter includes theory reading content", () => {
  assert.equal(FRONTIER_ALGORITHMS.length, 7);
  for (const algorithm of FRONTIER_ALGORITHMS) {
    assert.equal(typeof algorithm.theory?.core, "string", `${algorithm.id} missing core theory`);
    assert.equal(typeof algorithm.theory?.formula, "string", `${algorithm.id} missing formula theory`);
    assert.equal(typeof algorithm.theory?.note, "string", `${algorithm.id} missing study note`);
    assert.ok(algorithm.theory.core.length > 30, `${algorithm.id} core theory too thin`);
    assert.ok(algorithm.theory.formula.length > 30, `${algorithm.id} formula theory too thin`);
    assert.ok(algorithm.theory.note.length > 30, `${algorithm.id} study note too thin`);
  }
});

test("every frontier chapter links back to the original BoyuAI course chapter", () => {
  for (const algorithm of FRONTIER_ALGORITHMS) {
    assert.match(algorithm.sourceUrl, /^https:\/\/hrl\.boyuai\.com\/chapter\/3\//, `${algorithm.id} missing source url`);
  }
  assert.match(algorithmById("imitation").sourceUrl, /模仿学习$/);
  assert.match(algorithmById("maddpg").sourceUrl, /多智能体强化学习进阶$/);
});

test("frontier frame carries theory content for the active chapter", () => {
  const frame = buildFrontierFrame(algorithmById("imitation"), 0);

  assert.match(frame.theory.core, /专家|模仿|行为克隆|GAIL/);
  assert.match(frame.theory.formula, /占用|判别器|reward/i);
  assert.match(frame.theory.note, /分布偏移|复合误差|交互/);
});

test("behavior cloning compounds small one-step mistakes over a horizon", () => {
  assert.equal(
    behaviorCloningCompoundingError({ singleStepError: 0.08, horizon: 12 }),
    0.632334,
  );
});

test("gail discriminator reward increases when agent data looks expert-like", () => {
  assert.equal(gailDiscriminatorReward({ agentProbability: 0.3 }), 1.203973);
  assert.equal(gailDiscriminatorReward({ agentProbability: 0.8 }), 0.223144);
});

test("cem distribution update moves toward elite action sequences", () => {
  assert.deepEqual(
    cemDistributionUpdate({
      mean: 0,
      variance: 1,
      eliteMean: 0.6,
      eliteVariance: 0.16,
      oldWeight: 0.1,
    }),
    { mean: 0.54, variance: 0.244 },
  );
});

test("mbpo rollout tradeoff grows model data and model error with horizon", () => {
  assert.deepEqual(
    mbpoRolloutTradeoff({
      horizon: 3,
      branches: 20,
      modelError: 0.08,
      realSamples: 100,
    }),
    { syntheticSamples: 60, modelRatio: 0.375, compoundedError: 0.259712 },
  );
});

test("frontier mbpo frame names the rollout error as compounded error", () => {
  const frame = buildFrontierFrame(algorithmById("mbpo"), 2, {
    horizon: 3,
    branches: 20,
    modelError: 0.08,
    realSamples: 100,
  });

  assert.equal(valueByLabel(frame.metrics, "compounded error"), "25.97%");
});

test("frontier mpc formula mentions both mean and variance updates", () => {
  const frame = buildFrontierFrame(algorithmById("mpc"), 0);

  assert.match(frame.formula, /mean\/var/);
});

test("cql conservative target penalizes out-of-dataset overestimation", () => {
  assert.equal(
    cqlConservativeTarget({
      tdTarget: 7,
      dataQ: 4,
      oodQ: 9,
      alpha: 0.4,
    }),
    5,
  );
});

test("her relabeling turns an achieved goal into a useful sparse reward", () => {
  assert.deepEqual(
    herRelabelReward({
      originalDistance: 0.7,
      relabeledDistance: 0.04,
      threshold: 0.1,
    }),
    { originalReward: -1, relabeledReward: 0 },
  );
});

test("centralized critic input grows with all agents' observations and actions", () => {
  assert.equal(centralizedCriticInputSize({ agents: 3, obsDim: 8, actionDim: 2 }), 30);
});

test("frontier imitation frame combines bc and gail teaching metrics", () => {
  const frame = buildFrontierFrame(algorithmById("imitation"), 2, {
    bcError: 0.1,
    horizon: 10,
    discriminator: 0.25,
  });

  assert.equal(valueByLabel(frame.nodes, "BC drift"), "65.13%");
  assert.equal(valueByLabel(frame.metrics, "GAIL reward"), "1.386");
});

test("frontier offline rl frame exposes the conservative cql penalty", () => {
  const frame = buildFrontierFrame(algorithmById("offline-rl"), 2, {
    tdTarget: 6,
    dataQ: 3,
    oodQ: 8,
    alpha: 0.5,
  });

  assert.equal(valueByLabel(frame.metrics, "penalty"), "2.50");
  assert.equal(valueByLabel(frame.metrics, "CQL target"), "3.50");
});

test("frontier batch demo returns one computed frame per chapter step", () => {
  const algorithm = algorithmById("goal-rl");
  const frames = buildFrontierBatchDemo(algorithm, 0, {
    originalDistance: 0.7,
    relabeledDistance: 0.04,
    threshold: 0.1,
  });

  assert.equal(frames.length, algorithm.steps.length);
  assert.equal(frames[0].activeStep, algorithm.steps[0]);
  assert.equal(valueByLabel(frames.at(-1).metrics, "relabel reward"), "0");
});
