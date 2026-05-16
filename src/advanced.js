export const ADVANCED_ALGORITHMS = [
  {
    id: "dqn",
    shortName: "DQN",
    title: "DQN：用神经网络近似 Q 表",
    chapter: "第 7 章 DQN 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/dqn算法",
    intuition: "连续状态不能再查表，DQN 让 Q 网络输入状态并输出每个离散动作的价值。",
    steps: [
      "观察 CartPole 状态向量",
      "Q 网络输出左右动作价值",
      "epsilon-greedy 采样动作并写入回放池",
      "从 replay buffer 采样 mini-batch",
      "目标网络构造 TD target",
      "更新在线 Q 网络并定期同步目标网络",
    ],
    formula: "target = r + gamma * max_a Q_target(s', a)",
    controls: [
      { key: "onlineLeft", label: "Q online left", value: 1.42, suffix: "" },
      { key: "onlineRight", label: "Q online right", value: 1.88, suffix: "" },
      { key: "reward", label: "Reward", value: 1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.98, suffix: "" },
      { key: "targetLeft", label: "Q target left", value: 4, suffix: "" },
      { key: "targetRight", label: "Q target right", value: 6, suffix: "" },
    ],
    nodes: [
      { label: "state", value: "[x, v, theta, omega]" },
      { label: "Q online", value: "left 1.42 / right 1.88" },
      { label: "replay", value: "+ transition" },
      { label: "target net", value: "max 6.00" },
    ],
    metrics: [
      { label: "reward", value: "1.00" },
      { label: "max target", value: "6.00" },
      { label: "TD target", value: "6.880" },
    ],
  },
  {
    id: "dqn-upgrades",
    shortName: "DQN+",
    title: "DQN 改进：降低过估计，让样本更会说话",
    chapter: "第 8 章 DQN 改进算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/dqn改进算法",
    intuition: "Double DQN 拆开选择与估值，Dueling DQN 拆出状态价值与动作优势，优先回放让高 TD error 样本更常出现。",
    steps: [
      "普通 DQN 可能高估 max Q",
      "Double DQN 用在线网络选动作",
      "目标网络只负责估值",
      "Dueling 网络拆成 V(s) 与 A(s,a)",
      "按 TD error 给 replay 样本排序",
      "优先采样高误差经验",
    ],
    formula: "Double target = r + gamma * Q_target(s', argmax_a Q_online(s',a))",
    controls: [
      { key: "double", label: "Double", value: "on", suffix: "" },
      { key: "dueling", label: "Dueling", value: "on", suffix: "" },
      { key: "priority", label: "Priority alpha", value: 0.6, suffix: "" },
    ],
    nodes: [
      { label: "online argmax", value: "right" },
      { label: "target value", value: "1.73" },
      { label: "V(s)", value: "1.21" },
      { label: "A(s,a)", value: "[-0.2, 0.4]" },
    ],
    metrics: [
      { label: "overestimate", value: "-32%" },
      { label: "priority top", value: "TD 1.8" },
      { label: "sample p", value: "0.31" },
    ],
  },
  {
    id: "policy-gradient",
    shortName: "PG",
    title: "策略梯度：直接让好动作更可能发生",
    chapter: "第 9 章 策略梯度算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/策略梯度算法",
    intuition: "不再先学 Q 表，而是根据整条轨迹回报直接调整动作概率。",
    steps: [
      "策略网络输出动作分布",
      "按概率采样动作",
      "收集一条轨迹",
      "计算每一步折扣回报",
      "用 return 加权 log probability",
      "提高高回报动作的概率",
    ],
    formula: "grad J(theta) = E[G_t * grad log pi_theta(a_t|s_t)]",
    controls: [
      { key: "return", label: "Return", value: 18, suffix: "" },
      { key: "baseline", label: "Baseline", value: 9, suffix: "" },
      { key: "lr", label: "LR", value: 0.03, suffix: "" },
    ],
    nodes: [
      { label: "pi(left)", value: "0.41" },
      { label: "pi(right)", value: "0.59" },
      { label: "trajectory", value: "R=18" },
      { label: "prob update", value: "right +0.07" },
    ],
    metrics: [
      { label: "return", value: "18" },
      { label: "advantage", value: "+9" },
      { label: "entropy", value: "0.67" },
    ],
  },
  {
    id: "actor-critic",
    shortName: "A-C",
    title: "Actor-Critic：一个选动作，一个评价动作",
    chapter: "第 10 章 Actor-Critic 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/actor-critic算法",
    intuition: "Actor 负责策略，Critic 用 TD error 给 Actor 提供更低方差的学习信号。",
    steps: [
      "Actor 输出动作概率",
      "执行动作得到 r 与 s'",
      "Critic 估计 V(s) 与 V(s')",
      "计算 TD error",
      "Critic 向 TD target 靠近",
      "Actor 用 TD error 调整动作概率",
    ],
    formula: "delta = r + gamma V(s') - V(s)",
    controls: [
      { key: "actor", label: "Actor LR", value: 0.01, suffix: "" },
      { key: "critic", label: "Critic LR", value: 0.05, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.98, suffix: "" },
      { key: "reward", label: "Reward", value: 1, suffix: "" },
      { key: "currentValue", label: "V(s)", value: 8.4, suffix: "" },
      { key: "nextValue", label: "V(s')", value: 8.88, suffix: "" },
    ],
    nodes: [
      { label: "Actor", value: "pi(right)=0.62" },
      { label: "Critic V(s)", value: "8.4" },
      { label: "TD error", value: "+1.3" },
      { label: "Actor update", value: "chosen action up" },
    ],
    metrics: [
      { label: "delta", value: "+1.30" },
      { label: "V target", value: "9.70" },
      { label: "policy shift", value: "+0.04" },
    ],
  },
  {
    id: "trpo",
    shortName: "TRPO",
    title: "TRPO：策略更新不能一步跨太远",
    chapter: "第 11 章 TRPO 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/trpo算法",
    intuition: "TRPO 用 KL 散度约束新旧策略距离，避免一次策略更新毁掉已有能力。",
    steps: [
      "记录旧策略分布",
      "提出一个让回报变高的新策略",
      "计算新旧策略 KL",
      "与 max KL 约束比较",
      "过大就缩小步长",
      "只接受 trust region 内的更新",
    ],
    formula: "maximize surrogate subject to KL(pi_old, pi_new) <= delta",
    controls: [
      { key: "maxKl", label: "Max KL", value: 0.01, suffix: "" },
      { key: "proposedKl", label: "Proposed KL", value: 0.04, suffix: "" },
      { key: "scale", label: "Step scale", value: 0.5, suffix: "" },
    ],
    nodes: [
      { label: "old pi", value: "[0.55, 0.45]" },
      { label: "proposed pi", value: "[0.25, 0.75]" },
      { label: "KL", value: "0.04" },
      { label: "accepted step", value: "50%" },
    ],
    metrics: [
      { label: "max KL", value: "0.01" },
      { label: "est. final KL", value: "0.01" },
      { label: "allowed", value: "scaled" },
    ],
  },
  {
    id: "ppo",
    shortName: "PPO",
    title: "PPO：用裁剪近似 trust region",
    chapter: "第 12 章 PPO 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/ppo算法",
    intuition: "PPO 不直接解复杂约束，而是把新旧策略概率比裁剪在安全区间内。",
    steps: [
      "保存旧策略概率",
      "计算新策略概率",
      "得到概率比 ratio",
      "乘上优势函数",
      "裁剪 ratio 到 1±epsilon",
      "选未裁剪与裁剪目标中的保守值",
    ],
    formula: "L = min(ratio * A, clip(ratio, 1-eps, 1+eps) * A)",
    controls: [
      { key: "ratio", label: "Ratio", value: 1.34, suffix: "" },
      { key: "clip", label: "Clip eps", value: 0.2, suffix: "" },
      { key: "advantage", label: "Advantage", value: 2, suffix: "" },
    ],
    nodes: [
      { label: "old prob", value: "0.44" },
      { label: "new prob", value: "0.59" },
      { label: "ratio", value: "1.34" },
      { label: "clipped", value: "1.20" },
    ],
    metrics: [
      { label: "unclipped", value: "2.68" },
      { label: "clipped", value: "2.40" },
      { label: "objective", value: "2.40" },
    ],
  },
  {
    id: "ddpg",
    shortName: "DDPG",
    title: "DDPG：连续动作里的确定性 Actor-Critic",
    chapter: "第 13 章 DDPG 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/ddpg算法",
    intuition: "Actor 直接输出连续动作，Critic 判断这个动作的 Q 值，再反向推动 Actor 输出更好的动作。",
    steps: [
      "Actor 输出连续动作",
      "给动作加入探索噪声",
      "环境返回 transition",
      "经验进入 replay buffer",
      "Critic 学习 Q target",
      "Actor 朝 Critic 认为更高 Q 的方向移动",
    ],
    formula: "target = r + gamma Q_target(s', mu_target(s'))",
    controls: [
      { key: "noise", label: "Noise", value: 0.12, suffix: "" },
      { key: "tau", label: "Soft tau", value: 0.005, suffix: "" },
      { key: "action", label: "Action", value: 0.37, suffix: "" },
      { key: "reward", label: "Reward", value: 1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.98, suffix: "" },
      { key: "targetAction", label: "Target mu", value: 0.34, suffix: "" },
    ],
    nodes: [
      { label: "Actor mu(s)", value: "0.37" },
      { label: "noise", value: "+0.12" },
      { label: "Critic Q", value: "2.8" },
      { label: "target update", value: "soft tau" },
    ],
    metrics: [
      { label: "action", value: "0.49" },
      { label: "Q target", value: "3.14" },
      { label: "tau", value: "0.005" },
    ],
  },
  {
    id: "sac",
    shortName: "SAC",
    title: "SAC：最大熵强化学习",
    chapter: "第 14 章 SAC 算法",
    sourceUrl: "https://hrl.boyuai.com/chapter/2/sac算法",
    intuition: "SAC 不只追求高回报，也奖励策略保持随机性，让探索成为目标的一部分。",
    steps: [
      "随机策略采样连续动作",
      "两个 Critic 给出 Q 估计",
      "取较小 Q 抑制高估",
      "加入 entropy bonus",
      "更新 soft Q target",
      "调节温度 alpha 平衡探索",
    ],
    formula: "target = r + gamma * (min Q_target(s',a') + alpha * H(pi(.|s')))",
    controls: [
      { key: "reward", label: "Reward", value: 1, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.99, suffix: "" },
      { key: "alpha", label: "Alpha", value: 0.2, suffix: "" },
      { key: "entropy", label: "Entropy", value: 1.5, suffix: "" },
      { key: "minQ", label: "Min Q", value: 3, suffix: "" },
    ],
    nodes: [
      { label: "sample a", value: "0.28 / -0.14" },
      { label: "Q1 / Q2", value: "3.4 / 3.0" },
      { label: "entropy", value: "1.5" },
      { label: "soft target", value: "4.267" },
    ],
    metrics: [
      { label: "min Q", value: "3.00" },
      { label: "alpha H", value: "0.30" },
      { label: "target", value: "4.267" },
    ],
  },
];

