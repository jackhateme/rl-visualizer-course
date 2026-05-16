export const FRONTIER_ALGORITHMS = [
  {
    id: "imitation",
    shortName: "IL",
    title: "模仿学习：从专家轨迹到占用度量",
    chapter: "第 15 章 模仿学习",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/模仿学习",
    intuition: "BC 把专家动作当标签，GAIL 则让策略生成的状态动作分布逐步接近专家分布。",
    steps: [
      "收集专家状态动作对",
      "行为克隆直接拟合专家动作",
      "观察分布偏移带来的复合误差",
      "判别器区分专家和智能体数据",
      "把判别器输出转成策略奖励",
      "用策略优化逼近专家占用度量",
    ],
    formula: "BC drift = 1 - (1 - e)^H; GAIL reward = -log D(s,a)",
    controls: [
      { key: "expertSamples", label: "Expert samples", value: 30, suffix: "" },
      { key: "bcError", label: "BC step error", value: 0.08, suffix: "" },
      { key: "horizon", label: "Horizon", value: 12, suffix: "" },
      { key: "discriminator", label: "D(agent)", value: 0.3, suffix: "" },
    ],
    nodes: [
      { label: "expert data", value: "30 pairs" },
      { label: "BC drift", value: "63.28%" },
      { label: "D(agent)", value: "0.30" },
      { label: "GAIL reward", value: "1.204" },
    ],
    metrics: [
      { label: "BC error", value: "0.08" },
      { label: "compounding", value: "63.28%" },
      { label: "GAIL reward", value: "1.204" },
    ],
  },
  {
    id: "mpc",
    shortName: "MPC",
    title: "模型预测控制：边推演边执行",
    chapter: "第 16 章 模型预测控制",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/模型预测控制",
    intuition: "MPC 不显式学习策略，而是用模型评估候选动作序列，只执行最佳序列的第一个动作。",
    steps: [
      "从当前状态生成候选动作序列",
      "用环境模型预测每条序列回报",
      "随机打靶选择当前最优序列",
      "CEM 保留 elite 序列",
      "更新动作序列分布的均值和方差",
      "PETS 用模型集成表达不确定性",
    ],
    formula: "CEM: mean/var <- w*old + (1-w)*elite_mean/var",
    controls: [
      { key: "sequences", label: "Sequences", value: 64, suffix: "" },
      { key: "horizon", label: "Horizon", value: 5, suffix: "" },
      { key: "eliteRatio", label: "Elite ratio", value: 0.2, suffix: "" },
      { key: "mean", label: "Mean", value: 0, suffix: "" },
      { key: "variance", label: "Variance", value: 1, suffix: "" },
      { key: "eliteMean", label: "Elite mean", value: 0.6, suffix: "" },
      { key: "eliteVariance", label: "Elite var", value: 0.16, suffix: "" },
    ],
    nodes: [
      { label: "candidates", value: "64 x 5" },
      { label: "elite set", value: "13 seq" },
      { label: "CEM mean", value: "0.54" },
      { label: "PETS ensemble", value: "uncertainty" },
    ],
    metrics: [
      { label: "elite count", value: "13" },
      { label: "new mean", value: "0.54" },
      { label: "new variance", value: "0.24" },
    ],
  },
  {
    id: "mbpo",
    shortName: "MBPO",
    title: "MBPO：从真实轨迹上长出短模型分支",
    chapter: "第 17 章 基于模型的策略优化",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/基于模型的策略优化",
    intuition: "模型 rollout 太长会累积误差，MBPO 从真实状态出发只做短分支，用模型样本提高 SAC 的采样效率。",
    steps: [
      "用真实环境数据训练动力学模型",
      "从真实 replay buffer 采样起点",
      "用当前策略在模型中短推演",
      "把模型轨迹加入模型数据池",
      "用 SAC 从真实和模型数据中更新策略",
      "权衡模型误差和样本效率",
    ],
    formula: "model ratio = H*B / (real + H*B)",
    controls: [
      { key: "horizon", label: "Rollout H", value: 3, suffix: "" },
      { key: "branches", label: "Branches", value: 20, suffix: "" },
      { key: "modelError", label: "Model error", value: 0.08, suffix: "" },
      { key: "realSamples", label: "Real samples", value: 100, suffix: "" },
    ],
    nodes: [
      { label: "real buffer", value: "100" },
      { label: "short rollout", value: "H=3" },
      { label: "model data", value: "60" },
      { label: "error", value: "25.97%" },
    ],
    metrics: [
      { label: "synthetic", value: "60" },
      { label: "model ratio", value: "37.50%" },
      { label: "compounded error", value: "25.97%" },
    ],
  },
  {
    id: "offline-rl",
    shortName: "Offline",
    title: "离线强化学习：别相信数据外的高 Q",
    chapter: "第 18 章 离线强化学习",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/离线强化学习",
    intuition: "离线 RL 不能继续向环境试错，因此要压制数据集外动作的外推误差。",
    steps: [
      "只拿固定数据集训练",
      "发现策略可能选择数据外动作",
      "外推误差让 OOD 动作 Q 被高估",
      "BCQ 把动作限制在数据附近",
      "CQL 对过高的 OOD Q 加保守惩罚",
      "得到更保守但更可靠的策略",
    ],
    formula: "CQL target = TD target - alpha * max(0, Q_ood - Q_data)",
    controls: [
      { key: "tdTarget", label: "TD target", value: 7, suffix: "" },
      { key: "dataQ", label: "Q data", value: 4, suffix: "" },
      { key: "oodQ", label: "Q OOD", value: 9, suffix: "" },
      { key: "alpha", label: "CQL alpha", value: 0.4, suffix: "" },
    ],
    nodes: [
      { label: "dataset", value: "fixed" },
      { label: "OOD Q", value: "9.00" },
      { label: "penalty", value: "2.00" },
      { label: "CQL target", value: "5.00" },
    ],
    metrics: [
      { label: "gap", value: "5.00" },
      { label: "penalty", value: "2.00" },
      { label: "CQL target", value: "5.00" },
    ],
  },
  {
    id: "goal-rl",
    shortName: "HER",
    title: "目标导向强化学习：失败也能换个目标学习",
    chapter: "第 19 章 目标导向的强化学习",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/目标导向的强化学习",
    intuition: "HER 用实际达到的状态重标记目标，让原本失败的稀疏奖励轨迹也能产生学习信号。",
    steps: [
      "策略以目标 g 为条件行动",
      "稀疏奖励让失败轨迹全是 -1",
      "记录轨迹中实际达到的状态",
      "把 achieved goal 当作新目标重标记",
      "重新计算目标相关奖励",
      "把重标记 transition 放回 replay buffer",
    ],
    formula: "r(s,a,g) = 0 if distance(achieved, g) <= eps else -1",
    controls: [
      { key: "originalDistance", label: "Dist to g", value: 0.7, suffix: "" },
      { key: "relabeledDistance", label: "Dist to g'", value: 0.04, suffix: "" },
      { key: "threshold", label: "Goal eps", value: 0.1, suffix: "" },
    ],
    nodes: [
      { label: "original g", value: "missed" },
      { label: "achieved g'", value: "near" },
      { label: "old reward", value: "-1" },
      { label: "new reward", value: "0" },
    ],
    metrics: [
      { label: "original reward", value: "-1" },
      { label: "relabel reward", value: "0" },
      { label: "threshold", value: "0.10" },
    ],
  },
  {
    id: "marl-intro",
    shortName: "IPPO",
    title: "多智能体入门：独立学习面对非稳态环境",
    chapter: "第 20 章 多智能体强化学习入门",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/多智能体强化学习入门",
    intuition: "IPPO 把每个智能体当成独立 PPO 来训练，同质智能体可共享参数，但每个智能体眼中的环境会随其他策略变化。",
    steps: [
      "多个智能体同时与环境交互",
      "每个智能体独立收集轨迹",
      "其他智能体更新会造成非稳态",
      "IPPO 对每个智能体套用 PPO",
      "同质智能体可共享参数",
      "观察胜率而非单条回报",
    ],
    formula: "centralized size = N * (obs_dim + action_dim)",
    controls: [
      { key: "agents", label: "Agents", value: 2, suffix: "" },
      { key: "obsDim", label: "Obs dim", value: 8, suffix: "" },
      { key: "actionDim", label: "Action dim", value: 5, suffix: "" },
      { key: "policyDrift", label: "Policy drift", value: 0.18, suffix: "" },
    ],
    nodes: [
      { label: "agents", value: "2" },
      { label: "mode", value: "decentralized" },
      { label: "non-stationary", value: "18.00%" },
      { label: "shared PPO", value: "on" },
    ],
    metrics: [
      { label: "joint size", value: "26" },
      { label: "policy drift", value: "18.00%" },
      { label: "sharing", value: "homogeneous" },
    ],
  },
  {
    id: "maddpg",
    shortName: "MADDPG",
    title: "多智能体进阶：中心化 Critic，去中心化 Actor",
    chapter: "第 21 章 多智能体强化学习进阶",
    sourceUrl: "https://hrl.boyuai.com/chapter/3/多智能体强化学习进阶",
    intuition: "MADDPG 训练时让 Critic 看见所有智能体的观测和动作，执行时每个 Actor 只依赖自己的观测。",
    steps: [
      "每个智能体拥有自己的 Actor",
      "经验回放保存联合 transition",
      "中心化 Critic 输入所有观测和动作",
      "用目标 Actor/Critic 构造 TD target",
      "每个 Actor 沿自己的策略梯度更新",
      "执行阶段只保留去中心化 Actor",
    ],
    formula: "y_i = r_i + gamma * Q_i'(x', a_1', ..., a_N')",
    controls: [
      { key: "agents", label: "Agents", value: 3, suffix: "" },
      { key: "obsDim", label: "Obs dim", value: 8, suffix: "" },
      { key: "actionDim", label: "Action dim", value: 2, suffix: "" },
      { key: "reward", label: "Reward", value: 1.2, suffix: "" },
      { key: "gamma", label: "Gamma", value: 0.95, suffix: "" },
      { key: "targetQ", label: "Target Q", value: 4.6, suffix: "" },
      { key: "tau", label: "Soft tau", value: 0.01, suffix: "" },
    ],
    nodes: [
      { label: "actor i", value: "local obs" },
      { label: "critic i", value: "joint input" },
      { label: "target", value: "5.57" },
      { label: "execution", value: "decentralized" },
    ],
    metrics: [
      { label: "critic input", value: "30" },
      { label: "TD target", value: "5.57" },
      { label: "tau", value: "0.010" },
    ],
  },
];

