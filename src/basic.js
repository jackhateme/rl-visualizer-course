export const BASIC_CHAPTERS = [
  {
    id: "rl-intro",
    shortName: "RL",
    title: "初探强化学习：智能体在后果中学习",
    chapter: "第 1 章 初探强化学习",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/初探强化学习",
    intuition: "强化学习关注序贯决策：动作会改变环境，奖励会评价动作，策略要为未来回报负责。",
    steps: [
      "智能体感知状态 s",
      "策略选择动作 a",
      "环境转移到 s'",
      "环境返回即时奖励 r",
      "目标是最大化期望回报",
    ],
    formula: "one-step return = r + gamma * future_value",
    controls: [
      { key: "reward", label: "Reward now", value: 1, suffix: "" },
      { key: "futureValue", label: "Future value", value: 5, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.9, suffix: "" },
    ],
    nodes: [
      { label: "agent", value: "policy pi" },
      { label: "action", value: "a" },
      { label: "environment", value: "s -> s'" },
      { label: "return", value: "5.50" },
    ],
    metrics: [
      { label: "reward", value: "1.00" },
      { label: "discount", value: "0.90" },
      { label: "one-step return", value: "5.50" },
    ],
    theory: {
      core: "强化学习把学习者称为智能体，智能体通过动作影响环境，再从奖励和新状态中学习；这和只做单次预测的监督学习不同。",
      formula: "完整回报 G_t 是一串折扣奖励和；这里的计算器用一步形式 r + gamma * future_value 来预览未来价值如何进入当前决策。",
      note: "先抓住闭环：状态给信息，动作带来后果，奖励定义目标，策略决定行为。后面的所有算法都在改进这个闭环里的策略或价值估计。",
    },
  },
  {
    id: "bandit",
    shortName: "Bandit",
    title: "多臂老虎机：探索和利用的第一次交锋",
    chapter: "第 2 章 多臂老虎机",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/多臂老虎机",
    intuition: "没有状态转移，只有动作和随机奖励；它把强化学习里最经典的探索-利用问题单独拎出来。",
    steps: [
      "面对多个未知拉杆",
      "估计每个动作的平均奖励",
      "用 epsilon 保留探索",
      "多数时候利用当前最好拉杆",
      "用累积懊悔衡量代价",
    ],
    formula: "fixed-arm regret = pulls * (best_mean - chosen_mean)",
    controls: [
      { key: "optimalMean", label: "Best mean", value: 0.8, suffix: "" },
      { key: "chosenMean", label: "Chosen mean", value: 0.5, suffix: "" },
      { key: "pulls", label: "Pulls", value: 10, suffix: "" },
      { key: "epsilon", label: "Epsilon", value: 0.2, suffix: "" },
    ],
    nodes: [
      { label: "arms", value: "K actions" },
      { label: "estimate", value: "Q(a)" },
      { label: "epsilon", value: "0.20" },
      { label: "regret", value: "3.00" },
    ],
    metrics: [
      { label: "best mean", value: "0.80" },
      { label: "chosen mean", value: "0.50" },
      { label: "regret", value: "3.00" },
    ],
    theory: {
      core: "多臂老虎机是没有状态的简化强化学习：每次只选择一个动作并获得随机奖励，核心矛盾是探索和利用之间的取舍。",
      formula: "这里展示固定选择某个拉杆时的简化懊悔：当前动作和最优动作的期望奖励差乘以次数；epsilon-greedy 用 epsilon 的概率探索，剩余概率利用当前估计最好的动作。",
      note: "这一章不要急着想状态转移。先理解为什么一直选当前最好动作可能错过真正好动作，也为什么一直探索会浪费回报。",
    },
  },
  {
    id: "mdp",
    shortName: "MDP",
    title: "马尔可夫决策过程：把序贯决策写成数学对象",
    chapter: "第 3 章 马尔可夫决策过程",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/马尔可夫决策过程",
    intuition: "MDP 用状态、动作、转移概率、奖励和折扣因子描述环境，是多数强化学习算法共同的语言。",
    steps: [
      "定义状态集合 S",
      "定义动作集合 A",
      "用 P(s'|s,a) 描述转移",
      "用 R(s,a) 描述奖励",
      "用贝尔曼方程连接当前和未来",
    ],
    formula: "V(s) = E[R(s,a) + gamma * V(s')]",
    controls: [
      { key: "reward", label: "Reward", value: -1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.9, suffix: "" },
      { key: "nextValue", label: "V(s')", value: 6, suffix: "" },
    ],
    nodes: [
      { label: "state", value: "s" },
      { label: "action", value: "a" },
      { label: "transition", value: "P(s'|s,a)" },
      { label: "Bellman", value: "4.40" },
    ],
    metrics: [
      { label: "reward", value: "-1.00" },
      { label: "next value", value: "6.00" },
      { label: "backup", value: "4.40" },
    ],
    theory: {
      core: "MDP 把强化学习问题抽象为状态、动作、奖励、转移概率和折扣因子；马尔可夫性表示未来只依赖当前状态和动作。",
      formula: "贝尔曼方程把当前价值拆成即时奖励加折扣后的未来价值，它是动态规划、TD 学习和 Q-learning 背后的共同骨架。",
      note: "如果一个问题无法清楚说出状态、动作和奖励，后面算法很难落地。建模质量往往比套哪个算法更决定学习效果。",
    },
  },
  {
    id: "dynamic-programming",
    shortName: "DP",
    title: "动态规划：知道环境模型时直接算价值",
    chapter: "第 4 章 动态规划算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/动态规划算法",
    intuition: "如果已知转移和奖励，就能用贝尔曼方程反复更新价值，再由价值提升策略。",
    steps: [
      "已知完整 MDP 模型",
      "策略评估计算 V^pi",
      "策略提升选择更好动作",
      "策略迭代交替评估和提升",
      "价值迭代直接逼近最优价值",
    ],
    formula: "V_{k+1}(s) <- max_a sum P(s'|s,a)[r + gamma V_k(s')]",
    controls: [
      { key: "reward", label: "Reward", value: -1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.9, suffix: "" },
      { key: "nextValue", label: "Best V(s')", value: 6, suffix: "" },
    ],
    nodes: [
      { label: "model", value: "known P,R" },
      { label: "evaluate", value: "V^pi" },
      { label: "improve", value: "greedy pi" },
      { label: "value backup", value: "4.40" },
    ],
    metrics: [
      { label: "model", value: "known" },
      { label: "best next", value: "6.00" },
      { label: "value backup", value: "4.40" },
    ],
    theory: {
      core: "动态规划适用于已知环境模型的有限 MDP。策略迭代先评估当前策略，再按价值改进策略；价值迭代则直接用最优贝尔曼备份推进。",
      formula: "DP 的完整备份会枚举动作和可能的下一状态，并按转移概率加权；这里的计算器只展示单一动作分支 R + gamma V(s')，方便先看清一次 backup 的含义。",
      note: "DP 很像后面算法的白盒版本。现实中环境模型常常未知，所以蒙特卡洛、TD 和 Dyna-Q 都是在减少对完整模型的依赖。",
    },
  },
  {
    id: "td",
    shortName: "TD",
    title: "时序差分：边采样边自举",
    chapter: "第 5 章 时序差分算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/时序差分算法",
    intuition: "TD 不等整局结束，而是用一步真实奖励加下一状态估计值构造目标，边走边更新。",
    steps: [
      "采样真实 transition",
      "观察 r 和 s'",
      "用当前估计自举未来价值",
      "更新 Q(s,a)",
      "在下方网格逐步观察 Sarsa 与 Q-learning",
    ],
    formula: "target = r + gamma * bootstrap_value",
    controls: [
      { key: "reward", label: "Reward", value: -1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.9, suffix: "" },
      { key: "bootstrapValue", label: "Bootstrap", value: 5, suffix: "" },
    ],
    nodes: [
      { label: "sample", value: "s,a,r,s'" },
      { label: "Sarsa", value: "Q(s',a')" },
      { label: "Q-learning", value: "max Q(s',a)" },
      { label: "TD target", value: "3.50" },
    ],
    metrics: [
      { label: "reward", value: "-1.00" },
      { label: "bootstrap", value: "5.00" },
      { label: "TD target", value: "3.50" },
    ],
    theory: {
      core: "时序差分结合了采样和自举：像蒙特卡洛一样从真实交互中取样，又像动态规划一样用当前价值估计未来。",
      formula: "Sarsa 的 bootstrap 来自实际下一个动作 Q(s',a')，Q-learning 的 bootstrap 来自最大动作价值 max_a Q(s',a)。",
      note: "下方悬崖漫步动画就是这一章的实操区。重点看 Sarsa、n-step Sarsa 和 Q-learning 如何因为 bootstrap 选择不同而学出不同策略。",
    },
  },
  {
    id: "dyna-q",
    shortName: "Dyna-Q",
    title: "Dyna-Q：把真实经验变成可回放的模型",
    chapter: "第 6 章 Dyna-Q 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/1/dyna-q算法",
    intuition: "Dyna-Q 每走一步都做真实 Q-learning 更新，同时把 transition 存进模型，再用模型做 planning 更新。",
    steps: [
      "真实环境产生 transition",
      "执行一次真实 Q-learning 更新",
      "把 transition 写入模型",
      "从模型采样旧经验",
      "在下方网格观察 planning 更新",
    ],
    formula: "total updates = real_steps * (1 + planning_steps)",
    controls: [
      { key: "planningSteps", label: "Planning steps", value: 5, suffix: "" },
      { key: "modelSize", label: "Model size", value: 12, suffix: "" },
      { key: "realUpdates", label: "Real updates", value: 1, suffix: "" },
    ],
    nodes: [
      { label: "real step", value: "1 update" },
      { label: "model", value: "12 transitions" },
      { label: "planning", value: "5 replay" },
      { label: "total update", value: "6" },
    ],
    metrics: [
      { label: "real updates", value: "1" },
      { label: "planning", value: "5" },
      { label: "total update", value: "6" },
    ],
    theory: {
      core: "Dyna-Q 把模型学习和无模型 Q-learning 结合起来：真实经验既更新 Q 表，也被保存成环境模型供之后反复规划。",
      formula: "每个真实 transition 后，算法做一次真实 Q-learning 更新，再从模型中抽 N 条旧 transition 做 planning 更新，提高样本利用率。",
      note: "Dyna-Q 的关键不是凭空想象，而是复用已经见过的经验；model size 表示已记住多少 transition，不是总更新次数的乘数。下方动画里紫色 planning 标记展示了模型回放正在更新哪个状态动作。",
    },
  },
];