const ADVANCED_THEORY = {
  dqn: {
    core: "DQN 用神经网络近似动作价值函数，把原来只能查表的 Q 表扩展到高维或连续状态；网络输入状态，输出每个离散动作的 Q 值。",
    formula: "TD target 仍是 Q-learning 的自举目标，只是下一状态价值来自目标网络的 max Q；replay buffer 打散样本相关性，目标网络降低追逐移动目标的不稳定。",
    note: "DQN 适合连续状态、离散动作。训练不稳定通常来自样本相关性、目标变化和过估计，所以经验回放、目标网络与探索都不是装饰。",
  },
  "dqn-upgrades": {
    core: "Double DQN 用在线网络选动作、目标网络估值，减少 max 操作带来的过估计；Dueling DQN 分离 V(s) 和 A(s,a)，让网络更快识别状态本身好坏。",
    formula: "Double target 把 argmax 和 value 拆开；优先经验回放按 TD error 提高关键样本采样概率，但需要重要性采样修正由采样分布改变带来的偏差。",
    note: "这些改进不是换掉 DQN 目标，而是在稳定性、估值偏差和样本效率上补短板。优先回放会改变训练数据分布，不能只看采样次数更多。",
  },
  "policy-gradient": {
    core: "策略梯度直接优化参数化策略，不先学习 Q 表；一次采样轨迹后，用回报提高好动作的 log 概率、降低坏动作的概率。",
    formula: "REINFORCE 梯度形如 G_t * grad log pi(a|s)，baseline 不改变期望梯度，只降低方差；advantage 表示当前动作比基线好多少。",
    note: "策略梯度天然适合随机策略和连续动作，但样本效率低、方差高。baseline、回报归一化和 actor-critic 都是在缓解这个问题。",
  },
  "actor-critic": {
    core: "Actor 负责选动作，Critic 负责估计价值；Critic 用 TD error 给 Actor 提供比整条轨迹回报更低方差的学习信号。",
    formula: "delta = r + gamma V(s') - V(s) 同时是 Critic 的误差和 Actor 的优势信号；delta 为正就强化当前动作，为负就压低概率。",
    note: "Actor-Critic 把 bootstrapping 带进策略梯度，降低方差但引入估计偏差。Critic 不准时，Actor 会被错误方向带偏。",
  },
  trpo: {
    core: "TRPO 解决策略更新过大导致性能崩掉的问题；它在提高 surrogate objective 的同时约束新旧策略之间的 KL 距离。",
    formula: "KL 约束定义 trust region，近似二阶优化先给出搜索方向，再通过步长缩放或线搜索让 KL 不超过 max KL。",
    note: "TRPO 的重点不是公式复杂，而是稳健更新思想。它通常稳定但实现复杂、计算贵，这也促成了 PPO 的裁剪式简化。",
  },
  ppo: {
    core: "PPO 保留 trust region 的保守思想，但不显式求解约束；它把新旧策略概率比裁剪在 1±epsilon 附近。",
    formula: "目标取 min(ratio*A, clip(ratio)*A)：正优势限制 ratio 过大，负优势限制 ratio 过小，始终选择更保守的目标。",
    note: "PPO 的 clip 不是保证 KL 永远小，而是便宜的近似约束。epsilon 太大更新激进，太小学习慢；负 advantage 时裁剪方向会反过来。",
  },
  ddpg: {
    core: "DDPG 把 DQN 的 replay buffer、目标网络和 Actor-Critic 结合起来，用确定性 Actor 直接输出连续动作。",
    formula: "Critic 学习 r + gamma Q_target(s', mu_target(s'))；Actor 沿 Critic 认为 Q 会增加的方向调整动作输出。",
    note: "DDPG 面向连续动作，但探索依赖外加噪声且对超参数敏感。tau 只是目标网络软更新速度，不直接进入 Q target。",
  },
  sac: {
    core: "SAC 在最大化回报之外最大化策略熵，让策略保持随机性；它用双 Critic 抑制高估，并学习随机连续动作策略。",
    formula: "soft target = r + gamma(min Q + alpha * H)，entropy bonus 奖励不确定性；alpha 决定探索和利用之间的平衡。",
    note: "SAC 的随机性不是临时训练噪声，而是目标函数的一部分。alpha 太大过分探索，太小会退化得更像普通 actor-critic。",
  },
};