const FRONTIER_THEORY = {
  imitation: {
    core: "模仿学习用专家轨迹替代人工设计奖励。行为克隆把专家动作当监督标签，GAIL 则让智能体的状态动作占用分布逼近专家。",
    formula: "BC 的单步错误会随 horizon 复合；GAIL 常把判别器输出转成 reward，例如 -log D(agent)，让策略逐步骗过判别器。",
    note: "BC 简单但怕分布偏移：一旦智能体走到专家没覆盖的状态，错误会滚雪球。GAIL 可交互优化，但训练更复杂也更不稳定。",
  },
  mpc: {
    core: "模型预测控制用模型在线规划：每一步从当前状态评估候选动作序列，只执行最佳序列的第一个动作，然后重新规划。",
    formula: "random shooting 直接采样动作序列，CEM 反复保留 elite 序列并更新分布均值和方差；PETS 用模型集成表达不确定性。",
    note: "MPC 学到的是模型和规划器，不是固定策略。模型误差和规划预算决定效果，执行一步就重规划是它抵抗误差的安全阀。",
  },
  mbpo: {
    core: "MBPO 属于基于模型的策略优化：先学动力学模型，再从真实状态出发生成短模型 rollout 来补充真实样本。",
    formula: "模型样本比例随 horizon 和 branch 数增加，但模型误差也随 rollout 长度累积；短分支是在样本效率和模型偏差之间折中。",
    note: "模型 rollout 不是越长越好。越往未来滚，模型误差越可能污染策略更新；MBPO 的关键是从真实数据附近长出短分支。",
  },
  "offline-rl": {
    core: "离线强化学习只能使用固定数据集，不能继续向环境探索；最大风险是策略选择数据集中没见过的动作，而 Q 函数却给它虚高估值。",
    formula: "CQL 用保守项惩罚数据外动作的高 Q，例如 target - alpha * max(0, Q_ood - Q_data)，把策略拉回数据支持附近。",
    note: "离线 RL 的核心不是更会探索，而是更会克制。数据覆盖不好时，过强的策略改进反而会把策略推到不可信区域。",
  },
  "goal-rl": {
    core: "目标导向 RL 把目标 g 作为策略和价值函数的输入，解决同一环境中的多目标泛化问题；稀疏奖励会让学习信号很少。",
    formula: "HER 把失败轨迹中实际达到的状态重标记为新目标，并重新计算 r(s,a,g')，把失败样本变成对新目标成功的样本。",
    note: "HER 不改变物理轨迹，只改变这条轨迹在追求哪个目标的解释。它适合目标可重标记、奖励能按新目标重新计算的任务。",
  },
  "marl-intro": {
    core: "多智能体中每个智能体都在学习，导致单个智能体看到的环境非稳态。IPPO 简单地对每个智能体使用 PPO，常配合同质智能体参数共享。",
    formula: "联合信息规模随智能体数增长；独立学习只看局部经验，而中心化训练可以利用更多全局观测和联合动作信息。",
    note: "多智能体不要只看单体回报，还要看协作、竞争和胜率。独立 PPO 简单，但会受到其他智能体策略变化的影响。",
  },
  maddpg: {
    core: "MADDPG 采用集中训练、分散执行：训练时 Critic 看所有智能体观测和动作，执行时每个 Actor 只看自己的观测。",
    formula: "y_i = r_i + gamma Q_i'(x', a_1', ..., a_N')，每个智能体有自己的 Critic，target 依赖联合动作。",
    note: "中心化 Critic 是训练辅助，不代表执行时需要全局通信。它缓解非稳态，但智能体数增加会带来输入维度和信用分配压力。",
  },
};