const CONTROL_SETTINGS = {
  "rl-intro": {
    reward: { min: -5, max: 5, step: 0.1 },
    futureValue: { min: -5, max: 15, step: 0.1 },
    gamma: { min: 0, max: 0.999, step: 0.001 },
  },
  bandit: {
    optimalMean: { min: 0, max: 1, step: 0.01 },
    chosenMean: { min: 0, max: 1, step: 0.01 },
    pulls: { min: 1, max: 100, step: 1 },
    epsilon: { min: 0, max: 1, step: 0.01 },
  },
  mdp: {
    reward: { min: -5, max: 5, step: 0.1 },
    gamma: { min: 0, max: 0.999, step: 0.001 },
    nextValue: { min: -10, max: 20, step: 0.1 },
  },
  "dynamic-programming": {
    reward: { min: -5, max: 5, step: 0.1 },
    gamma: { min: 0, max: 0.999, step: 0.001 },
    nextValue: { min: -10, max: 20, step: 0.1 },
  },
  td: {
    reward: { min: -100, max: 5, step: 1 },
    gamma: { min: 0, max: 0.999, step: 0.001 },
    bootstrapValue: { min: -20, max: 20, step: 0.1 },
  },
  "dyna-q": {
    planningSteps: { min: 0, max: 30, step: 1 },
    modelSize: { min: 0, max: 48, step: 1 },
    realUpdates: { min: 1, max: 10, step: 1 },
  },
};