ADVANCED_ALGORITHMS.forEach((algorithm) => {
  algorithm.theory = ADVANCED_THEORY[algorithm.id];
});

export function round(value, places = 6) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function calculateDqnTarget({ reward, gamma, done, targetNextValues }) {
  const nextValue = done ? 0 : Math.max(...targetNextValues);
  return round(reward + gamma * nextValue, 6);
}

export function clipPpoObjective({ ratio, advantage, clipEpsilon }) {
  const lower = 1 - clipEpsilon;
  const upper = 1 + clipEpsilon;
  const clippedRatio = Math.min(upper, Math.max(lower, ratio));
  const unclipped = ratio * advantage;
  const clipped = clippedRatio * advantage;
  const objective = Math.min(unclipped, clipped);

  return {
    clippedRatio: round(clippedRatio, 6),
    unclipped: round(unclipped, 6),
    clipped: round(clipped, 6),
    objective: round(objective, 6),
    wasClipped: clippedRatio !== ratio,
  };
}

export function sacSoftTarget({ reward, gamma, minNextQ, alpha, nextEntropy, done }) {
  const softNext = done ? 0 : minNextQ + alpha * nextEntropy;
  return round(reward + gamma * softNext, 6);
}

export function trpoStepScale({ proposedKl, maxKl }) {
  if (proposedKl <= maxKl) {
    return {
      allowed: true,
      scale: 1,
      finalKl: round(proposedKl, 6),
    };
  }

  const scale = Math.sqrt(maxKl / proposedKl);
  return {
    allowed: false,
    scale: round(scale, 6),
    finalKl: round(proposedKl * scale * scale, 6),
  };
}