FRONTIER_ALGORITHMS.forEach((algorithm) => {
  algorithm.theory = FRONTIER_THEORY[algorithm.id];
});

export function round(value, places = 6) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

export function behaviorCloningCompoundingError({ singleStepError, horizon }) {
  return round(1 - (1 - singleStepError) ** horizon, 6);
}

export function gailDiscriminatorReward({ agentProbability }) {
  return round(-Math.log(clamp(agentProbability, 1e-6, 1)), 6);
}

export function cemDistributionUpdate({
  mean,
  variance,
  eliteMean,
  eliteVariance,
  oldWeight,
}) {
  return {
    mean: round(oldWeight * mean + (1 - oldWeight) * eliteMean, 6),
    variance: round(oldWeight * variance + (1 - oldWeight) * eliteVariance, 6),
  };
}

export function mbpoRolloutTradeoff({ horizon, branches, modelError, realSamples }) {
  const syntheticSamples = horizon * branches;
  return {
    syntheticSamples,
    modelRatio: round(syntheticSamples / (realSamples + syntheticSamples), 6),
    compoundedError: round((1 + modelError) ** horizon - 1, 6),
  };
}

export function cqlConservativeTarget({ tdTarget, dataQ, oodQ, alpha }) {
  return round(tdTarget - alpha * Math.max(0, oodQ - dataQ), 6);
}