export function round(value, places = 6) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function calculateBanditRegret({ optimalMean, chosenMean, pulls }) {
  return round(Math.max(0, optimalMean - chosenMean) * pulls, 6);
}

export function bellmanBackup({ reward, gamma, nextValue }) {
  return round(reward + gamma * nextValue, 6);
}

export function tdTarget({ reward, gamma, bootstrapValue, done }) {
  return round(reward + (done ? 0 : gamma * bootstrapValue), 6);
}

function formatNumber(value, places = 2) {
  return Number(value).toFixed(places);
}

function controlsWithOverrides(chapter, overrides = {}) {
  const settings = CONTROL_SETTINGS[chapter.id] ?? {};
  return chapter.controls.map((control) => ({
    ...control,
    ...(settings[control.key] ?? {}),
    value: overrides[control.key] ?? control.value,
  }));
}

function controlMap(controls) {
  return Object.fromEntries(controls.map((control) => [control.key, control.value]));
}

function replaceByLabel(items, replacements) {
  return items.map((item) => ({
    ...item,
    value: replacements[item.label] ?? item.value,
  }));
}

function buildRlIntroContent(chapter, controls) {
  const values = controlMap(controls);
  const oneStepReturn = bellmanBackup({
    reward: values.reward,
    gamma: values.gamma,
    nextValue: values.futureValue,
  });

  return {
    nodes: replaceByLabel(chapter.nodes, {
      return: formatNumber(oneStepReturn),
    }),
    metrics: replaceByLabel(chapter.metrics, {
      reward: formatNumber(values.reward),
      discount: formatNumber(values.gamma),
      "one-step return": formatNumber(oneStepReturn),
    }),
    controls,
  };
}