const CONTROL_SETTINGS = {
  dqn: {
    onlineLeft: { min: 0, max: 10, step: 0.1 },
    onlineRight: { min: 0, max: 10, step: 0.1 },
    reward: { min: -2, max: 2, step: 0.1 },
    gamma: { min: 0.8, max: 0.999, step: 0.001 },
    targetLeft: { min: 0, max: 10, step: 0.1 },
    targetRight: { min: 0, max: 10, step: 0.1 },
  },
  "dqn-upgrades": {
    double: { readOnly: true },
    dueling: { readOnly: true },
    priority: { min: 0, max: 1, step: 0.05 },
  },
  "policy-gradient": {
    return: { min: -10, max: 30, step: 1 },
    baseline: { min: -10, max: 30, step: 1 },
    lr: { min: 0.005, max: 0.1, step: 0.005 },
  },
  "actor-critic": {
    actor: { min: 0.001, max: 0.05, step: 0.001 },
    critic: { min: 0.005, max: 0.15, step: 0.005 },
    gamma: { min: 0.8, max: 0.999, step: 0.001 },
    reward: { min: -2, max: 4, step: 0.1 },
    currentValue: { min: 0, max: 15, step: 0.1 },
    nextValue: { min: 0, max: 15, step: 0.1 },
  },
  trpo: {
    maxKl: { min: 0.001, max: 0.05, step: 0.001 },
    proposedKl: { min: 0.001, max: 0.12, step: 0.001 },
    scale: { min: 0, max: 1, step: 0.01, readOnly: true },
  },
  ppo: {
    ratio: { min: 0.4, max: 1.8, step: 0.01 },
    clip: { min: 0.05, max: 0.4, step: 0.01 },
    advantage: { min: -4, max: 4, step: 0.1 },
  },
  ddpg: {
    noise: { min: -0.4, max: 0.4, step: 0.01 },
    tau: { min: 0.001, max: 0.05, step: 0.001 },
    action: { min: -1, max: 1, step: 0.01 },
    reward: { min: -2, max: 4, step: 0.1 },
    gamma: { min: 0.8, max: 0.999, step: 0.001 },
    targetAction: { min: -1, max: 1, step: 0.01 },
  },
  sac: {
    reward: { min: -2, max: 4, step: 0.1 },
    gamma: { min: 0.8, max: 0.999, step: 0.001 },
    alpha: { min: 0.01, max: 0.6, step: 0.01 },
    entropy: { min: 0, max: 3, step: 0.05 },
    minQ: { min: -1, max: 8, step: 0.1 },
  },
};

