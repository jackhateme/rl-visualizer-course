import assert from "node:assert/strict";
import { test } from "node:test";

import {
  ADVANCED_ALGORITHMS,
  buildAdvancedBatchDemo,
  buildAdvancedFrame,
  calculateDqnTarget,
  chapterDisplayName,
  clipPpoObjective,
  sacSoftTarget,
  trpoStepScale,
} from "./advanced.js";

function algorithmById(id) {
  return ADVANCED_ALGORITHMS.find((algorithm) => algorithm.id === id);
}

function valueByLabel(items, label) {
  return items.find((item) => item.label === label).value;
}

test("dqn target uses reward plus discounted target-network max next value", () => {
  assert.equal(
    calculateDqnTarget({
      reward: 1,
      gamma: 0.98,
      done: false,
      targetNextValues: [4, 6],
    }),
    6.88,
  );
});

test("terminal dqn target ignores next-state target values", () => {
  assert.equal(
    calculateDqnTarget({
      reward: 1,
      gamma: 0.98,
      done: true,
      targetNextValues: [4, 6],
    }),
    1,
  );
});

test("ppo objective clips probability ratios outside the trust band", () => {
  const result = clipPpoObjective({
    ratio: 1.34,
    advantage: 2,
    clipEpsilon: 0.2,
  });

  assert.equal(result.unclipped, 2.68);
  assert.equal(result.clippedRatio, 1.2);
  assert.equal(result.clipped, 2.4);
  assert.equal(result.objective, 2.4);
  assert.equal(result.wasClipped, true);
});

test("ppo objective uses the pessimistic clipped value for negative advantages", () => {
  const result = clipPpoObjective({
    ratio: 0.5,
    advantage: -2,
    clipEpsilon: 0.2,
  });

  assert.equal(result.unclipped, -1);
  assert.equal(result.clippedRatio, 0.8);
  assert.equal(result.clipped, -1.6);
  assert.equal(result.objective, -1.6);
});

test("sac target includes entropy bonus before discounting", () => {
  assert.equal(
    sacSoftTarget({
      reward: 1,
      gamma: 0.99,
      minNextQ: 3,
      alpha: 0.2,
      nextEntropy: 1.5,
      done: false,
    }),
    4.267,
  );
});

test("trpo scales proposed policy step when kl is outside the constraint", () => {
  const result = trpoStepScale({
    proposedKl: 0.04,
    maxKl: 0.01,
  });

  assert.equal(result.allowed, false);
  assert.equal(result.scale, 0.5);
  assert.equal(result.finalKl, 0.01);
});

test("chapter display names remove the numbered prefix", () => {
  assert.equal(chapterDisplayName("第 7 章 DQN 算法"), "DQN 算法");
  assert.equal(chapterDisplayName("第 14 章 SAC 算法"), "SAC 算法");
});

test("every advanced chapter includes theory reading content", () => {
  assert.equal(ADVANCED_ALGORITHMS.length, 8);
  for (const algorithm of ADVANCED_ALGORITHMS) {
    assert.equal(typeof algorithm.theory?.core, "string", `${algorithm.id} missing core theory`);
    assert.equal(typeof algorithm.theory?.formula, "string", `${algorithm.id} missing formula theory`);
    assert.equal(typeof algorithm.theory?.note, "string", `${algorithm.id} missing study note`);
    assert.ok(algorithm.theory.core.length > 30, `${algorithm.id} core theory too thin`);
    assert.ok(algorithm.theory.formula.length > 30, `${algorithm.id} formula theory too thin`);
    assert.ok(algorithm.theory.note.length > 30, `${algorithm.id} study note too thin`);
  }
});