function buildBanditContent(chapter, controls) {
  const values = controlMap(controls);
  const regret = calculateBanditRegret(values);

  return {
    nodes: replaceByLabel(chapter.nodes, {
      epsilon: formatNumber(values.epsilon),
      regret: formatNumber(regret),
    }),
    metrics: replaceByLabel(chapter.metrics, {
      "best mean": formatNumber(values.optimalMean),
      "chosen mean": formatNumber(values.chosenMean),
      regret: formatNumber(regret),
    }),
    controls,
  };
}

function buildBellmanContent(chapter, controls, metricLabel) {
  const values = controlMap(controls);
  const backup = bellmanBackup(values);

  return {
    nodes: replaceByLabel(chapter.nodes, {
      Bellman: formatNumber(backup),
      "value backup": formatNumber(backup),
    }),
    metrics: replaceByLabel(chapter.metrics, {
      reward: formatNumber(values.reward),
      "next value": formatNumber(values.nextValue),
      "best next": formatNumber(values.nextValue),
      [metricLabel]: formatNumber(backup),
    }),
    controls,
  };
}

function buildTdContent(chapter, controls) {
  const values = controlMap(controls);
  const target = tdTarget({ ...values, done: false });

  return {
    nodes: replaceByLabel(chapter.nodes, {
      "TD target": formatNumber(target),
    }),
    metrics: replaceByLabel(chapter.metrics, {
      reward: formatNumber(values.reward),
      bootstrap: formatNumber(values.bootstrapValue),
      "TD target": formatNumber(target),
    }),
    controls,
  };
}

function buildDynaQContent(chapter, controls) {
  const values = controlMap(controls);
  const totalUpdate = values.realUpdates * (1 + values.planningSteps);

  return {
    nodes: replaceByLabel(chapter.nodes, {
      "real step": `${values.realUpdates} update`,
      model: `${values.modelSize} transitions`,
      planning: `${values.planningSteps} replay`,
      "total update": `${totalUpdate}`,
    }),
    metrics: replaceByLabel(chapter.metrics, {
      "real updates": `${values.realUpdates}`,
      planning: `${values.planningSteps}`,
      "total update": `${totalUpdate}`,
    }),
    controls,
  };
}

function buildCalculatedContent(chapter, controls) {
  if (chapter.id === "rl-intro") return buildRlIntroContent(chapter, controls);
  if (chapter.id === "bandit") return buildBanditContent(chapter, controls);
  if (chapter.id === "mdp") return buildBellmanContent(chapter, controls, "backup");
  if (chapter.id === "dynamic-programming") return buildBellmanContent(chapter, controls, "value backup");
  if (chapter.id === "td") return buildTdContent(chapter, controls);
  if (chapter.id === "dyna-q") return buildDynaQContent(chapter, controls);
  return { nodes: chapter.nodes, metrics: chapter.metrics, controls };
}

export function buildBasicFrame(chapter, tick = 0, overrides = {}) {
  const stepCount = chapter.steps.length || 1;
  const phase = tick % stepCount;
  const progress = (phase + 1) / stepCount;
  const controls = controlsWithOverrides(chapter, overrides);
  const content = buildCalculatedContent(chapter, controls);

  return {
    ...chapter,
    phase,
    activeStep: chapter.steps[phase] ?? "",
    progress,
    controls: content.controls,
    metrics: content.metrics.map((metric, index) => ({
      ...metric,
      emphasis: index === phase % content.metrics.length,
    })),
    nodes: content.nodes.map((node, index) => ({
      ...node,
      active: index === phase % content.nodes.length,
    })),
  };
}
