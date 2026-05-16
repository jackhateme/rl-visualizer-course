import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  BASIC_CHAPTERS,
  bellmanBackup,
  buildBasicFrame,
  calculateBanditRegret,
  tdTarget,
} from "./basic.js";

function chapterById(id) {
  return BASIC_CHAPTERS.find((chapter) => chapter.id === id);
}

function valueByLabel(items, label) {
  return items.find((item) => item.label === label).value;
}

test("basic tutorial covers every foundation chapter in order", () => {
  assert.deepEqual(
    BASIC_CHAPTERS.map((chapter) => chapter.id),
    ["rl-intro", "bandit", "mdp", "dynamic-programming", "td", "dyna-q"],
  );
  assert.equal(BASIC_CHAPTERS[0].chapter, "第 1 章 初探强化学习");
  assert.equal(BASIC_CHAPTERS.at(-1).chapter, "第 6 章 Dyna-Q 算法");
});

test("index provides the foundation tutorial mount points", () => {
  const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

  assert.match(html, /id="basicTutorial"/);
  assert.match(html, /id="basicChapterNav"/);
  assert.match(html, /id="basicTheory"/);
});

test("basic tutorial has a single-column responsive layout", () => {
  const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(css, /@media \(max-width: 1120px\)[\s\S]*\.basic-tutorial[\s\S]*grid-template-columns: 1fr/);
});

test("every basic chapter includes theory reading content", () => {
  assert.equal(BASIC_CHAPTERS.length, 6);
  for (const chapter of BASIC_CHAPTERS) {
    assert.equal(typeof chapter.theory?.core, "string", `${chapter.id} missing core theory`);
    assert.equal(typeof chapter.theory?.formula, "string", `${chapter.id} missing formula theory`);
    assert.equal(typeof chapter.theory?.note, "string", `${chapter.id} missing study note`);
    assert.ok(chapter.theory.core.length > 30, `${chapter.id} core theory too thin`);
    assert.ok(chapter.theory.formula.length > 30, `${chapter.id} formula theory too thin`);
    assert.ok(chapter.theory.note.length > 30, `${chapter.id} study note too thin`);
  }
});

test("every basic chapter links back to the original BoyuAI course chapter", () => {
  for (const chapter of BASIC_CHAPTERS) {
    assert.match(chapter.sourceUrl, /^https:\/\/hrl\.boyuai\.com\/chapter\/1\//, `${chapter.id} missing source url`);
  }
  assert.match(chapterById("td").sourceUrl, /时序差分算法$/);
  assert.match(chapterById("dyna-q").sourceUrl, /dyna-q算法$/);
});

test("app renders original course links in the theory area", () => {
  const app = readFileSync(new URL("./app.js", import.meta.url), "utf8");

  assert.match(app, /frame\.sourceUrl/);
  assert.match(app, /target="_blank"/);
  assert.match(app, /rel="noopener noreferrer"/);
  assert.match(app, /原始课程/);
});

test("bandit regret is optimal expected reward gap times pulls", () => {
  assert.equal(
    calculateBanditRegret({
      optimalMean: 0.8,
      chosenMean: 0.5,
      pulls: 10,
    }),
    3,
  );
});

test("bellman backup combines immediate reward with discounted next value", () => {
  assert.equal(
    bellmanBackup({
      reward: -1,
      gamma: 0.9,
      nextValue: 6,
    }),
    4.4,
  );
});

test("basic rl intro frame shows the one-step return used by the calculator", () => {
  const frame = buildBasicFrame(chapterById("rl-intro"), 0, {
    reward: 1,
    futureValue: 5,
    gamma: 0.9,
  });

  assert.match(frame.theory.formula, /一步形式|future_value/);
  assert.equal(valueByLabel(frame.metrics, "one-step return"), "5.50");
  assert.equal(valueByLabel(frame.nodes, "return"), "5.50");
});

test("td target bootstraps from next-state or next-action value", () => {
  assert.equal(
    tdTarget({
      reward: -1,
      gamma: 0.9,
      bootstrapValue: 5,
      done: false,
    }),
    3.5,
  );
  assert.equal(
    tdTarget({
      reward: -100,
      gamma: 0.9,
      bootstrapValue: 5,
      done: true,
    }),
    -100,
  );
});

test("basic frame carries theory and calculated values for bandit", () => {
  const frame = buildBasicFrame(chapterById("bandit"), 0, {
    optimalMean: 0.8,
    chosenMean: 0.5,
    pulls: 10,
    epsilon: 0.2,
  });

  assert.match(frame.theory.core, /老虎机|探索|利用/);
  assert.equal(valueByLabel(frame.metrics, "regret"), "3.00");
  assert.equal(valueByLabel(frame.nodes, "epsilon"), "0.20");
});

test("basic td frame points learners to the existing cliff walking animation", () => {
  const frame = buildBasicFrame(chapterById("td"), 4, {
    reward: -1,
    gamma: 0.9,
    bootstrapValue: 5,
  });

  assert.match(frame.theory.note, /下方|悬崖漫步|Sarsa/);
  assert.equal(valueByLabel(frame.metrics, "TD target"), "3.50");
  assert.equal(frame.activeStep, "在下方网格逐步观察 Sarsa 与 Q-learning");
});

test("basic dyna-q frame counts planning updates after every real update", () => {
  const frame = buildBasicFrame(chapterById("dyna-q"), 0, {
    planningSteps: 5,
    realUpdates: 3,
    modelSize: 12,
  });

  assert.match(frame.theory.note, /model size|不是总更新次数/);
  assert.equal(valueByLabel(frame.metrics, "total update"), "18");
  assert.equal(valueByLabel(frame.nodes, "total update"), "18");
});

test("basic frame tolerates chapters without step text", () => {
  const frame = buildBasicFrame(
    {
      id: "empty",
      steps: [],
      controls: [],
      nodes: [],
      metrics: [],
      theory: {},
    },
    3,
  );

  assert.equal(frame.phase, 0);
  assert.equal(frame.activeStep, "");
  assert.equal(frame.progress, 1);
});