export function herRelabelReward({ originalDistance, relabeledDistance, threshold }) {
  return {
    originalReward: originalDistance <= threshold ? 0 : -1,
    relabeledReward: relabeledDistance <= threshold ? 0 : -1,
  };
}

export function centralizedCriticInputSize({ agents, obsDim, actionDim }) {
  return agents * (obsDim + actionDim);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value, places = 2) {
  return Number(value).toFixed(places);
}

function formatPercent(value) {
  return `${formatNumber(value * 100)}%`;
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

const CONTROL_SETTINGS = {
  imitation: {
    expertSamples: { min: 5, max: 300, step: 5 },
    bcError: { min: 0, max: 0.4, step: 0.01 },
    horizon: { min: 1, max: 50, step: 1 },
    discriminator: { min: 0.05, max: 0.95, step: 0.01 },
  },
  mpc: {
    sequences: { min: 8, max: 256, step: 8 },
    horizon: { min: 1, max: 20, step: 1 },
    eliteRatio: { min: 0.05, max: 0.5, step: 0.01 },
    mean: { min: -1, max: 1, step: 0.01 },
    variance: { min: 0.01, max: 2, step: 0.01 },
    eliteMean: { min: -1, max: 1, step: 0.01 },
    eliteVariance: { min: 0.01, max: 1, step: 0.01 },
  },
  mbpo: {
    horizon: { min: 1, max: 15, step: 1 },
    branches: { min: 1, max: 100, step: 1 },
    modelError: { min: 0, max: 0.4, step: 0.01 },
    realSamples: { min: 20, max: 500, step: 10 },
  },
  "offline-rl": {
    tdTarget: { min: -5, max: 12, step: 0.1 },
    dataQ: { min: -5, max: 12, step: 0.1 },
    oodQ: { min: -5, max: 12, step: 0.1 },
    alpha: { min: 0, max: 1.5, step: 0.05 },
  },
  "goal-rl": {
    originalDistance: { min: 0, max: 1.5, step: 0.01 },
    relabeledDistance: { min: 0, max: 1.5, step: 0.01 },
    threshold: { min: 0.01, max: 0.5, step: 0.01 },
  },
  "marl-intro": {
    agents: { min: 2, max: 8, step: 1 },
    obsDim: { min: 2, max: 32, step: 1 },
    actionDim: { min: 2, max: 16, step: 1 },
    policyDrift: { min: 0, max: 0.8, step: 0.01 },
  },
  maddpg: {
    agents: { min: 2, max: 8, step: 1 },
    obsDim: { min: 2, max: 32, step: 1 },
    actionDim: { min: 1, max: 16, step: 1 },
    reward: { min: -3, max: 5, step: 0.1 },
    gamma: { min: 0.8, max: 0.999, step: 0.001 },
    targetQ: { min: -5, max: 12, step: 0.1 },
    tau: { min: 0.001, max: 0.05, step: 0.001 },
  },
};

function controlsWithOverrides(algorithm, overrides = {}) {
  const settings = CONTROL_SETTINGS[algorithm.id] ?? {};
  return algorithm.controls.map((control) => ({
    ...control,
    ...(settings[control.key] ?? {}),
    value: overrides[control.key] ?? control.value,
  }));
}

function buildImitationContent(algorithm, controls) {
  const values = controlMap(controls);
  const compounding = behaviorCloningCompoundingError({
    singleStepError: values.bcError,
    horizon: values.horizon,
  });
  const gailReward = gailDiscriminatorReward({ agentProbability: values.discriminator });

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "expert data": `${values.expertSamples} pairs`,
      "BC drift": formatPercent(compounding),
      "D(agent)": formatNumber(values.discriminator),
      "GAIL reward": formatNumber(gailReward, 3),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "BC error": formatNumber(values.bcError),
      compounding: formatPercent(compounding),
      "GAIL reward": formatNumber(gailReward, 3),
    }),
    controls,
  };
}