test("every advanced chapter links back to the original BoyuAI course chapter", () => {
  for (const algorithm of ADVANCED_ALGORITHMS) {
    assert.match(algorithm.sourceUrl, /^https:\/\/hrl\.boyuai\.com\/chapter\/2\//, `${algorithm.id} missing source url`);
  }
  assert.match(algorithmById("dqn").sourceUrl, /dqn算法$/);
  assert.match(algorithmById("sac").sourceUrl, /sac算法$/);
});

test("advanced frame carries theory content for the active chapter", () => {
  const frame = buildAdvancedFrame(algorithmById("dqn"), 0);

  assert.match(frame.theory.core, /Q 表|函数拟合|连续状态/);
  assert.match(frame.theory.formula, /TD target|目标网络|replay/i);
  assert.match(frame.theory.note, /相关性|稳定/);
});

test("advanced frames connect ppo controls to clipped objective values", () => {
  const frame = buildAdvancedFrame(algorithmById("ppo"), 4, {
    ratio: 1.5,
    clip: 0.1,
    advantage: 2,
  });

  assert.equal(frame.controls.find((control) => control.key === "ratio").value, 1.5);
  assert.equal(valueByLabel(frame.nodes, "ratio"), "1.50");
  assert.equal(valueByLabel(frame.nodes, "clipped"), "1.10");
  assert.equal(valueByLabel(frame.metrics, "unclipped"), "3.00");
  assert.equal(valueByLabel(frame.metrics, "clipped"), "2.20");
  assert.equal(valueByLabel(frame.metrics, "objective"), "2.20");
});

test("advanced ppo frame explains the reversed clipping direction for negative advantages", () => {
  const frame = buildAdvancedFrame(algorithmById("ppo"), 4, {
    ratio: 0.5,
    clip: 0.2,
    advantage: -2,
  });

  assert.equal(valueByLabel(frame.metrics, "clip direction"), "negative A: lower ratio is punished");
});

test("advanced ppo frame explains that zero advantage is unaffected by clipping", () => {
  const frame = buildAdvancedFrame(algorithmById("ppo"), 4, {
    ratio: 1.5,
    clip: 0.2,
    advantage: 0,
  });

  assert.equal(valueByLabel(frame.metrics, "objective"), "0.00");
  assert.equal(valueByLabel(frame.metrics, "clip direction"), "zero A: clipping has no effect");
});

test("advanced frames can highlight ppo's dynamically appended clip direction metric", () => {
  const frame = buildAdvancedFrame(algorithmById("ppo"), 3, {
    ratio: 0.5,
    clip: 0.2,
    advantage: -2,
  });

  const clipDirection = frame.metrics.find((metric) => metric.label === "clip direction");
  assert.equal(clipDirection.emphasis, true);
});

test("advanced frames connect sac controls to the soft target calculation", () => {
  const frame = buildAdvancedFrame(algorithmById("sac"), 3, {
    reward: 1,
    gamma: 0.99,
    alpha: 0.3,
    entropy: 2,
    minQ: 4,
  });

  assert.equal(frame.controls.find((control) => control.key === "reward").value, 1);
  assert.equal(frame.controls.find((control) => control.key === "gamma").value, 0.99);
  assert.equal(valueByLabel(frame.nodes, "entropy"), "2.00");
  assert.equal(valueByLabel(frame.nodes, "soft target"), "5.554");
  assert.equal(valueByLabel(frame.metrics, "alpha H"), "0.60");
  assert.equal(valueByLabel(frame.metrics, "target"), "5.554");
});

test("sac target follows reward and discount controls", () => {
  const frame = buildAdvancedFrame(algorithmById("sac"), 3, {
    reward: 2,
    gamma: 0.5,
    alpha: 0.3,
    entropy: 2,
    minQ: 4,
  });

  assert.equal(valueByLabel(frame.metrics, "target"), "4.300");
});

test("advanced frames connect trpo controls to trust-region step scaling", () => {
  const frame = buildAdvancedFrame(algorithmById("trpo"), 5, {
    maxKl: 0.02,
    proposedKl: 0.08,
  });

  assert.equal(valueByLabel(frame.nodes, "KL"), "0.080");
  assert.equal(valueByLabel(frame.nodes, "accepted step"), "50%");
  assert.equal(valueByLabel(frame.metrics, "max KL"), "0.020");
  assert.equal(valueByLabel(frame.metrics, "est. final KL"), "0.020");
  assert.equal(valueByLabel(frame.metrics, "allowed"), "scaled");
});

test("dqn online q values are independent teaching controls, not fake target offsets", () => {
  const frame = buildAdvancedFrame(algorithmById("dqn"), 1, {
    onlineLeft: 2.1,
    onlineRight: 3.4,
    targetLeft: 8,
    targetRight: 9,
  });

  assert.equal(frame.controls.find((control) => control.key === "onlineLeft").value, 2.1);
  assert.equal(valueByLabel(frame.nodes, "Q online"), "left 2.10 / right 3.40");
  assert.equal(valueByLabel(frame.nodes, "target net"), "max 9.00");
});

test("advanced frames let actor-critic reward and value estimates drive td error", () => {
  const frame = buildAdvancedFrame(algorithmById("actor-critic"), 3, {
    actor: 0.02,
    critic: 0.05,
    gamma: 0.5,
    reward: 2,
    currentValue: 5,
    nextValue: 8,
  });

  assert.equal(frame.controls.find((control) => control.key === "reward").value, 2);
  assert.equal(valueByLabel(frame.nodes, "Critic V(s)"), "5.00");
  assert.equal(valueByLabel(frame.nodes, "TD error"), "+1.00");
  assert.equal(valueByLabel(frame.metrics, "V target"), "6.00");
  assert.equal(valueByLabel(frame.metrics, "policy shift"), "+0.020");
});

test("ddpg target value is independent of target-network soft update tau", () => {
  const lowTau = buildAdvancedFrame(algorithmById("ddpg"), 4, {
    noise: 0.12,
    tau: 0.001,
    action: 0.4,
  });
  const highTau = buildAdvancedFrame(algorithmById("ddpg"), 4, {
    noise: 0.12,
    tau: 0.05,
    action: 0.4,
  });

  assert.equal(valueByLabel(lowTau.metrics, "Q target"), valueByLabel(highTau.metrics, "Q target"));
  assert.equal(valueByLabel(lowTau.metrics, "tau"), "0.001");
  assert.equal(valueByLabel(highTau.metrics, "tau"), "0.050");
});

test("ddpg target uses explicit reward, discount, and target actor controls", () => {
  const frame = buildAdvancedFrame(algorithmById("ddpg"), 4, {
    reward: 2,
    gamma: 0.5,
    targetAction: 0.4,
    action: 0.7,
    noise: 0,
  });

  assert.equal(frame.controls.find((control) => control.key === "reward").value, 2);
  assert.equal(frame.controls.find((control) => control.key === "gamma").value, 0.5);
  assert.equal(frame.controls.find((control) => control.key === "targetAction").value, 0.4);
  assert.equal(valueByLabel(frame.metrics, "Q target"), "3.40");
});

test("ddpg online and target critic use the same teaching critic curve", () => {
  const frame = buildAdvancedFrame(algorithmById("ddpg"), 4, {
    reward: 1,
    gamma: 1,
    action: 0.4,
    noise: 0,
    targetAction: 0.4,
  });

  assert.equal(valueByLabel(frame.nodes, "Critic Q"), "2.80");
  assert.equal(valueByLabel(frame.metrics, "Q target"), "3.80");
});

test("advanced batch demo returns one computed frame for every teaching step", () => {
  const algorithm = algorithmById("ppo");
  const frames = buildAdvancedBatchDemo(algorithm, 0, {
    ratio: 1.34,
    clip: 0.2,
    advantage: 2,
  });

  assert.equal(frames.length, algorithm.steps.length);
  assert.equal(frames[0].activeStep, algorithm.steps[0]);
  assert.equal(frames.at(-1).activeStep, algorithm.steps.at(-1));
  assert.equal(valueByLabel(frames.at(-1).metrics, "objective"), "2.40");
});