function formatNumber(value, places = 2) {
  return Number(value).toFixed(places);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function controlsWithOverrides(algorithm, overrides = {}) {
  const settings = CONTROL_SETTINGS[algorithm.id] ?? {};
  return algorithm.controls.map((control) => ({
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

function replaceControl(controls, key, value) {
  return controls.map((control) => (
    control.key === key ? { ...control, value } : control
  ));
}

function buildDqnContent(algorithm, controls) {
  const values = controlMap(controls);
  const maxTarget = Math.max(values.targetLeft, values.targetRight);
  const target = calculateDqnTarget({
    reward: values.reward,
    gamma: values.gamma,
    done: false,
    targetNextValues: [values.targetLeft, values.targetRight],
  });

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "Q online": `left ${formatNumber(values.onlineLeft)} / right ${formatNumber(values.onlineRight)}`,
      replay: "+ transition",
      "target net": `max ${formatNumber(maxTarget)}`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      reward: formatNumber(values.reward),
      "max target": formatNumber(maxTarget),
      "TD target": formatNumber(target, 3),
    }),
    controls,
  };
}

function buildDqnUpgradeContent(algorithm, controls) {
  const values = controlMap(controls);
  const sampleProbability = clamp(0.15 + values.priority * 0.27, 0.15, 0.95);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "target value": values.double === "on" ? "1.73" : "1.98",
      "A(s,a)": values.dueling === "on" ? "[-0.2, 0.4]" : "mixed in Q",
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      overestimate: values.double === "on" ? "-32%" : "high",
      "priority top": `TD ${formatNumber(1.2 + values.priority, 1)}`,
      "sample p": formatNumber(sampleProbability),
    }),
    controls,
  };
}