function buildMpcContent(algorithm, controls) {
  const values = controlMap(controls);
  const eliteCount = Math.max(1, Math.round(values.sequences * values.eliteRatio));
  const updated = cemDistributionUpdate({
    mean: values.mean,
    variance: values.variance,
    eliteMean: values.eliteMean,
    eliteVariance: values.eliteVariance,
    oldWeight: 0.1,
  });

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      candidates: `${values.sequences} x ${values.horizon}`,
      "elite set": `${eliteCount} seq`,
      "CEM mean": formatNumber(updated.mean),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "elite count": `${eliteCount}`,
      "new mean": formatNumber(updated.mean),
      "new variance": formatNumber(updated.variance),
    }),
    controls,
  };
}

function buildMbpoContent(algorithm, controls) {
  const values = controlMap(controls);
  const tradeoff = mbpoRolloutTradeoff(values);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "real buffer": `${values.realSamples}`,
      "short rollout": `H=${values.horizon}`,
      "model data": `${tradeoff.syntheticSamples}`,
      error: formatPercent(tradeoff.compoundedError),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      synthetic: `${tradeoff.syntheticSamples}`,
      "model ratio": formatPercent(tradeoff.modelRatio),
      "compounded error": formatPercent(tradeoff.compoundedError),
    }),
    controls,
  };
}

function buildOfflineRlContent(algorithm, controls) {
  const values = controlMap(controls);
  const gap = Math.max(0, values.oodQ - values.dataQ);
  const penalty = values.alpha * gap;
  const target = cqlConservativeTarget(values);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "OOD Q": formatNumber(values.oodQ),
      penalty: formatNumber(penalty),
      "CQL target": formatNumber(target),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      gap: formatNumber(gap),
      penalty: formatNumber(penalty),
      "CQL target": formatNumber(target),
    }),
    controls,
  };
}

function buildGoalRlContent(algorithm, controls) {
  const values = controlMap(controls);
  const rewards = herRelabelReward(values);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "original g": values.originalDistance <= values.threshold ? "hit" : "missed",
      "achieved g'": values.relabeledDistance <= values.threshold ? "near" : "far",
      "old reward": `${rewards.originalReward}`,
      "new reward": `${rewards.relabeledReward}`,
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "original reward": `${rewards.originalReward}`,
      "relabel reward": `${rewards.relabeledReward}`,
      threshold: formatNumber(values.threshold),
    }),
    controls,
  };
}

function buildMarlIntroContent(algorithm, controls) {
  const values = controlMap(controls);
  const inputSize = centralizedCriticInputSize(values);

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      agents: `${values.agents}`,
      "non-stationary": formatPercent(values.policyDrift),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "joint size": `${inputSize}`,
      "policy drift": formatPercent(values.policyDrift),
    }),
    controls,
  };
}

function buildMaddpgContent(algorithm, controls) {
  const values = controlMap(controls);
  const inputSize = centralizedCriticInputSize(values);
  const target = values.reward + values.gamma * values.targetQ;

  return {
    nodes: replaceByLabel(algorithm.nodes, {
      "critic i": `joint ${inputSize}`,
      target: formatNumber(target),
    }),
    metrics: replaceByLabel(algorithm.metrics, {
      "critic input": `${inputSize}`,
      "TD target": formatNumber(target),
      tau: formatNumber(values.tau, 3),
    }),
    controls,
  };
}

function buildCalculatedContent(algorithm, controls) {
  if (algorithm.id === "imitation") return buildImitationContent(algorithm, controls);
  if (algorithm.id === "mpc") return buildMpcContent(algorithm, controls);
  if (algorithm.id === "mbpo") return buildMbpoContent(algorithm, controls);
  if (algorithm.id === "offline-rl") return buildOfflineRlContent(algorithm, controls);
  if (algorithm.id === "goal-rl") return buildGoalRlContent(algorithm, controls);
  if (algorithm.id === "marl-intro") return buildMarlIntroContent(algorithm, controls);
  if (algorithm.id === "maddpg") return buildMaddpgContent(algorithm, controls);
  return { nodes: algorithm.nodes, metrics: algorithm.metrics, controls };
}

export function buildFrontierFrame(algorithm, tick = 0, overrides = {}) {
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

export function buildFrontierBatchDemo(algorithm, tick = 0, overrides = {}) {
  return algorithm.steps.map((_, index) => buildFrontierFrame(algorithm, tick + index, overrides));
}