function buildPolicyGradientContent(algorithm, controls) {
  const values = controlMap(controls);
  const advantage = values.return - values.baseline;
  const shift = clamp(values.lr * advantage, -0.25, 0.25);
  const rightProbability = clamp(0.59 + shift, 0.05, 0.95);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "pi(left)": formatNumber(1 - rightProbability),
      "pi(right)": formatNumber(rightProbability),
      trajectory: `R=${formatNumber(values.return, 0)}`,
      "prob update": `right ${shift >= 0 ? "+" : ""}${formatNumber(shift)}`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      return: formatNumber(values.return, 0),
      advantage: `${advantage >= 0 ? "+" : ""}${formatNumber(advantage, 0)}`,
      entropy: formatNumber(-(rightProbability * Math.log(rightProbability) + (1 - rightProbability) * Math.log(1 - rightProbability))),
    }),
    controls,
  };
}

function buildActorCriticContent(algorithm, controls) {
  const values = controlMap(controls);
  const target = values.reward + values.gamma * values.nextValue;
  const delta = target - values.currentValue;
  const policyShift = values.actor * delta;

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "Critic V(s)": formatNumber(values.currentValue),
      "TD error": `${delta >= 0 ? "+" : ""}${formatNumber(delta)}`,
      "Actor update": `chosen ${policyShift >= 0 ? "up" : "down"} ${formatNumber(Math.abs(policyShift), 3)}`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      delta: `${delta >= 0 ? "+" : ""}${formatNumber(delta)}`,
      "V target": formatNumber(target),
      "policy shift": `${policyShift >= 0 ? "+" : ""}${formatNumber(policyShift, 3)}`,
    }),
    controls,
  };
}

function buildTrpoContent(algorithm, controls) {
  const values = controlMap(controls);
  const result = trpoStepScale({
    proposedKl: values.proposedKl,
    maxKl: values.maxKl,
  });
  const nextControls = replaceControl(controls, "scale", result.scale);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      KL: formatNumber(values.proposedKl, 3),
      "accepted step": `${Math.round(result.scale * 100)}%`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "max KL": formatNumber(values.maxKl, 3),
      "est. final KL": formatNumber(result.finalKl, 3),
      allowed: result.allowed ? "yes" : "scaled",
    }),
    controls: nextControls,
  };
}

function buildPpoContent(algorithm, controls) {
  const values = controlMap(controls);
  const result = clipPpoObjective({
    ratio: values.ratio,
    advantage: values.advantage,
    clipEpsilon: values.clip,
  });
  const oldProbability = 0.44;
  const newProbability = oldProbability * values.ratio;
  const clipDirection = values.advantage < 0
    ? "negative A: lower ratio is punished"
    : values.advantage > 0
      ? "positive A: upper ratio is capped"
      : "zero A: clipping has no effect";

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "old prob": formatNumber(oldProbability),
      "new prob": formatNumber(newProbability),
      ratio: formatNumber(values.ratio),
      clipped: formatNumber(result.clippedRatio),
    }),
    metrics: [
      ...replaceByLabel(algorithm.metrics, {
        unclipped: formatNumber(result.unclipped),
        clipped: formatNumber(result.clipped),
        objective: formatNumber(result.objective),
      }),
      { label: "clip direction", value: clipDirection },
    ],
    controls,
  };
}

function ddpgCriticQ(action) {
  return 2.2 + action * 1.5;
}

function buildDdpgContent(algorithm, controls) {
  const values = controlMap(controls);
  const exploredAction = clamp(values.action + values.noise, -1, 1);
  const targetAction = clamp(values.targetAction, -1, 1);
  const targetCriticQ = ddpgCriticQ(targetAction);
  const qTarget = values.reward + values.gamma * targetCriticQ;

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "Actor mu(s)": formatNumber(values.action),
      noise: `${values.noise >= 0 ? "+" : ""}${formatNumber(values.noise)}`,
      "Critic Q": formatNumber(ddpgCriticQ(exploredAction)),
      "target update": `soft tau ${formatNumber(values.tau, 3)}`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      action: formatNumber(exploredAction),
      "Q target": formatNumber(qTarget),
      tau: formatNumber(values.tau, 3),
    }),
    controls,
  };
}

function buildSacContent(algorithm, controls) {
  const values = controlMap(controls);
  const entropyBonus = values.alpha * values.entropy;
  const target = sacSoftTarget({
    reward: values.reward,
    gamma: values.gamma,
    minNextQ: values.minQ,
    alpha: values.alpha,
    nextEntropy: values.entropy,
    done: false,
  });

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "Q1 / Q2": `${formatNumber(values.minQ + 0.4)} / ${formatNumber(values.minQ)}`,
      entropy: formatNumber(values.entropy),
      "soft target": formatNumber(target, 3),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "min Q": formatNumber(values.minQ),
      "alpha H": formatNumber(entropyBonus),
      target: formatNumber(target, 3),
    }),
    controls,
  };
}

function buildCalculatedContent(algorithm, controls) {
  if (algorithm.id === "dqn") return buildDqnContent(algorithm, controls);
  if (algorithm.id === "dqn-upgrades") return buildDqnUpgradeContent(algorithm, controls);
  if (algorithm.id === "policy-gradient") return buildPolicyGradientContent(algorithm, controls);
  if (algorithm.id === "actor-critic") return buildActorCriticContent(algorithm, controls);
  if (algorithm.id === "trpo") return buildTrpoContent(algorithm, controls);
  if (algorithm.id === "ppo") return buildPpoContent(algorithm, controls);
  if (algorithm.id === "ddpg") return buildDdpgContent(algorithm, controls);
  if (algorithm.id === "sac") return buildSacContent(algorithm, controls);
  return { nodes: algorithm.nodes, metrics: algorithm.metrics, controls };
}

export function chapterDisplayName(chapter) {
  return chapter.replace(/^第 \d+ 章 /, "");
}

export function buildAdvancedFrame(algorithm, tick = 0, overrides = {}) {
  const phase = tick % algorithm.steps.length;
  const progress = (phase + 1) / algorithm.steps.length;
  const controls = controlsWithOverrides(algorithm, overrides);
  const content = buildCalculatedContent(algorithm, controls);

  return {
    ...algorithm,
    phase,
    activeStep: algorithm.steps[phase],
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

export function buildAdvancedBatchDemo(algorithm, tick = 0, overrides = {}) {
  return algorithm.steps.map((_, index) => buildAdvancedFrame(algorithm, tick + index, overrides));
}
