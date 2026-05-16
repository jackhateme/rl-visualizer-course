import {
  ADVANCED_ALGORITHMS,
  buildAdvancedBatchDemo,
  buildAdvancedFrame,
  chapterDisplayName,
} from "./advanced.js";

import {
  FRONTIER_ALGORITHMS,
  buildFrontierBatchDemo,
  buildFrontierFrame,
} from "./frontier.js";

import {
  BASIC_CHAPTERS,
  buildBasicFrame,
} from "./basic.js";

import {
  ACTIONS,
  CliffWalkingEnv,
  cloneQTable,
  createQTable,
  dynaQUpdate,
  greedyAction,
  maxActionValue,
  nStepSarsaUpdate,
  qLearningUpdate,
  qTableDelta,
  selectEpsilonGreedyAction,
  sarsaUpdate,
} from "./sarsa.js";

const I18N = {
  zh: {
    documentTitle: "TD Control Policy Visualizer",
    languageName: "中文",
    appEyebrow: {
      basic: "Foundation RL / Interactive Course",
      advanced: "Advanced RL / Deep RL",
      frontier: "Frontier RL / Modern Topics",
    },
    appTitle: {
      basic: "强化学习基础篇完整教程",
      advanced: "强化学习进阶篇可视化教学",
      frontier: "强化学习前沿篇可视化教学",
    },
    labs: {
      basic: "基础篇",
      advanced: "进阶篇",
      frontier: "前沿篇",
    },
    modes: {
      teach: "教学",
      experiment: "实验",
    },
    algorithms: {
      compare: "对比",
      sarsa: "Sarsa",
      nStepSarsa: "n-step Sarsa",
      qLearning: "Q-learning",
      dynaQ: "Dyna-Q",
    },
    actions: {
      up: "上",
      right: "右",
      down: "下",
      left: "左",
    },
    stepLabels: [
      "选中当前状态 s",
      "按 epsilon-greedy 选择动作 a",
      "环境返回 r 和 s'",
      "构造 TD target / planning",
      "更新四张 Q 表",
      "刷新策略箭头",
    ],
    static: {
      labSwitchAria: "学习篇章",
      algorithmSwitchAria: "算法视图",
      modeSwitchAria: "模式",
      languageSwitchAria: "语言",
      basicTutorialAria: "基础篇完整教程",
      basicNavAria: "基础篇章节导航",
      basicStageAria: "基础概念可视化",
      basicExplainAria: "基础理论解释",
      stepsAria: "学习步骤",
      gridAria: "悬崖漫步网格",
      legendAria: "图例",
      explainAria: "当前更新解释",
      experimentAria: "实验参数",
      batchDeltaAria: "本次批量训练 Q 表变化量",
      rewardChartAria: "回报趋势",
      eventLogAria: "更新日志",
      advancedWorkspaceAria: "进阶篇可视化教学",
      advancedNavAria: "进阶算法导航",
      advancedStageAria: "算法可视化舞台",
      advancedExplainAria: "进阶算法解释",
      advancedExperimentAria: "进阶篇参数实验",
      basicRoute: "基础篇路线",
      theoryRead: "理论速读",
      keyParams: "关键参数",
      updateFlow: "更新链路",
      episode: "Episode",
      step: "Step",
      return: "Return",
      gridTitle: "悬崖漫步环境",
      legendAgent: "智能体",
      legendCliff: "悬崖",
      legendGoal: "终点",
      next: "下一步",
      autoplay: "自动播放",
      pause: "暂停",
      resetEpisode: "重置回合",
      resetAll: "清空 Q 表",
      currentQ: "当前状态 Q 值",
      experimentTitle: "参数实验",
      experimentIntro: "观察探索、学习率和折扣因子如何改变策略成形速度。",
      train: "批量训练",
      advancedMechanism: "当前机制",
      advancedNavAdvanced: "进阶篇算法",
      advancedNavFrontier: "前沿篇主题",
      advancedExperimentAdvanced: "进阶篇实验",
      advancedExperimentFrontier: "前沿篇实验",
      advancedIntroAdvanced: "切换算法，观察每个深度强化学习算法的核心更新机制。",
      advancedIntroFrontier: "切换主题，观察前沿强化学习方法如何处理数据、模型、目标和多智能体问题。",
      batchDemo: "批量演示",
      reset: "重置",
      sourceCourse: "原始课程",
      controls: "controls",
    },
    theoryLabels: {
      core: "核心理论",
      formula: "公式直觉",
      note: "学习提醒",
    },
    tuple: {
      reward: "r",
      status: "status",
      model: "model",
      planning: "planning",
      bootstrap: "bootstrap",
      compareNext: "a' / n / max / plan",
    },
    values: {
      old: "Q(s,a)",
      oldNStep: "Q(sτ,aτ)",
      maxNext: "max Q(s',a)",
      modelPlan: "model / plan",
      collected: "collected",
      bootstrapQ: "bootstrap Q",
      nextActionValue: "Q(s',a')",
      tdTarget: "TD target",
      tdError: "TD error",
      newQ: "new Q",
    },
    messages: {
      none: "—",
      waiting: "等待",
      waitingMore: "等待更多奖励",
      noQWrite: "暂不写回 Q 表",
      collectedSteps: "已收集: {steps}/{n} 步",
      terminalFlush: "终局补写 {count} 个旧状态",
      noPlanningSample: "暂无抽样",
      batchDeltaEmpty: "批量训练后会显示本次 Sarsa、n-step Sarsa、Q-learning 和 Dyna-Q 的 Q 表总变化量。",
      rewardChartEmpty: "训练后这里会显示 Sarsa、n-step Sarsa、Q-learning 与 Dyna-Q 的每回合回报。",
      eventLogEmpty: "更新日志会显示最近的 TD 变化。",
      trainedBatch: "训练 {episodes} 回合，S={sarsa}, N={nStepSarsa}, Q={qLearning}, D={dynaQ}，ΔD={delta}，model={modelSize}",
      batchSummary: "已批量训练 {episodes} 回合：Sarsa {sarsa}，n-step {nStepSarsa}，Q-learning {qLearning}，Dyna-Q {dynaQ}。Dyna 模型已记住 {modelSize} 条转移。",
      phase0: "当前在 s={state}，准备观察 {algorithm} 策略。",
      phase1: "epsilon-greedy 选出 a={action}。",
      phase2Pending: "执行后得到 r={reward}，s'={nextState}。",
      phase2Empty: "环境即将返回奖励和下一个状态。",
      phase3Empty: "下一步会构造 TD target。",
      phase4Empty: "下一步会把 TD error 写回 Q 表。",
      phase5: "贪心策略箭头已按新的 Q 表刷新。",
      compareSuffix: "Sarsa 用实际 a'，n-step 等够 n 步后回头更新，Q-learning 用 max_a，Dyna-Q 还会用模型 planning。",
      dynaSuffix: "Dyna-Q 先做真实 Q-learning 更新，再从模型里 planning {planningSteps} 次。",
      qLearningSuffix: "Q-learning 的 target 看 max_a Q(s',a)。",
      nStepSuffix: "n-step Sarsa 先收集 {nSteps} 步奖励，再回头更新 sτ,aτ。",
      sarsaSuffix: "Sarsa 的 target 看实际 a'。",
      phase3Pending: "{suffix} Sarsa a'={sarsaAction}，n-step {nStepStatus}，Q-learning max={qAction}，Dyna model={modelSize}。",
      nStepUpdating: "更新 {state}",
      compareUpdated: "Q 表已更新：S={sarsa}，N={nStep}，Q={qLearning}，D={dynaQ} + plan {planCount}/{planningSteps}。",
      dynaUpdated: "Dyna-Q 真实更新写回 {value}，模型大小 {modelSize}，planning {planCount}/{planningSteps}。",
      nStepCollecting: "n-step 还在收集轨迹：{steps}/{nSteps}。",
      qUpdated: "Q(s,a) 已更新为 {value}。",
      modelRemembered: "模型已记住 {count} 个动作",
    },
  },
  en: {
    documentTitle: "TD Control Policy Visualizer",
    languageName: "English",
    appEyebrow: {
      basic: "Foundation RL / Interactive Course",
      advanced: "Advanced RL / Deep RL",
      frontier: "Frontier RL / Modern Topics",
    },
    appTitle: {
      basic: "Foundation RL Interactive Course",
      advanced: "Advanced RL Visual Lab",
      frontier: "Frontier RL Visual Lab",
    },
    labs: {
      basic: "Basics",
      advanced: "Advanced",
      frontier: "Frontier",
    },
    modes: {
      teach: "Teach",
      experiment: "Lab",
    },
    algorithms: {
      compare: "Compare",
      sarsa: "Sarsa",
      nStepSarsa: "n-step Sarsa",
      qLearning: "Q-learning",
      dynaQ: "Dyna-Q",
    },
    actions: {
      up: "Up",
      right: "Right",
      down: "Down",
      left: "Left",
    },
    stepLabels: [
      "Focus the current state s",
      "Choose action a with epsilon-greedy",
      "Receive r and s' from the environment",
      "Build the TD target / planning step",
      "Update the four Q tables",
      "Refresh greedy policy arrows",
    ],
    static: {
      labSwitchAria: "Course section",
      algorithmSwitchAria: "Algorithm view",
      modeSwitchAria: "Mode",
      languageSwitchAria: "Language",
      basicTutorialAria: "Foundation course",
      basicNavAria: "Foundation chapter navigation",
      basicStageAria: "Foundation concept visualizer",
      basicExplainAria: "Foundation theory panel",
      stepsAria: "Learning steps",
      gridAria: "Cliff walking grid",
      legendAria: "Legend",
      explainAria: "Current update explanation",
      experimentAria: "Experiment parameters",
      batchDeltaAria: "Q-table delta from batch training",
      rewardChartAria: "Return trend",
      eventLogAria: "Update log",
      advancedWorkspaceAria: "Advanced visual teaching lab",
      advancedNavAria: "Advanced algorithm navigation",
      advancedStageAria: "Algorithm visual stage",
      advancedExplainAria: "Advanced algorithm explanation",
      advancedExperimentAria: "Advanced experiment panel",
      basicRoute: "Foundation Path",
      theoryRead: "Theory Notes",
      keyParams: "Key Parameters",
      updateFlow: "Update Flow",
      episode: "Episode",
      step: "Step",
      return: "Return",
      gridTitle: "Cliff Walking Environment",
      legendAgent: "Agent",
      legendCliff: "Cliff",
      legendGoal: "Goal",
      next: "Next",
      autoplay: "Auto Play",
      pause: "Pause",
      resetEpisode: "Reset Episode",
      resetAll: "Clear Q Tables",
      currentQ: "Current State Q Values",
      experimentTitle: "Parameter Lab",
      experimentIntro: "Watch exploration, learning rate, and discounting reshape policy learning.",
      train: "Batch Train",
      advancedMechanism: "Current Mechanism",
      advancedNavAdvanced: "Advanced Algorithms",
      advancedNavFrontier: "Frontier Topics",
      advancedExperimentAdvanced: "Advanced Lab",
      advancedExperimentFrontier: "Frontier Lab",
      advancedIntroAdvanced: "Switch algorithms to inspect the core update mechanism in each deep RL method.",
      advancedIntroFrontier: "Switch topics to see how modern RL handles data, models, goals, and multi-agent settings.",
      batchDemo: "Batch Demo",
      reset: "Reset",
      sourceCourse: "Source Course",
      controls: "controls",
    },
    theoryLabels: {
      core: "Core Idea",
      formula: "Formula Intuition",
      note: "Study Note",
    },
    tuple: {
      reward: "r",
      status: "status",
      model: "model",
      planning: "planning",
      bootstrap: "bootstrap",
      compareNext: "a' / n / max / plan",
    },
    values: {
      old: "Q(s,a)",
      oldNStep: "Q(sτ,aτ)",
      maxNext: "max Q(s',a)",
      modelPlan: "model / plan",
      collected: "collected",
      bootstrapQ: "bootstrap Q",
      nextActionValue: "Q(s',a')",
      tdTarget: "TD target",
      tdError: "TD error",
      newQ: "new Q",
    },
    messages: {
      none: "—",
      waiting: "waiting",
      waitingMore: "Need more rewards",
      noQWrite: "No Q-table write yet",
      collectedSteps: "Collected: {steps}/{n} steps",
      terminalFlush: "Terminal flush: {count} older states",
      noPlanningSample: "No planning sample yet",
      batchDeltaEmpty: "After batch training, this shows total Q-table changes for Sarsa, n-step Sarsa, Q-learning, and Dyna-Q.",
      rewardChartEmpty: "After training, this chart shows per-episode returns for Sarsa, n-step Sarsa, Q-learning, and Dyna-Q.",
      eventLogEmpty: "Recent TD updates will appear here.",
      trainedBatch: "Trained {episodes} episodes: S={sarsa}, N={nStepSarsa}, Q={qLearning}, D={dynaQ}, ΔD={delta}, model={modelSize}",
      batchSummary: "Batch trained {episodes} episodes: Sarsa {sarsa}, n-step {nStepSarsa}, Q-learning {qLearning}, Dyna-Q {dynaQ}. Dyna has memorized {modelSize} transitions.",
      phase0: "At s={state}, ready to inspect the {algorithm} policy.",
      phase1: "epsilon-greedy selected a={action}.",
      phase2Pending: "After acting: r={reward}, s'={nextState}.",
      phase2Empty: "The environment will return reward and next state.",
      phase3Empty: "Next step builds the TD target.",
      phase4Empty: "Next step writes the TD error back to the Q table.",
      phase5: "Greedy policy arrows were refreshed from the new Q tables.",
      compareSuffix: "Sarsa uses the sampled a', n-step waits for n rewards, Q-learning uses max_a, and Dyna-Q adds model planning.",
      dynaSuffix: "Dyna-Q applies a real Q-learning update, then runs {planningSteps} model-planning updates.",
      qLearningSuffix: "Q-learning targets max_a Q(s',a).",
      nStepSuffix: "n-step Sarsa collects {nSteps} rewards, then updates the earlier sτ,aτ.",
      sarsaSuffix: "Sarsa targets the actual sampled a'.",
      phase3Pending: "{suffix} Sarsa a'={sarsaAction}; n-step {nStepStatus}; Q-learning max={qAction}; Dyna model={modelSize}.",
      nStepUpdating: "updating {state}",
      compareUpdated: "Q tables updated: S={sarsa}, N={nStep}, Q={qLearning}, D={dynaQ} + plan {planCount}/{planningSteps}.",
      dynaUpdated: "Dyna-Q real update wrote {value}; model size {modelSize}; planning {planCount}/{planningSteps}.",
      nStepCollecting: "n-step is still collecting trajectory data: {steps}/{nSteps}.",
      qUpdated: "Q(s,a) was updated to {value}.",
      modelRemembered: "Model remembers {count} actions here",
    },
  },
};

const CONTENT_EN = {
  basic: {
    "rl-intro": {
      chapter: "Chapter 1: Introduction to RL",
      title: "Introduction to RL: Learning from Consequences",
      intuition: "Reinforcement learning studies sequential decisions: actions change the environment, rewards evaluate them, and policies must account for future return.",
      steps: [
        "The agent observes state s",
        "The policy chooses action a",
        "The environment moves to s'",
        "The environment returns immediate reward r",
        "The goal is to maximize expected return",
      ],
      theory: {
        core: "Reinforcement learning names the learner an agent. The agent acts, the environment responds with reward and a new state, and the agent improves from that loop.",
        formula: "The full return G_t is a discounted sum of rewards. This calculator uses the one-step form r + gamma * future_value to show how future value enters today's decision.",
        note: "First hold onto the loop: state gives information, action creates consequences, reward defines the objective, and policy determines behavior.",
      },
    },
    bandit: {
      chapter: "Chapter 2: Multi-Armed Bandits",
      title: "Multi-Armed Bandits: Exploration Meets Exploitation",
      intuition: "There are no state transitions, only actions and random rewards. This isolates the classic exploration-exploitation tradeoff.",
      steps: [
        "Face several unknown arms",
        "Estimate each action's average reward",
        "Keep exploration with epsilon",
        "Usually exploit the current best arm",
        "Measure the cost with cumulative regret",
      ],
      theory: {
        core: "A bandit is a stateless simplification of RL: each round selects one action and receives a random reward.",
        formula: "The simplified regret shown here is the expected reward gap between the best and chosen arm, multiplied by pulls.",
        note: "Do not worry about state transitions yet. Focus on why always exploiting can miss the best arm, while always exploring wastes reward.",
      },
    },
    mdp: {
      chapter: "Chapter 3: Markov Decision Processes",
      title: "MDP: Writing Sequential Decisions as Math",
      intuition: "An MDP describes an environment with states, actions, transition probabilities, rewards, and discounting.",
      steps: [
        "Define state set S",
        "Define action set A",
        "Describe transitions with P(s'|s,a)",
        "Describe rewards with R(s,a)",
        "Connect now and future with Bellman equations",
      ],
      theory: {
        core: "An MDP abstracts an RL problem into states, actions, rewards, transition probabilities, and a discount factor.",
        formula: "The Bellman equation decomposes value into immediate reward plus discounted future value.",
        note: "If a problem cannot clearly state its states, actions, and rewards, the later algorithms will not land cleanly.",
      },
    },
    "dynamic-programming": {
      chapter: "Chapter 4: Dynamic Programming",
      title: "Dynamic Programming: Compute Value When the Model Is Known",
      intuition: "When transitions and rewards are known, Bellman backups can repeatedly update values and improve policies.",
      steps: [
        "Assume the full MDP model is known",
        "Evaluate the current policy V^pi",
        "Improve the policy using value estimates",
        "Alternate evaluation and improvement",
        "Approximate optimal value directly with value iteration",
      ],
      theory: {
        core: "Dynamic programming applies to finite MDPs with a known environment model.",
        formula: "A full DP backup enumerates actions and possible next states, weighting each branch by transition probability.",
        note: "DP is the white-box ancestor of many later algorithms. Sampling methods reduce dependence on a complete model.",
      },
    },
    td: {
      chapter: "Chapter 5: Temporal-Difference Learning",
      title: "Temporal Difference: Sample and Bootstrap",
      intuition: "TD updates before the episode ends by combining one real reward with an estimate of the next state or action.",
      steps: [
        "Sample a real transition",
        "Observe r and s'",
        "Bootstrap future value from the current estimate",
        "Update Q(s,a)",
        "Inspect Sarsa and Q-learning in the grid below",
      ],
      theory: {
        core: "TD learning combines sampling and bootstrapping: it learns from real interaction while using current value estimates.",
        formula: "Sarsa bootstraps from the actual next action Q(s',a'), while Q-learning bootstraps from max_a Q(s',a).",
        note: "The cliff walking animation below is the practice area. Watch how the bootstrap choice changes learned behavior.",
      },
    },
    "dyna-q": {
      chapter: "Chapter 6: Dyna-Q",
      title: "Dyna-Q: Replay Real Experience Through a Model",
      intuition: "Dyna-Q performs a real Q-learning update, stores the transition in a model, then reuses that model for planning updates.",
      steps: [
        "A real environment step produces a transition",
        "Apply one real Q-learning update",
        "Store the transition in the model",
        "Sample old experience from the model",
        "Watch planning updates in the grid below",
      ],
      theory: {
        core: "Dyna-Q combines model-free Q-learning with model learning: real experience both updates Q and becomes reusable planning data.",
        formula: "After every real transition, the algorithm does one real update and N model-sampled planning updates.",
        note: "Dyna-Q does not imagine from nothing; it reuses transitions it has already seen.",
      },
    },
  },
  advanced: {
    dqn: {
      chapter: "Chapter 7: DQN",
      title: "DQN: Approximate Q Tables with a Neural Network",
      intuition: "For continuous or large state spaces, DQN maps a state vector to action values with a neural network.",
      steps: ["Observe the CartPole state vector", "Output values for left and right actions", "Sample actions with epsilon-greedy", "Sample mini-batches from replay", "Build TD targets with the target network", "Update online Q and sync the target network"],
      theory: { core: "DQN replaces table lookup with function approximation.", formula: "The target network and replay buffer stabilize bootstrapped TD learning.", note: "Replay breaks correlation between adjacent samples and the target network slows moving targets." },
    },
    "dqn-upgrades": {
      chapter: "Chapter 8: DQN Improvements",
      title: "DQN Improvements: Reduce Overestimation and Use Samples Better",
      intuition: "Double DQN separates action selection and evaluation; Dueling DQN separates state value and advantage; prioritized replay samples high-error transitions more often.",
      steps: ["Plain DQN can overestimate max Q", "Double DQN chooses actions with the online network", "The target network only evaluates", "Dueling splits V(s) and A(s,a)", "Rank replay samples by TD error", "Sample high-error experience more often"],
      theory: { core: "These upgrades target instability and sample efficiency in DQN.", formula: "Double DQN uses Q_target(s', argmax_a Q_online(s',a)).", note: "Each improvement changes a different failure mode: overestimation, representation, or sampling." },
    },
    "policy-gradient": {
      chapter: "Chapter 9: Policy Gradient",
      title: "Policy Gradient: Make Good Actions More Likely",
      intuition: "Instead of learning a Q table first, policy gradients directly adjust action probabilities using trajectory returns.",
      steps: ["The policy network outputs an action distribution", "Sample an action from the distribution", "Collect a trajectory", "Compute discounted returns", "Weight log probability by return", "Increase probability of high-return actions"],
      theory: { core: "Policy gradient methods optimize the policy directly.", formula: "The update pushes log pi(a|s) in proportion to return or advantage.", note: "Baselines reduce variance without changing the expected gradient." },
    },
    "actor-critic": {
      chapter: "Chapter 10: Actor-Critic",
      title: "Actor-Critic: One Chooses, One Evaluates",
      intuition: "The actor owns the policy, while the critic provides a lower-variance TD-error learning signal.",
      steps: ["Actor outputs action probabilities", "Act and observe r and s'", "Critic estimates V(s) and V(s')", "Compute TD error", "Move critic toward the TD target", "Use TD error to update the actor"],
      theory: { core: "Actor-Critic combines policy learning with value estimation.", formula: "delta = r + gamma V(s') - V(s) drives both critic and actor updates.", note: "The critic turns long-horizon returns into a denser training signal." },
    },
    trpo: {
      chapter: "Chapter 11: TRPO",
      title: "TRPO: Do Not Move the Policy Too Far",
      intuition: "TRPO constrains the KL distance between old and new policies to avoid destructive updates.",
      steps: ["Record the old policy distribution", "Propose a higher-return policy", "Compute KL between policies", "Compare with max KL", "Shrink the step if needed", "Accept only trust-region updates"],
      theory: { core: "TRPO frames policy improvement as constrained optimization.", formula: "Maximize a surrogate objective subject to KL(pi_old, pi_new) <= delta.", note: "The trust region keeps improvement steps conservative." },
    },
    ppo: {
      chapter: "Chapter 12: PPO",
      title: "PPO: Approximate a Trust Region with Clipping",
      intuition: "PPO avoids solving a hard constraint by clipping the probability ratio into a safe interval.",
      steps: ["Store old policy probabilities", "Compute new policy probabilities", "Get the probability ratio", "Multiply by advantage", "Clip ratio to 1 plus/minus epsilon", "Take the conservative objective"],
      theory: { core: "PPO is a practical policy optimization method with a simple clipped surrogate.", formula: "L = min(ratio * A, clip(ratio, 1-eps, 1+eps) * A).", note: "Clipping discourages updates that change action probabilities too aggressively." },
    },
    ddpg: {
      chapter: "Chapter 13: DDPG",
      title: "DDPG: Deterministic Actor-Critic for Continuous Actions",
      intuition: "The actor outputs a continuous action; the critic scores it and guides the actor toward higher Q.",
      steps: ["Actor outputs a continuous action", "Add exploration noise", "Environment returns a transition", "Store experience in replay", "Critic learns a Q target", "Actor moves toward higher-Q actions"],
      theory: { core: "DDPG extends actor-critic ideas to deterministic continuous control.", formula: "The target is r + gamma Q_target(s', mu_target(s')).", note: "Target networks and replay are critical for stability." },
    },
    sac: {
      chapter: "Chapter 14: SAC",
      title: "SAC: Maximum-Entropy Reinforcement Learning",
      intuition: "SAC optimizes both return and policy entropy, making exploration part of the objective.",
      steps: ["Sample a continuous action from a stochastic policy", "Estimate Q with two critics", "Use the smaller Q to reduce overestimation", "Add entropy bonus", "Update the soft Q target", "Tune alpha to balance exploration"],
      theory: { core: "SAC rewards useful randomness through the maximum-entropy objective.", formula: "The soft target adds alpha * H(pi) to the next-state value.", note: "Entropy helps prevent premature collapse to brittle deterministic behavior." },
    },
  },
  frontier: {
    imitation: {
      chapter: "Chapter 15: Imitation Learning",
      title: "Imitation Learning: From Expert Trajectories to Occupancy Matching",
      intuition: "Behavior cloning treats expert actions as labels, while GAIL matches expert and agent state-action distributions.",
      steps: ["Collect expert state-action pairs", "Fit expert actions with behavior cloning", "Observe compounding error from distribution shift", "Train a discriminator", "Convert discriminator output to reward", "Optimize the policy toward expert occupancy"],
      theory: { core: "Imitation learning replaces hand-designed rewards with expert demonstrations.", formula: "BC errors compound over horizon; GAIL uses discriminator reward such as -log D(agent).", note: "BC is simple but fragile under distribution shift; GAIL is interactive but harder to train." },
    },
    mpc: {
      chapter: "Chapter 16: Model Predictive Control",
      title: "MPC: Plan, Act, Replan",
      intuition: "MPC evaluates candidate action sequences with a model and executes only the first action of the best sequence.",
      steps: ["Generate candidate action sequences", "Predict returns with a model", "Choose the current best sequence", "Keep elite sequences with CEM", "Update mean and variance", "Use ensembles to express uncertainty"],
      theory: { core: "MPC is online planning with a learned or known model.", formula: "CEM iteratively updates the action-sequence distribution toward elite samples.", note: "Replanning every step helps correct model error." },
    },
    mbpo: {
      chapter: "Chapter 17: Model-Based Policy Optimization",
      title: "MBPO: Grow Short Model Branches from Real Data",
      intuition: "MBPO uses short model rollouts from real states to improve sample efficiency without letting model error dominate.",
      steps: ["Train a dynamics model from real data", "Sample starts from the real replay buffer", "Roll out short model branches", "Add model trajectories to a model buffer", "Update SAC from real and model data", "Balance model error and sample efficiency"],
      theory: { core: "MBPO augments real samples with short synthetic rollouts.", formula: "Longer horizons increase model data but compound model error.", note: "Short rollouts are the compromise between efficiency and bias." },
    },
    "offline-rl": {
      chapter: "Chapter 18: Offline RL",
      title: "Offline RL: Do Not Trust Out-of-Dataset High Q",
      intuition: "Offline RL learns from a fixed dataset, so it must suppress extrapolation errors on unseen actions.",
      steps: ["Train only from a fixed dataset", "Notice policies may choose unseen actions", "OOD actions can get overestimated Q", "BCQ keeps actions near the data", "CQL penalizes high OOD Q", "Obtain a conservative but reliable policy"],
      theory: { core: "Offline RL cannot keep trying actions in the environment.", formula: "CQL subtracts a conservative penalty when OOD Q exceeds in-data Q.", note: "Conservatism trades peak performance for safer evaluation under fixed data." },
    },
    "goal-rl": {
      chapter: "Chapter 19: Goal-Conditioned RL",
      title: "Goal-Oriented RL: Learn from Failure by Relabeling Goals",
      intuition: "HER relabels failed sparse-reward trajectories with goals the agent actually achieved.",
      steps: ["Condition the policy on goal g", "Sparse rewards make failures all -1", "Record achieved states", "Relabel achieved state as a new goal", "Recompute goal-conditioned rewards", "Put relabeled transitions into replay"],
      theory: { core: "Goal-conditioned RL learns policies that depend on the desired goal.", formula: "HER recomputes rewards after replacing the intended goal with an achieved goal.", note: "A failed trajectory for one goal can become useful data for another." },
    },
    "marl-intro": {
      chapter: "Chapter 20: Intro to Multi-Agent RL",
      title: "Multi-Agent Basics: Independent Learners in a Nonstationary World",
      intuition: "IPPO trains each agent as an independent PPO learner, optionally sharing parameters across homogeneous agents.",
      steps: ["Multiple agents interact together", "Each agent collects trajectories", "Other agents' updates create nonstationarity", "Apply PPO independently", "Share parameters for homogeneous agents", "Track win rate rather than single returns"],
      theory: { core: "In multi-agent RL, every learner changes the environment seen by the others.", formula: "A centralized critic input often scales with all agents' observations and actions.", note: "Independent learning is simple but must tolerate nonstationarity." },
    },
    maddpg: {
      chapter: "Chapter 21: Advanced Multi-Agent RL",
      title: "MADDPG: Centralized Critic, Decentralized Actors",
      intuition: "During training, the critic can see all observations and actions; during execution, each actor uses only its local observation.",
      steps: ["Each agent owns an actor", "Replay stores joint transitions", "Central critic sees all observations and actions", "Build TD targets with target networks", "Update each actor with its policy gradient", "Execute with decentralized actors only"],
      theory: { core: "MADDPG uses centralized training with decentralized execution.", formula: "The critic target includes joint next actions from all target actors.", note: "The critic can resolve training-time coordination information that actors cannot use at execution." },
    },
  },
};

const ARROWS = {
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
};

function template(value, vars = {}) {
  return String(value).replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

function dictionary() {
  return I18N[state?.language] ?? I18N.zh;
}

function getPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

function t(path, vars = {}) {
  const value = getPath(dictionary(), path) ?? getPath(I18N.zh, path) ?? path;
  return template(value, vars);
}

function initialLanguage() {
  const queryLanguage = new URLSearchParams(window.location.search).get("lang");
  if (queryLanguage === "en" || queryLanguage === "zh") return queryLanguage;

  try {
    const storedLanguage = window.localStorage.getItem("rl-visualizer-language");
    if (storedLanguage === "en" || storedLanguage === "zh") return storedLanguage;
  } catch {
    // Ignore unavailable storage, such as strict privacy contexts.
  }

  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "zh";
}

const env = new CliffWalkingEnv();

const els = {
  appEyebrow: document.querySelector(".topbar .eyebrow"),
  appTitle: document.querySelector(".topbar h1"),
  basicLabButton: document.querySelector("#basicLabButton"),
  advancedLabButton: document.querySelector("#advancedLabButton"),
  frontierLabButton: document.querySelector("#frontierLabButton"),
  zhLangButton: document.querySelector("#zhLangButton"),
  enLangButton: document.querySelector("#enLangButton"),
  labSwitch: document.querySelector(".lab-switch"),
  algorithmSwitch: document.querySelector(".algorithm-switch"),
  modeSwitch: document.querySelector(".mode-switch"),
  languageSwitch: document.querySelector(".language-switch"),
  basicNavTitle: document.querySelector("#basicNavTitle"),
  basicTutorial: document.querySelector("#basicTutorial"),
  basicNavPanel: document.querySelector(".basic-nav-panel"),
  basicStagePanel: document.querySelector(".basic-stage-panel"),
  basicExplainPanel: document.querySelector(".basic-explain-panel"),
  basicChapterNav: document.querySelector("#basicChapterNav"),
  basicChapter: document.querySelector("#basicChapter"),
  basicTitle: document.querySelector("#basicTitle"),
  basicIntuition: document.querySelector("#basicIntuition"),
  basicProgressLabel: document.querySelector("#basicProgressLabel"),
  basicProgressBar: document.querySelector("#basicProgressBar"),
  basicStage: document.querySelector("#basicStage"),
  basicFormula: document.querySelector("#basicFormula"),
  basicMetrics: document.querySelector("#basicMetrics"),
  basicTheoryTitle: document.querySelector("#basicTheoryTitle"),
  basicControlsTitle: document.querySelector("#basicControlsTitle"),
  basicControlLabel: document.querySelector("#basicControlLabel"),
  basicControls: document.querySelector("#basicControls"),
  basicTheory: document.querySelector("#basicTheory"),
  basicNextButton: document.querySelector("#basicNextButton"),
  basicWorkspace: document.querySelector("#basicWorkspace"),
  advancedWorkspace: document.querySelector("#advancedWorkspace"),
  advancedNavTitle: document.querySelector("#advancedNavTitle"),
  stepsPanel: document.querySelector(".steps-panel"),
  stepsTitle: document.querySelector("#stepsTitle"),
  episodeMetricLabel: document.querySelector("#episodeMetricLabel"),
  stepMetricLabel: document.querySelector("#stepMetricLabel"),
  returnMetricLabel: document.querySelector("#returnMetricLabel"),
  gridPanel: document.querySelector(".grid-panel"),
  gridTitle: document.querySelector("#gridTitle"),
  legend: document.querySelector(".legend"),
  legendAgentLabel: document.querySelector("#legendAgentLabel"),
  legendCliffLabel: document.querySelector("#legendCliffLabel"),
  legendGoalLabel: document.querySelector("#legendGoalLabel"),
  grid: document.querySelector("#cliffGrid"),
  stepList: document.querySelector("#stepList"),
  explainPanel: document.querySelector(".explain-panel"),
  tupleView: document.querySelector("#tupleView"),
  formulaText: document.querySelector("#formulaText"),
  formulaValues: document.querySelector("#formulaValues"),
  qBars: document.querySelector("#qBars"),
  qInspectorTitle: document.querySelector("#qInspectorTitle"),
  stateLabel: document.querySelector("#stateLabel"),
  updateTitle: document.querySelector("#updateTitle"),
  phaseMessage: document.querySelector("#phaseMessage"),
  episodeCount: document.querySelector("#episodeCount"),
  stepCount: document.querySelector("#stepCount"),
  returnValue: document.querySelector("#returnValue"),
  nextButton: document.querySelector("#nextButton"),
  autoButton: document.querySelector("#autoButton"),
  resetEpisodeButton: document.querySelector("#resetEpisodeButton"),
  resetAllButton: document.querySelector("#resetAllButton"),
  compareViewButton: document.querySelector("#compareViewButton"),
  sarsaViewButton: document.querySelector("#sarsaViewButton"),
  nStepSarsaViewButton: document.querySelector("#nStepSarsaViewButton"),
  qLearningViewButton: document.querySelector("#qLearningViewButton"),
  dynaQViewButton: document.querySelector("#dynaQViewButton"),
  teachModeButton: document.querySelector("#teachModeButton"),
  experimentModeButton: document.querySelector("#experimentModeButton"),
  experimentPanel: document.querySelector("#experimentPanel"),
  experimentTitle: document.querySelector("#experimentTitle"),
  experimentIntro: document.querySelector("#experimentIntro"),
  trainButton: document.querySelector("#trainButton"),
  batchDelta: document.querySelector("#batchDelta"),
  rewardChart: document.querySelector("#rewardChart"),
  eventLog: document.querySelector("#eventLog"),
  advancedNavPanel: document.querySelector(".advanced-nav-panel"),
  advancedNav: document.querySelector("#advancedNav"),
  advancedStagePanel: document.querySelector(".advanced-stage-panel"),
  advancedStepList: document.querySelector("#advancedStepList"),
  advancedChapter: document.querySelector("#advancedChapter"),
  advancedTitle: document.querySelector("#advancedTitle"),
  advancedIntuition: document.querySelector("#advancedIntuition"),
  advancedProgressLabel: document.querySelector("#advancedProgressLabel"),
  advancedProgressBar: document.querySelector("#advancedProgressBar"),
  advancedStage: document.querySelector("#advancedStage"),
  advancedFormula: document.querySelector("#advancedFormula"),
  advancedMetrics: document.querySelector("#advancedMetrics"),
  advancedExplainPanel: document.querySelector(".advanced-explain-panel"),
  advancedMechanismTitle: document.querySelector("#advancedMechanismTitle"),
  advancedControlsTitle: document.querySelector("#advancedControlsTitle"),
  advancedControlLabel: document.querySelector("#advancedControlLabel"),
  advancedControls: document.querySelector("#advancedControls"),
  advancedTheoryTitle: document.querySelector("#advancedTheoryTitle"),
  advancedTheory: document.querySelector("#advancedTheory"),
  advancedNextButton: document.querySelector("#advancedNextButton"),
  advancedAutoButton: document.querySelector("#advancedAutoButton"),
  advancedResetButton: document.querySelector("#advancedResetButton"),
  advancedExperimentPanel: document.querySelector("#advancedExperimentPanel"),
  advancedExperimentTitle: document.querySelector("#advancedExperimentTitle"),
  advancedExperimentIntro: document.querySelector("#advancedExperimentIntro"),
  advancedTrainButton: document.querySelector("#advancedTrainButton"),
  advancedTimeline: document.querySelector("#advancedTimeline"),
  epsilonInput: document.querySelector("#epsilonInput"),
  alphaInput: document.querySelector("#alphaInput"),
  gammaInput: document.querySelector("#gammaInput"),
  nStepsInput: document.querySelector("#nStepsInput"),
  planningStepsInput: document.querySelector("#planningStepsInput"),
  episodesInput: document.querySelector("#episodesInput"),
  speedInput: document.querySelector("#speedInput"),
  epsilonValue: document.querySelector("#epsilonValue"),
  alphaValue: document.querySelector("#alphaValue"),
  gammaValue: document.querySelector("#gammaValue"),
  nStepsValue: document.querySelector("#nStepsValue"),
  planningStepsValue: document.querySelector("#planningStepsValue"),
  episodesValue: document.querySelector("#episodesValue"),
  speedValue: document.querySelector("#speedValue"),
};

const state = {
  language: initialLanguage(),
  currentLab: "basic",
  sarsaQ: createQTable(env.rows, env.cols, ACTIONS),
  nStepSarsaQ: createQTable(env.rows, env.cols, ACTIONS),
  qLearningQ: createQTable(env.rows, env.cols, ACTIONS),
  dynaQ: createQTable(env.rows, env.cols, ACTIONS),
  dynaModel: new Map(),
  nStepBuffer: [],
  algorithmView: "compare",
  mode: "teach",
  phase: 0,
  episode: 1,
  step: 0,
  totalReward: 0,
  currentState: { ...env.startState },
  currentAction: null,
  pending: null,
  lastUpdate: null,
  visited: new Set(),
  returns: [],
  log: [],
  lastBatchSummary: null,
  playing: false,
  timer: null,
  basicChapterId: "rl-intro",
  basicTick: 0,
  basicOverrides: {},
  advancedAlgorithmId: "dqn",
  frontierAlgorithmId: "imitation",
  advancedTick: 0,
  advancedOverrides: {},
  advancedBatchFrames: [],
  advancedPlaying: false,
  advancedTimer: null,
};

function params() {
  return {
    epsilon: Number(els.epsilonInput.value),
    alpha: Number(els.alphaInput.value),
    gamma: Number(els.gammaInput.value),
    nSteps: Number(els.nStepsInput.value),
    planningSteps: Number(els.planningStepsInput.value),
    episodes: Number(els.episodesInput.value),
    speed: Number(els.speedInput.value),
  };
}

function formatState(point) {
  if (!point) return "—";
  return `(${point.row}, ${point.col})`;
}

function formatDelta(value) {
  if (value > 0 && value < 0.001) {
    return value.toFixed(6);
  }
  return value.toFixed(3);
}

function actionLabel(action) {
  if (!action) return t("messages.none");
  return `${t(`actions.${action}`)} ${ARROWS[action]}`;
}

function sameState(a, b) {
  return Boolean(a && b && a.row === b.row && a.col === b.col);
}

function qTableFor(algorithm) {
  if (algorithm === "dynaQ") return state.dynaQ;
  if (algorithm === "qLearning") return state.qLearningQ;
  if (algorithm === "nStepSarsa") return state.nStepSarsaQ;
  return state.sarsaQ;
}

function activeAlgorithm() {
  if (state.algorithmView === "dynaQ") return "dynaQ";
  if (state.algorithmView === "qLearning") return "qLearning";
  if (state.algorithmView === "nStepSarsa") return "nStepSarsa";
  return "sarsa";
}

function algorithmLabel(algorithm = state.algorithmView) {
  return t(`algorithms.${algorithm}`);
}

function behaviorAlgorithm() {
  return activeAlgorithm();
}

function activeBasicChapter() {
  return BASIC_CHAPTERS.find((chapter) => chapter.id === state.basicChapterId) ?? BASIC_CHAPTERS[0];
}

function activeBasicOverrides() {
  return state.basicOverrides[state.basicChapterId] ?? {};
}

function getValues(point, algorithm = activeAlgorithm()) {
  const q = qTableFor(algorithm);
  return q[point.row][point.col];
}

function chooseCurrentAction() {
  state.currentAction = selectEpsilonGreedyAction(getValues(state.currentState, behaviorAlgorithm()), ACTIONS, {
    epsilon: params().epsilon,
  });
}

function previewSarsaUpdate(transition) {
  const oldValue = getValues(state.currentState, "sarsa")[state.currentAction];
  const nextAction = transition.done
    ? null
    : selectEpsilonGreedyAction(getValues(transition.nextState, "sarsa"), ACTIONS, {
        epsilon: params().epsilon,
      });
  const nextValue = transition.done ? 0 : getValues(transition.nextState, "sarsa")[nextAction];
  const tdTarget = transition.reward + params().gamma * nextValue;
  const tdError = tdTarget - oldValue;

  return {
    nextAction,
    oldValue,
    nextValue,
    tdTarget,
    tdError,
    newValue: oldValue + params().alpha * tdError,
  };
}

function previewQLearningUpdate(transition) {
  const oldValue = getValues(state.currentState, "qLearning")[state.currentAction];
  const bestNext = transition.done
    ? { action: null, value: 0 }
    : maxActionValue(getValues(transition.nextState, "qLearning"), ACTIONS);
  const tdTarget = transition.reward + params().gamma * bestNext.value;
  const tdError = tdTarget - oldValue;

  return {
    bestNextAction: bestNext.action,
    oldValue,
    nextValue: bestNext.value,
    tdTarget,
    tdError,
    newValue: oldValue + params().alpha * tdError,
  };
}

function previewDynaQUpdate(transition) {
  const oldValue = getValues(state.currentState, "dynaQ")[state.currentAction];
  const bestNext = transition.done
    ? { action: null, value: 0 }
    : maxActionValue(getValues(transition.nextState, "dynaQ"), ACTIONS);
  const tdTarget = transition.reward + params().gamma * bestNext.value;
  const tdError = tdTarget - oldValue;
  const key = `${state.currentState.row},${state.currentState.col}:${state.currentAction}`;
  const modelSize = state.dynaModel.has(key) ? state.dynaModel.size : state.dynaModel.size + 1;

  return {
    bestNextAction: bestNext.action,
    oldValue,
    nextValue: bestNext.value,
    tdTarget,
    tdError,
    newValue: oldValue + params().alpha * tdError,
    modelSize,
    planningSteps: params().planningSteps,
    planningUpdates: [],
  };
}

function createNStepEntry(transition, nextAction) {
  return {
    state: { ...state.currentState },
    action: state.currentAction,
    reward: transition.reward,
    nextState: { ...transition.nextState },
    nextAction,
    done: transition.done,
  };
}

function describeNStepUpdate(buffer) {
  const first = buffer[0];
  const horizon = Math.min(params().nSteps, buffer.length);
  const steps = buffer.slice(0, horizon);
  const last = steps.at(-1);
  const rewards = steps.map((entry) => entry.reward);
  const oldValue = getValues(first.state, "nStepSarsa")[first.action];
  const nextValue = last.done || !last.nextAction
    ? 0
    : getValues(last.nextState, "nStepSarsa")[last.nextAction];
  const discountedRewards = rewards.reduce(
    (total, reward, index) => total + (params().gamma ** index) * reward,
    0,
  );
  const tdTarget = discountedRewards
    + (last.done ? 0 : (params().gamma ** rewards.length) * nextValue);
  const tdError = tdTarget - oldValue;

  return {
    state: { ...first.state },
    action: first.action,
    rewards,
    steps: rewards.length,
    bootstrapAction: last.done ? null : last.nextAction,
    oldValue,
    nextValue,
    tdTarget,
    tdError,
    newValue: oldValue + params().alpha * tdError,
    waiting: false,
  };
}

function previewNStepSarsaUpdate(entry) {
  const previewBuffer = [...state.nStepBuffer, entry];
  if (previewBuffer.length < params().nSteps && !entry.done) {
    const first = previewBuffer[0];
    const oldValue = getValues(first.state, "nStepSarsa")[first.action];
    return {
      state: { ...first.state },
      action: first.action,
      rewards: previewBuffer.map((item) => item.reward),
      steps: previewBuffer.length,
      bootstrapAction: null,
      oldValue,
      nextValue: 0,
      tdTarget: oldValue,
      tdError: 0,
      newValue: oldValue,
      waiting: true,
    };
  }

  return describeNStepUpdate(previewBuffer);
}

function applyNStepBufferHead(buffer, q = state.nStepSarsaQ) {
  const first = buffer[0];
  const horizon = Math.min(params().nSteps, buffer.length);
  const steps = buffer.slice(0, horizon);
  const last = steps.at(-1);
  const update = nStepSarsaUpdate(q, {
    state: first.state,
    action: first.action,
    rewards: steps.map((entry) => entry.reward),
    bootstrapState: last.nextState,
    bootstrapAction: last.nextAction,
    alpha: params().alpha,
    gamma: params().gamma,
    done: last.done,
  });

  return {
    ...update,
    state: { ...first.state },
    action: first.action,
    steps: steps.length,
    bootstrapAction: last.done ? null : last.nextAction,
    waiting: false,
  };
}

function applyNStepEntry(entry) {
  const updates = [];
  state.nStepBuffer.push(entry);

  while (
    state.nStepBuffer.length > 0
    && (state.nStepBuffer.length >= params().nSteps || state.nStepBuffer.at(-1).done)
  ) {
    updates.push(applyNStepBufferHead(state.nStepBuffer));
    state.nStepBuffer.shift();
  }

  return updates;
}

function preparePendingTransition() {
  const transition = env.step(state.currentState, state.currentAction);
  const sarsaPreview = previewSarsaUpdate(transition);
  const qLearningPreview = previewQLearningUpdate(transition);
  const dynaQPreview = previewDynaQUpdate(transition);
  const qLearningNextAction = transition.done
    ? null
    : selectEpsilonGreedyAction(getValues(transition.nextState, "qLearning"), ACTIONS, {
        epsilon: params().epsilon,
      });
  const dynaQNextAction = transition.done
    ? null
    : selectEpsilonGreedyAction(getValues(transition.nextState, "dynaQ"), ACTIONS, {
        epsilon: params().epsilon,
      });
  const nStepNextAction = transition.done
    ? null
    : selectEpsilonGreedyAction(getValues(transition.nextState, "nStepSarsa"), ACTIONS, {
        epsilon: params().epsilon,
      });
  const nStepEntry = createNStepEntry(transition, nStepNextAction);
  const nStepPreview = previewNStepSarsaUpdate(nStepEntry);
  const behaviorNextActions = {
    sarsa: sarsaPreview.nextAction,
    nStepSarsa: nStepNextAction,
    qLearning: qLearningNextAction,
    dynaQ: dynaQNextAction,
  };

  state.pending = {
    state: { ...state.currentState },
    action: state.currentAction,
    nextState: { ...transition.nextState },
    nextAction: sarsaPreview.nextAction,
    nStepEntry,
    behaviorNextAction: behaviorNextActions[behaviorAlgorithm()],
    reward: transition.reward,
    done: transition.done,
    fell: transition.fell,
    sarsa: sarsaPreview,
    nStepSarsa: nStepPreview,
    qLearning: qLearningPreview,
    dynaQ: dynaQPreview,
  };
}

function applyPendingUpdate() {
  if (!state.pending) return;

  const sarsa = sarsaUpdate(state.sarsaQ, {
    state: state.pending.state,
    action: state.pending.action,
    reward: state.pending.reward,
    nextState: state.pending.nextState,
    nextAction: state.pending.nextAction,
    alpha: params().alpha,
    gamma: params().gamma,
    done: state.pending.done,
  });
  const qLearning = qLearningUpdate(state.qLearningQ, {
    state: state.pending.state,
    action: state.pending.action,
    reward: state.pending.reward,
    nextState: state.pending.nextState,
    alpha: params().alpha,
    gamma: params().gamma,
    done: state.pending.done,
  });
  const dynaQ = dynaQUpdate(state.dynaQ, state.dynaModel, {
    state: state.pending.state,
    action: state.pending.action,
    reward: state.pending.reward,
    nextState: state.pending.nextState,
    alpha: params().alpha,
    gamma: params().gamma,
    done: state.pending.done,
    planningSteps: params().planningSteps,
  });
  const nStepUpdates = applyNStepEntry(state.pending.nStepEntry);
  const nStepSarsa = nStepUpdates[0] ?? {
    ...state.pending.nStepSarsa,
    waiting: true,
  };

  state.lastUpdate = {
    ...state.pending,
    sarsa: {
      ...state.pending.sarsa,
      ...sarsa,
    },
    nStepSarsa: {
      ...state.pending.nStepSarsa,
      ...nStepSarsa,
      flushedCount: nStepUpdates.length,
    },
    qLearning: {
      ...state.pending.qLearning,
      ...qLearning,
    },
    dynaQ: {
      ...state.pending.dynaQ,
      ...dynaQ.realUpdate,
      modelEntry: dynaQ.modelEntry,
      modelSize: dynaQ.modelSize,
      planningSteps: params().planningSteps,
      planningUpdates: dynaQ.planningUpdates,
      lastPlanningUpdate: dynaQ.planningUpdates.at(-1) ?? null,
    },
  };
  state.step += 1;
  state.totalReward += state.pending.reward;
  state.visited.add(`${state.pending.nextState.row},${state.pending.nextState.col}`);
  state.log.unshift({
    episode: state.episode,
    step: state.step,
    message: `${actionLabel(state.pending.action)} r=${state.pending.reward}, S=${sarsa.newValue.toFixed(3)}, N=${nStepSarsa.waiting ? `${t("messages.waiting")} ${nStepSarsa.steps}/${params().nSteps}` : nStepSarsa.newValue.toFixed(3)}, Q=${qLearning.newValue.toFixed(3)}, D=${dynaQ.realUpdate.newValue.toFixed(3)} + plan ${dynaQ.planningUpdates.length}/${params().planningSteps}`,
  });
  state.log = state.log.slice(0, 9);
}

function advanceAfterPolicyRefresh() {
  if (!state.lastUpdate) return;

  if (state.lastUpdate.done) {
    state.returns.push(state.totalReward);
    state.episode += 1;
    resetEpisodeState(false);
    return;
  }

  state.currentState = { ...state.lastUpdate.nextState };
  state.currentAction = state.lastUpdate.behaviorNextAction;
  state.pending = null;
  state.lastUpdate = null;
  state.phase = 0;
}

function advanceStep() {
  if (!state.currentAction) {
    chooseCurrentAction();
  }

  if (state.phase === 0) {
    state.phase = 1;
  } else if (state.phase === 1) {
    preparePendingTransition();
    state.phase = 2;
  } else if (state.phase === 2) {
    state.phase = 3;
  } else if (state.phase === 3) {
    applyPendingUpdate();
    state.phase = 4;
  } else if (state.phase === 4) {
    state.phase = 5;
  } else {
    advanceAfterPolicyRefresh();
  }

  render();
}

function resetEpisodeState(clearLog = true) {
  state.phase = 0;
  state.step = 0;
  state.totalReward = 0;
  state.currentState = { ...env.startState };
  state.pending = null;
  state.lastUpdate = null;
  state.nStepBuffer = [];
  state.visited = new Set([`${env.startState.row},${env.startState.col}`]);
  chooseCurrentAction();
  if (clearLog) {
    state.log = [];
  }
}

function resetAll() {
  stopAutoPlay();
  state.sarsaQ = createQTable(env.rows, env.cols, ACTIONS);
  state.nStepSarsaQ = createQTable(env.rows, env.cols, ACTIONS);
  state.qLearningQ = createQTable(env.rows, env.cols, ACTIONS);
  state.dynaQ = createQTable(env.rows, env.cols, ACTIONS);
  state.dynaModel = new Map();
  state.nStepBuffer = [];
  state.episode = 1;
  state.returns = [];
  state.lastBatchSummary = null;
  resetEpisodeState();
  render();
}

function trainSarsaEpisode() {
  let localState = { ...env.startState };
  let localAction = selectEpsilonGreedyAction(getValues(localState, "sarsa"), ACTIONS, {
    epsilon: params().epsilon,
  });
  let totalReward = 0;

  for (let step = 0; step < 1000; step += 1) {
    const transition = env.step(localState, localAction);
    const nextAction = transition.done
      ? null
      : selectEpsilonGreedyAction(getValues(transition.nextState, "sarsa"), ACTIONS, {
          epsilon: params().epsilon,
        });

    sarsaUpdate(state.sarsaQ, {
      state: localState,
      action: localAction,
      reward: transition.reward,
      nextState: transition.nextState,
      nextAction,
      alpha: params().alpha,
      gamma: params().gamma,
      done: transition.done,
    });

    totalReward += transition.reward;

    if (transition.done) {
      break;
    }

    localState = { ...transition.nextState };
    localAction = nextAction;
  }

  return totalReward;
}

function trainNStepSarsaEpisode() {
  let localState = { ...env.startState };
  let localAction = selectEpsilonGreedyAction(getValues(localState, "nStepSarsa"), ACTIONS, {
    epsilon: params().epsilon,
  });
  const buffer = [];
  let totalReward = 0;

  for (let step = 0; step < 1000; step += 1) {
    const transition = env.step(localState, localAction);
    const nextAction = transition.done
      ? null
      : selectEpsilonGreedyAction(getValues(transition.nextState, "nStepSarsa"), ACTIONS, {
          epsilon: params().epsilon,
        });

    buffer.push({
      state: { ...localState },
      action: localAction,
      reward: transition.reward,
      nextState: { ...transition.nextState },
      nextAction,
      done: transition.done,
    });

    while (
      buffer.length > 0
      && (buffer.length >= params().nSteps || buffer.at(-1).done)
    ) {
      applyNStepBufferHead(buffer, state.nStepSarsaQ);
      buffer.shift();
    }

    totalReward += transition.reward;

    if (transition.done) {
      break;
    }

    localState = { ...transition.nextState };
    localAction = nextAction;
  }

  return totalReward;
}

function trainQLearningEpisode() {
  let localState = { ...env.startState };
  let localAction = selectEpsilonGreedyAction(getValues(localState, "qLearning"), ACTIONS, {
    epsilon: params().epsilon,
  });
  let totalReward = 0;

  for (let step = 0; step < 1000; step += 1) {
    const transition = env.step(localState, localAction);

    qLearningUpdate(state.qLearningQ, {
      state: localState,
      action: localAction,
      reward: transition.reward,
      nextState: transition.nextState,
      alpha: params().alpha,
      gamma: params().gamma,
      done: transition.done,
    });

    totalReward += transition.reward;

    if (transition.done) {
      break;
    }

    localState = { ...transition.nextState };
    localAction = selectEpsilonGreedyAction(getValues(localState, "qLearning"), ACTIONS, {
      epsilon: params().epsilon,
    });
  }

  return totalReward;
}

function trainDynaQEpisode() {
  let localState = { ...env.startState };
  let localAction = selectEpsilonGreedyAction(getValues(localState, "dynaQ"), ACTIONS, {
    epsilon: params().epsilon,
  });
  let totalReward = 0;

  for (let step = 0; step < 1000; step += 1) {
    const transition = env.step(localState, localAction);

    dynaQUpdate(state.dynaQ, state.dynaModel, {
      state: localState,
      action: localAction,
      reward: transition.reward,
      nextState: transition.nextState,
      alpha: params().alpha,
      gamma: params().gamma,
      done: transition.done,
      planningSteps: params().planningSteps,
    });

    totalReward += transition.reward;

    if (transition.done) {
      break;
    }

    localState = { ...transition.nextState };
    localAction = selectEpsilonGreedyAction(getValues(localState, "dynaQ"), ACTIONS, {
      epsilon: params().epsilon,
    });
  }

  return totalReward;
}

function batchTrain() {
  stopAutoPlay();
  const beforeSarsa = cloneQTable(state.sarsaQ);
  const beforeNStepSarsa = cloneQTable(state.nStepSarsaQ);
  const beforeQLearning = cloneQTable(state.qLearningQ);
  const beforeDynaQ = cloneQTable(state.dynaQ);
  const returns = [];
  for (let i = 0; i < params().episodes; i += 1) {
    returns.push({
      sarsa: trainSarsaEpisode(),
      nStepSarsa: trainNStepSarsaEpisode(),
      qLearning: trainQLearningEpisode(),
      dynaQ: trainDynaQEpisode(),
    });
  }
  state.returns.push(...returns);
  state.episode += params().episodes;
  const latest = returns.at(-1);
  state.lastBatchSummary = {
    episodes: params().episodes,
    sarsa: latest.sarsa,
    nStepSarsa: latest.nStepSarsa,
    qLearning: latest.qLearning,
    dynaQ: latest.dynaQ,
    sarsaDelta: qTableDelta(beforeSarsa, state.sarsaQ),
    nStepSarsaDelta: qTableDelta(beforeNStepSarsa, state.nStepSarsaQ),
    qLearningDelta: qTableDelta(beforeQLearning, state.qLearningQ),
    dynaQDelta: qTableDelta(beforeDynaQ, state.dynaQ),
    dynaModelSize: state.dynaModel.size,
  };
  state.log.unshift({
    episode: state.episode,
    step: "batch",
    message: t("messages.trainedBatch", {
      episodes: params().episodes,
      sarsa: latest.sarsa,
      nStepSarsa: latest.nStepSarsa,
      qLearning: latest.qLearning,
      dynaQ: latest.dynaQ,
      delta: formatDelta(state.lastBatchSummary.dynaQDelta),
      modelSize: state.dynaModel.size,
    }),
  });
  state.log = state.log.slice(0, 9);
  resetEpisodeState(false);
  render();
}

function startAutoPlay() {
  state.playing = true;
  els.autoButton.textContent = t("static.pause");
  state.timer = window.setInterval(advanceStep, params().speed);
}

function stopAutoPlay() {
  state.playing = false;
  els.autoButton.textContent = t("static.autoplay");
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

function toggleAutoPlay() {
  if (state.playing) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function setMode(mode) {
  state.mode = mode;
  const showExperiment = state.currentLab === "basic" && mode === "experiment";
  els.teachModeButton.classList.toggle("active", mode === "teach");
  els.experimentModeButton.classList.toggle("active", mode === "experiment");
  els.experimentPanel.classList.toggle("collapsed", !showExperiment);
  els.experimentPanel.classList.toggle("hidden", !showExperiment);
}

function setLanguage(language) {
  if (state.language === language) return;
  state.language = language;
  try {
    window.localStorage.setItem("rl-visualizer-language", language);
  } catch {
    // Storage is optional; URL and in-memory switching still work.
  }
  render();
}

function setAlgorithmView(algorithmView) {
  state.algorithmView = algorithmView;
  els.compareViewButton.classList.toggle("active", algorithmView === "compare");
  els.sarsaViewButton.classList.toggle("active", algorithmView === "sarsa");
  els.nStepSarsaViewButton.classList.toggle("active", algorithmView === "nStepSarsa");
  els.qLearningViewButton.classList.toggle("active", algorithmView === "qLearning");
  els.dynaQViewButton.classList.toggle("active", algorithmView === "dynaQ");
  if (!state.pending && !state.lastUpdate) {
    chooseCurrentAction();
  }
  render();
}

function renderSteps() {
  els.stepList.innerHTML = dictionary().stepLabels.map((label, index) => {
    const statusClass =
      index === state.phase ? "active" : index < state.phase ? "complete" : "";
    return `<li class="${statusClass}" data-index="${index + 1}">${label}</li>`;
  }).join("");
}

function cellClass(row, col) {
  const point = { row, col };
  const classes = ["cell"];
  const planningState = state.lastUpdate?.dynaQ?.lastPlanningUpdate?.state;
  if (env.isCliff(point)) classes.push("cliff");
  if (env.isGoal(point)) classes.push("goal");
  if (sameState(point, env.startState)) classes.push("start");
  if (state.visited.has(`${row},${col}`)) classes.push("visited");
  if (sameState(point, state.currentState)) classes.push("current");
  if (state.pending && sameState(point, state.pending.nextState)) classes.push("next");
  if (
    state.lastUpdate
    && (sameState(point, state.lastUpdate.state)
      || sameState(point, state.lastUpdate.nStepSarsa?.state))
  ) {
    classes.push("updated");
  }
  if (planningState && sameState(point, planningState)) classes.push("planned");
  return classes.join(" ");
}

function modelCountAt(point) {
  return Array.from(state.dynaModel.values()).filter((entry) => sameState(entry.state, point)).length;
}

function renderGrid() {
  const html = [];
  for (let row = 0; row < env.rows; row += 1) {
    for (let col = 0; col < env.cols; col += 1) {
      const point = { row, col };
      const isTerminal = env.isCliff(point) || env.isGoal(point);
      const sarsaGreedy = isTerminal ? null : greedyAction(getValues(point, "sarsa"));
      const nStepGreedy = isTerminal ? null : greedyAction(getValues(point, "nStepSarsa"));
      const qLearningGreedy = isTerminal ? null : greedyAction(getValues(point, "qLearning"));
      const dynaQGreedy = isTerminal ? null : greedyAction(getValues(point, "dynaQ"));
      const activeGreedy =
        state.algorithmView === "dynaQ"
          ? dynaQGreedy
          : state.algorithmView === "qLearning"
          ? qLearningGreedy
          : state.algorithmView === "nStepSarsa"
            ? nStepGreedy
            : sarsaGreedy;
      const showAgent = sameState(point, state.currentState);
      const modelCount = isTerminal ? 0 : modelCountAt(point);
      const showPlanning = sameState(point, state.lastUpdate?.dynaQ?.lastPlanningUpdate?.state);
      const label = env.isGoal(point)
        ? "G"
        : sameState(point, env.startState)
          ? "S"
          : env.isCliff(point)
            ? "C"
            : `${row},${col}`;
      html.push(`
        <div class="${cellClass(row, col)}" data-state="${row},${col}">
          <span class="cell-label">${label}</span>
          ${
            state.algorithmView === "compare" && !isTerminal
              ? `<span class="policy-pair">
                  <span class="policy-badge sarsa-badge">S ${ARROWS[sarsaGreedy]}</span>
                  <span class="policy-badge nstep-badge">N ${ARROWS[nStepGreedy]}</span>
                  <span class="policy-badge q-badge">Q ${ARROWS[qLearningGreedy]}</span>
                  <span class="policy-badge dyna-badge">D ${ARROWS[dynaQGreedy]}</span>
                </span>`
              : activeGreedy
                ? `<span class="policy-arrow">${ARROWS[activeGreedy]}</span>`
                : ""
          }
          ${modelCount ? `<span class="model-mark" title="${t("messages.modelRemembered", { count: modelCount })}">M${modelCount}</span>` : ""}
          ${showAgent ? '<span class="agent-dot" aria-label="agent"></span>' : ""}
          ${showPlanning && !showAgent ? '<span class="agent-dot planning-mark" aria-label="planning"></span>' : ""}
        </div>
      `);
    }
  }
  els.grid.innerHTML = html.join("");
}

function currentExplanation() {
  const pending = state.lastUpdate ?? state.pending;
  const algorithm = activeAlgorithm();
  if (!pending) {
    const values = getValues(state.currentState, algorithm);
    const oldValue = values[state.currentAction];
    return {
      tuple: {
        s: formatState(state.currentState),
        a: actionLabel(state.currentAction),
        r: "—",
        next: "—",
        nextAction: "—",
        nStepAction: "—",
        bestNextAction: "—",
        dynaPlan: "—",
      },
      values: {
        oldValue,
        nextValue: 0,
        tdTarget: 0,
        tdError: 0,
        newValue: oldValue,
      },
    };
  }

  const sarsaValues = pending.sarsa ?? pending;
  const nStepValues = pending.nStepSarsa ?? pending;
  const qLearningValues = pending.qLearning ?? pending;
  const dynaQValues = pending.dynaQ ?? pending;
  const values =
    state.algorithmView === "dynaQ"
      ? dynaQValues
      : state.algorithmView === "qLearning"
      ? qLearningValues
      : state.algorithmView === "nStepSarsa"
        ? nStepValues
        : sarsaValues;

  return {
    tuple: {
      s: formatState(pending.state),
      a: actionLabel(pending.action),
      r: pending.reward,
      next: formatState(pending.nextState),
      nextAction: actionLabel(sarsaValues.nextAction),
      nStepAction: nStepValues.waiting
        ? `${t("messages.waiting")} ${nStepValues.steps}/${params().nSteps}`
        : `${actionLabel(nStepValues.action)} @ ${formatState(nStepValues.state)}`,
      bestNextAction: actionLabel(qLearningValues.bestNextAction),
      dynaPlan: dynaQValues.planningUpdates?.length
        ? `${dynaQValues.planningUpdates.length}/${dynaQValues.planningSteps}`
        : `0/${dynaQValues.planningSteps ?? params().planningSteps}`,
    },
    values,
    sarsaValues,
    nStepValues,
    qLearningValues,
    dynaQValues,
  };
}

function renderTupleAndFormula() {
  const { tuple, values, sarsaValues, nStepValues, qLearningValues, dynaQValues } = currentExplanation();
  els.updateTitle.textContent =
    state.algorithmView === "compare"
      ? (state.language === "en" ? "Current TD Update Comparison" : "当前 TD 更新对比")
      : `${state.language === "en" ? "Current TD Update" : "当前 TD 更新"} · ${algorithmLabel()}`;
  els.formulaText.textContent =
    state.algorithmView === "qLearning"
      ? "Q(s,a) ← Q(s,a) + α [r + γ max_a Q(s',a) − Q(s,a)]"
      : state.algorithmView === "dynaQ"
        ? state.language === "en"
          ? "Real step: Q-learning update + model[(s,a)] ← (r,s'); then planning samples from the model"
          : "真实一步: Q-learning 更新 + model[(s,a)] ← (r,s')；随后 planning 从 model 抽样继续更新"
      : state.algorithmView === "nStepSarsa"
        ? "G = r₁ + γr₂ + ... + γⁿQ(sₙ,aₙ),  Q(sτ,aτ) ← Q(sτ,aτ) + α[G − Q(sτ,aτ)]"
      : state.algorithmView === "compare"
        ? "Sarsa: Q(s',a') / n-step: G / Q-learning: max_a / Dyna-Q: real + planning"
        : "Q(s,a) ← Q(s,a) + α [r + γQ(s',a') − Q(s,a)]";
  const tupleItems = [
    [state.algorithmView === "nStepSarsa" ? "sτ" : "s", state.algorithmView === "nStepSarsa" && nStepValues ? formatState(nStepValues.state) : tuple.s],
    [state.algorithmView === "nStepSarsa" ? "aτ" : "a", state.algorithmView === "nStepSarsa" && nStepValues ? actionLabel(nStepValues.action) : tuple.a],
    [state.algorithmView === "nStepSarsa" ? "rewards" : "r", state.algorithmView === "nStepSarsa" && nStepValues ? nStepValues.rewards?.join(", ") : tuple.r],
    [
      state.algorithmView === "nStepSarsa"
        ? t("tuple.status")
        : state.algorithmView === "dynaQ"
          ? t("tuple.model")
          : "s'",
      state.algorithmView === "nStepSarsa" && nStepValues
        ? (nStepValues.waiting
          ? `${t("messages.waiting")} ${nStepValues.steps}/${params().nSteps}`
          : state.language === "en"
            ? `${nStepValues.steps}-step return`
            : `${nStepValues.steps} 步回报`)
        : state.algorithmView === "dynaQ" && dynaQValues
          ? state.language === "en"
            ? `${dynaQValues.modelSize ?? state.dynaModel.size} entries`
            : `${dynaQValues.modelSize ?? state.dynaModel.size} 条`
          : tuple.next,
    ],
    [
      state.algorithmView === "qLearning"
        ? "max a"
        : state.algorithmView === "dynaQ"
          ? t("tuple.planning")
        : state.algorithmView === "nStepSarsa"
          ? t("tuple.bootstrap")
        : state.algorithmView === "compare"
          ? t("tuple.compareNext")
          : "a'",
      state.algorithmView === "qLearning"
        ? tuple.bestNextAction
        : state.algorithmView === "dynaQ"
          ? tuple.dynaPlan
        : state.algorithmView === "nStepSarsa"
          ? actionLabel(nStepValues?.bootstrapAction)
        : state.algorithmView === "compare"
          ? `S ${tuple.nextAction} / N ${tuple.nStepAction} / Q ${tuple.bestNextAction} / D ${tuple.dynaPlan}`
          : tuple.nextAction,
    ],
  ];
  els.tupleView.innerHTML = tupleItems
    .map(([label, value]) => `
      <div class="tuple-item">
        <span>${label}</span>
        <strong>${value}</strong>
      </div>
    `)
    .join("");

  if (state.algorithmView === "compare" && sarsaValues && nStepValues && qLearningValues && dynaQValues) {
    els.formulaValues.innerHTML = renderCompareUpdate("Sarsa", "Q(s',a')", sarsaValues)
      + renderCompareUpdate(`n-step Sarsa (n=${params().nSteps})`, "G", nStepValues)
      + renderCompareUpdate("Q-learning", "max Q(s',a)", qLearningValues)
      + renderDynaCompareUpdate(dynaQValues);
    return;
  }

  const rows = [
    [state.algorithmView === "nStepSarsa" ? t("values.oldNStep") : t("values.old"), values.oldValue],
    [
      state.algorithmView === "qLearning"
        ? t("values.maxNext")
        : state.algorithmView === "dynaQ"
          ? t("values.modelPlan")
        : state.algorithmView === "nStepSarsa"
          ? values.waiting ? t("values.collected") : t("values.bootstrapQ")
          : t("values.nextActionValue"),
      state.algorithmView === "dynaQ"
        ? `${values.modelSize ?? state.dynaModel.size} / ${values.planningUpdates?.length ?? 0}`
        : state.algorithmView === "nStepSarsa" && values.waiting
        ? `${values.steps}/${params().nSteps}`
        : values.nextValue,
    ],
    [t("values.tdTarget"), values.tdTarget],
    [t("values.tdError"), values.tdError],
    [t("values.newQ"), values.newValue],
  ];
  els.formulaValues.innerHTML = rows
    .map(([label, value]) => `
      <div>
        <dt>${label}</dt>
        <dd>${typeof value === "number" ? Number(value).toFixed(3) : value}</dd>
      </div>
    `)
    .join("");
}

function renderCompareUpdate(name, nextLabel, values) {
  if (values.waiting) {
    return `
      <div class="compare-update waiting-update">
        <dt>${name}</dt>
        <dd>
          <span>${t("messages.collectedSteps", { steps: values.steps, n: params().nSteps })}</span>
          <strong>${t("messages.waitingMore")}</strong>
          <span>${t("messages.noQWrite")}</span>
          <strong>Q ${Number(values.oldValue).toFixed(3)}</strong>
        </dd>
      </div>
    `;
  }

  return `
    <div class="compare-update">
      <dt>${name}</dt>
      <dd>
        <span>${nextLabel}: ${Number(values.nextValue).toFixed(3)}</span>
        <strong>target ${Number(values.tdTarget).toFixed(3)}</strong>
        <span>error ${Number(values.tdError).toFixed(3)}</span>
        <strong>new Q ${Number(values.newValue).toFixed(3)}</strong>
        ${values.flushedCount > 1 ? `<span>${t("messages.terminalFlush", { count: values.flushedCount })}</span>` : ""}
      </dd>
    </div>
  `;
}

function renderDynaCompareUpdate(values) {
  const plan = values.lastPlanningUpdate ?? values.planningUpdates?.at(-1);
  const planText = plan
    ? `${formatState(plan.state)} ${actionLabel(plan.action)} → ${Number(plan.newValue).toFixed(3)}`
    : t("messages.noPlanningSample");

  return `
    <div class="compare-update">
      <dt>Dyna-Q</dt>
      <dd>
        <span>real target: ${Number(values.tdTarget).toFixed(3)}</span>
        <strong>real new Q ${Number(values.newValue).toFixed(3)}</strong>
        <span>model ${values.modelSize ?? state.dynaModel.size}</span>
        <strong>plan ${values.planningUpdates?.length ?? 0}/${values.planningSteps ?? params().planningSteps}</strong>
        <span>${planText}</span>
      </dd>
    </div>
  `;
}

function renderQBars() {
  const baseInspected = state.lastUpdate?.state ?? state.pending?.state ?? state.currentState;
  const nStepInspected =
    state.lastUpdate?.nStepSarsa?.state ?? state.pending?.nStepSarsa?.state ?? baseInspected;
  const dynaInspected =
    state.lastUpdate?.dynaQ?.lastPlanningUpdate?.state ?? state.pending?.state ?? baseInspected;
  const inspected =
    state.algorithmView === "dynaQ"
      ? dynaInspected
      : state.algorithmView === "nStepSarsa"
        ? nStepInspected
        : baseInspected;
  const updatedAction =
    state.algorithmView === "dynaQ"
      ? state.lastUpdate?.dynaQ?.lastPlanningUpdate?.action ?? state.lastUpdate?.action
      : state.algorithmView === "nStepSarsa"
      ? state.lastUpdate?.nStepSarsa?.action
      : state.lastUpdate?.action;
  els.stateLabel.textContent = `${algorithmLabel()} · s=${formatState(inspected)}`;

  if (state.algorithmView === "compare") {
    els.qBars.innerHTML = `
      <div class="q-compare-grid">
        ${renderQGroup(`Sarsa · ${formatState(baseInspected)}`, getValues(baseInspected, "sarsa"), state.lastUpdate?.action)}
        ${renderQGroup(`n-step · ${formatState(nStepInspected)}`, getValues(nStepInspected, "nStepSarsa"), state.lastUpdate?.nStepSarsa?.action)}
        ${renderQGroup(`Q-learning · ${formatState(baseInspected)}`, getValues(baseInspected, "qLearning"), state.lastUpdate?.action)}
        ${renderQGroup(`Dyna-Q · ${formatState(dynaInspected)}`, getValues(dynaInspected, "dynaQ"), state.lastUpdate?.dynaQ?.lastPlanningUpdate?.action ?? state.lastUpdate?.action)}
      </div>
    `;
    return;
  }

  els.qBars.innerHTML = renderQRows(getValues(inspected, activeAlgorithm()), updatedAction);
}

function renderQGroup(title, values, updatedAction) {
  return `
    <div class="q-group">
      <h4>${title}</h4>
      ${renderQRows(values, updatedAction)}
    </div>
  `;
}

function renderQRows(values, updatedAction) {
  const maxAbs = Math.max(1, ...ACTIONS.map((action) => Math.abs(values[action])));
  return ACTIONS.map((action) => {
    const value = values[action];
    const width = Math.max(4, (Math.abs(value) / maxAbs) * 100);
    const color = value >= 0 ? "var(--green)" : value < -20 ? "var(--red)" : "var(--amber)";
    const cls = action === updatedAction ? "q-row updated-action" : "q-row";
    return `
      <div class="${cls}">
        <span class="q-name">${t(`actions.${action}`)} ${ARROWS[action]}</span>
        <span class="q-track"><span class="q-fill" style="--width:${width}%;--bar-color:${color}"></span></span>
        <span class="q-value">${value.toFixed(2)}</span>
      </div>
    `;
  }).join("");
}

function renderMetrics() {
  els.episodeCount.textContent = state.episode;
  els.stepCount.textContent = state.step;
  els.returnValue.textContent = state.totalReward;
}

function renderPhaseMessage() {
  if (state.phase === 0 && state.lastBatchSummary) {
    els.phaseMessage.textContent = t("messages.batchSummary", {
      episodes: state.lastBatchSummary.episodes,
      sarsa: state.lastBatchSummary.sarsa,
      nStepSarsa: state.lastBatchSummary.nStepSarsa,
      qLearning: state.lastBatchSummary.qLearning,
      dynaQ: state.lastBatchSummary.dynaQ,
      modelSize: state.lastBatchSummary.dynaModelSize,
    });
    return;
  }

  const activeValues =
    state.algorithmView === "dynaQ"
      ? state.lastUpdate?.dynaQ
      : state.algorithmView === "qLearning"
      ? state.lastUpdate?.qLearning
      : state.algorithmView === "nStepSarsa"
        ? state.lastUpdate?.nStepSarsa
        : state.lastUpdate?.sarsa;
  const compareSuffix =
    state.algorithmView === "compare"
      ? t("messages.compareSuffix")
      : state.algorithmView === "dynaQ"
        ? t("messages.dynaSuffix", { planningSteps: params().planningSteps })
      : state.algorithmView === "qLearning"
        ? t("messages.qLearningSuffix")
        : state.algorithmView === "nStepSarsa"
          ? t("messages.nStepSuffix", { nSteps: params().nSteps })
        : t("messages.sarsaSuffix");
  const nStepStatus = state.pending?.nStepSarsa.waiting
    ? `${t("messages.waiting")} ${state.pending.nStepSarsa.steps}/${params().nSteps}`
    : t("messages.nStepUpdating", { state: formatState(state.pending?.nStepSarsa.state) });
  const messages = [
    t("messages.phase0", {
      state: formatState(state.currentState),
      algorithm: algorithmLabel(),
    }),
    t("messages.phase1", { action: actionLabel(state.currentAction) }),
    state.pending
      ? t("messages.phase2Pending", {
        reward: state.pending.reward,
        nextState: formatState(state.pending.nextState),
      })
      : t("messages.phase2Empty"),
    state.pending
      ? t("messages.phase3Pending", {
        suffix: compareSuffix,
        sarsaAction: actionLabel(state.pending.nextAction),
        nStepStatus,
        qAction: actionLabel(state.pending.qLearning.bestNextAction),
        modelSize: state.pending.dynaQ.modelSize,
      })
      : t("messages.phase3Empty"),
    state.lastUpdate
      ? state.algorithmView === "compare"
        ? t("messages.compareUpdated", {
          sarsa: state.lastUpdate.sarsa.newValue.toFixed(3),
          nStep: state.lastUpdate.nStepSarsa.waiting
            ? t("messages.waiting")
            : state.lastUpdate.nStepSarsa.newValue.toFixed(3),
          qLearning: state.lastUpdate.qLearning.newValue.toFixed(3),
          dynaQ: state.lastUpdate.dynaQ.newValue.toFixed(3),
          planCount: state.lastUpdate.dynaQ.planningUpdates.length,
          planningSteps: params().planningSteps,
        })
        : state.algorithmView === "dynaQ"
          ? t("messages.dynaUpdated", {
            value: activeValues?.newValue.toFixed(3) ?? t("messages.none"),
            modelSize: activeValues?.modelSize ?? state.dynaModel.size,
            planCount: activeValues?.planningUpdates.length ?? 0,
            planningSteps: params().planningSteps,
          })
        : state.algorithmView === "nStepSarsa" && activeValues?.waiting
          ? t("messages.nStepCollecting", {
            steps: activeValues.steps,
            nSteps: params().nSteps,
          })
          : t("messages.qUpdated", {
            value: activeValues?.newValue.toFixed(3) ?? t("messages.none"),
          })
      : t("messages.phase4Empty"),
    t("messages.phase5"),
  ];
  els.phaseMessage.textContent = messages[state.phase] ?? messages[0];
}

function renderBatchDelta() {
  if (!state.lastBatchSummary) {
    els.batchDelta.innerHTML = `
      <div class="delta-card empty">${t("messages.batchDeltaEmpty")}</div>
    `;
    return;
  }

  els.batchDelta.innerHTML = `
    <div class="delta-card">
      <span>${state.language === "en" ? "Sarsa Q-table delta" : "Sarsa Q 表变化量"}</span>
      <strong>${formatDelta(state.lastBatchSummary.sarsaDelta)}</strong>
    </div>
    <div class="delta-card">
      <span>${state.language === "en" ? "n-step Sarsa Q-table delta" : "n-step Sarsa Q 表变化量"}</span>
      <strong>${formatDelta(state.lastBatchSummary.nStepSarsaDelta)}</strong>
    </div>
    <div class="delta-card">
      <span>${state.language === "en" ? "Q-learning Q-table delta" : "Q-learning Q 表变化量"}</span>
      <strong>${formatDelta(state.lastBatchSummary.qLearningDelta)}</strong>
    </div>
    <div class="delta-card">
      <span>${state.language === "en" ? "Dyna-Q Q-table delta" : "Dyna-Q Q 表变化量"}</span>
      <strong>${formatDelta(state.lastBatchSummary.dynaQDelta)}</strong>
    </div>
  `;
}

function renderRewardChart() {
  const recent = state.returns.slice(-60);
  if (recent.length === 0) {
    els.rewardChart.innerHTML = `<p class="empty-chart">${t("messages.rewardChartEmpty")}</p>`;
    return;
  }

  const values = recent.flatMap((entry) =>
    typeof entry === "number" ? [entry] : [entry.sarsa, entry.nStepSarsa, entry.qLearning, entry.dynaQ],
  );
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(1, max - min);
  els.rewardChart.innerHTML = recent
    .map((entry) => {
      const sarsa = typeof entry === "number" ? entry : entry.sarsa;
      const nStepSarsa = typeof entry === "number" ? entry : entry.nStepSarsa;
      const qLearning = typeof entry === "number" ? entry : entry.qLearning;
      const dynaQ = typeof entry === "number" ? entry : entry.dynaQ;
      return `
        <span class="bar-pair" title="S ${sarsa} / N ${nStepSarsa} / Q ${qLearning} / D ${dynaQ}">
          ${renderRewardBar(sarsa, min, spread, "var(--blue)")}
          ${renderRewardBar(nStepSarsa, min, spread, "var(--green)")}
          ${renderRewardBar(qLearning, min, spread, "var(--amber)")}
          ${renderRewardBar(dynaQ, min, spread, "#7c3aed")}
        </span>
      `;
    })
    .join("");
}

function renderRewardBar(value, min, spread, color) {
  const normalized = (value - min) / spread;
  const height = 12 + normalized * 108;
  return `<span class="bar" style="--height:${height}px;--bar-color:${color}"></span>`;
}

function renderEventLog() {
  if (state.log.length === 0) {
    els.eventLog.innerHTML = `<p class="empty-chart">${t("messages.eventLogEmpty")}</p>`;
    return;
  }
  els.eventLog.innerHTML = state.log
    .map((entry) => `
      <div class="log-line">
        <strong>E${entry.episode} / ${entry.step}</strong>
        <span>${entry.message}</span>
      </div>
    `)
    .join("");
}

function currentTeachingAlgorithms() {
  return state.currentLab === "frontier" ? FRONTIER_ALGORITHMS : ADVANCED_ALGORITHMS;
}

function currentTeachingAlgorithmId() {
  return state.currentLab === "frontier" ? state.frontierAlgorithmId : state.advancedAlgorithmId;
}

function activeAdvancedAlgorithm() {
  const algorithms = currentTeachingAlgorithms();
  return algorithms.find((algorithm) => algorithm.id === currentTeachingAlgorithmId())
    ?? algorithms[0];
}

function activeAdvancedOverrides() {
  return state.advancedOverrides[currentTeachingAlgorithmId()] ?? {};
}

function advancedFrame() {
  const frameBuilder = state.currentLab === "frontier" ? buildFrontierFrame : buildAdvancedFrame;
  const frameType = state.currentLab === "frontier" ? "frontier" : "advanced";
  return localizeFrame(
    frameBuilder(activeAdvancedAlgorithm(), state.advancedTick, activeAdvancedOverrides()),
    frameType,
  );
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function setAria(element, value) {
  if (element) element.setAttribute("aria-label", value);
}

function localizedContent(item, type) {
  if (state.language !== "en") return item;
  const entry = CONTENT_EN[type]?.[item.id];
  if (!entry) return item;

  return {
    ...item,
    ...entry,
    theory: {
      ...item.theory,
      ...entry.theory,
    },
  };
}

function localizeFrame(frame, type) {
  const localized = localizedContent(frame, type);
  if (localized === frame) return frame;

  return {
    ...localized,
    activeStep: localized.steps?.[frame.phase] ?? frame.activeStep,
  };
}

function renderStaticText() {
  document.documentElement.lang = state.language === "en" ? "en" : "zh-CN";
  document.title = t("documentTitle");

  els.zhLangButton.classList.toggle("active", state.language === "zh");
  els.enLangButton.classList.toggle("active", state.language === "en");
  setText(els.basicLabButton, t("labs.basic"));
  setText(els.advancedLabButton, t("labs.advanced"));
  setText(els.frontierLabButton, t("labs.frontier"));
  setText(els.compareViewButton, t("algorithms.compare"));
  setText(els.sarsaViewButton, t("algorithms.sarsa"));
  setText(els.nStepSarsaViewButton, "n-step");
  setText(els.qLearningViewButton, "Q-learn");
  setText(els.dynaQViewButton, t("algorithms.dynaQ"));
  setText(els.teachModeButton, t("modes.teach"));
  setText(els.experimentModeButton, t("modes.experiment"));
  setText(els.zhLangButton, "中文");
  setText(els.enLangButton, "EN");

  setAria(els.labSwitch, t("static.labSwitchAria"));
  setAria(els.algorithmSwitch, t("static.algorithmSwitchAria"));
  setAria(els.modeSwitch, t("static.modeSwitchAria"));
  setAria(els.languageSwitch, t("static.languageSwitchAria"));
  setAria(els.basicTutorial, t("static.basicTutorialAria"));
  setAria(els.basicNavPanel, t("static.basicNavAria"));
  setAria(els.basicStagePanel, t("static.basicStageAria"));
  setAria(els.basicExplainPanel, t("static.basicExplainAria"));
  setAria(els.stepsPanel, t("static.stepsAria"));
  setAria(els.gridPanel, t("static.gridAria"));
  setAria(els.legend, t("static.legendAria"));
  setAria(els.explainPanel, t("static.explainAria"));
  setAria(els.experimentPanel, t("static.experimentAria"));
  setAria(els.batchDelta, t("static.batchDeltaAria"));
  setAria(els.rewardChart, t("static.rewardChartAria"));
  setAria(els.eventLog, t("static.eventLogAria"));
  setAria(els.advancedWorkspace, t("static.advancedWorkspaceAria"));
  setAria(els.advancedNavPanel, t("static.advancedNavAria"));
  setAria(els.advancedStagePanel, t("static.advancedStageAria"));
  setAria(els.advancedExplainPanel, t("static.advancedExplainAria"));
  setAria(els.advancedExperimentPanel, t("static.advancedExperimentAria"));

  setText(els.appEyebrow, t(`appEyebrow.${state.currentLab}`));
  setText(els.appTitle, t(`appTitle.${state.currentLab}`));
  setText(els.basicNavTitle, t("static.basicRoute"));
  setText(els.basicTheoryTitle, t("static.theoryRead"));
  setText(els.basicControlsTitle, t("static.keyParams"));
  setText(els.stepsTitle, t("static.updateFlow"));
  setText(els.episodeMetricLabel, t("static.episode"));
  setText(els.stepMetricLabel, t("static.step"));
  setText(els.returnMetricLabel, t("static.return"));
  setText(els.gridTitle, t("static.gridTitle"));
  setText(els.legendAgentLabel, t("static.legendAgent"));
  setText(els.legendCliffLabel, t("static.legendCliff"));
  setText(els.legendGoalLabel, t("static.legendGoal"));
  setText(els.nextButton, t("static.next"));
  setText(els.autoButton, state.playing ? t("static.pause") : t("static.autoplay"));
  setText(els.resetEpisodeButton, t("static.resetEpisode"));
  setText(els.resetAllButton, t("static.resetAll"));
  setText(els.qInspectorTitle, t("static.currentQ"));
  setText(els.experimentTitle, t("static.experimentTitle"));
  setText(els.experimentIntro, t("static.experimentIntro"));
  setText(els.trainButton, t("static.train"));
  setText(els.basicNextButton, t("static.next"));
  setText(els.advancedNextButton, t("static.next"));
  setText(els.advancedAutoButton, state.advancedPlaying ? t("static.pause") : t("static.autoplay"));
  setText(els.advancedResetButton, t("static.reset"));
  setText(els.advancedMechanismTitle, t("static.advancedMechanism"));
  setText(els.advancedControlsTitle, t("static.keyParams"));
  setText(els.advancedTheoryTitle, t("static.theoryRead"));
  setText(els.advancedTrainButton, t("static.batchDemo"));
}

function setCurrentLab(lab) {
  const labChanged = state.currentLab !== lab;
  state.currentLab = lab;
  if (labChanged && lab !== "basic") {
    state.advancedTick = 0;
    state.advancedBatchFrames = [];
  }
  els.basicLabButton.classList.toggle("active", lab === "basic");
  els.advancedLabButton.classList.toggle("active", lab === "advanced");
  els.frontierLabButton.classList.toggle("active", lab === "frontier");
  els.algorithmSwitch.classList.toggle("hidden", lab !== "basic");
  els.modeSwitch.classList.toggle("hidden", lab !== "basic");
  els.basicTutorial.classList.toggle("hidden", lab !== "basic");
  els.basicWorkspace.classList.toggle("hidden", lab !== "basic");
  els.experimentPanel.classList.toggle("hidden", lab !== "basic" || state.mode === "teach");
  els.advancedWorkspace.classList.toggle("hidden", lab === "basic");
  els.advancedExperimentPanel.classList.toggle("hidden", lab === "basic");
  if (lab !== "basic") {
    stopAutoPlay();
  } else {
    stopAdvancedAutoPlay();
  }
  render();
}

function setAdvancedAlgorithm(id) {
  if (state.currentLab === "frontier") {
    state.frontierAlgorithmId = id;
  } else {
    state.advancedAlgorithmId = id;
  }
  state.advancedTick = 0;
  state.advancedBatchFrames = [];
  renderAdvancedLab();
}

function advanceAdvancedStep() {
  const algorithm = activeAdvancedAlgorithm();
  state.advancedTick = (state.advancedTick + 1) % algorithm.steps.length;
  state.advancedBatchFrames = [];
  renderAdvancedLab();
}

function resetAdvancedLab() {
  state.advancedTick = 0;
  state.advancedBatchFrames = [];
  renderAdvancedLab();
}

function startAdvancedAutoPlay() {
  state.advancedPlaying = true;
  els.advancedAutoButton.textContent = t("static.pause");
  state.advancedTimer = window.setInterval(advanceAdvancedStep, params().speed);
}

function stopAdvancedAutoPlay() {
  state.advancedPlaying = false;
  els.advancedAutoButton.textContent = t("static.autoplay");
  if (state.advancedTimer) {
    window.clearInterval(state.advancedTimer);
    state.advancedTimer = null;
  }
}

function toggleAdvancedAutoPlay() {
  if (state.advancedPlaying) {
    stopAdvancedAutoPlay();
  } else {
    startAdvancedAutoPlay();
  }
}

function formatAdvancedControlValue(control) {
  if (typeof control.value !== "number") {
    return `${control.value}${control.suffix}`;
  }

  const step = Number(control.step ?? 0.01);
  const places = step >= 1 ? 0 : Math.min(3, String(step).split(".")[1]?.length ?? 2);
  return `${Number(control.value).toFixed(places)}${control.suffix}`;
}

function renderAdvancedControl(control) {
  const value = formatAdvancedControlValue(control);
  const isInteractiveNumber = typeof control.value === "number" && !control.readOnly;

  if (!isInteractiveNumber) {
    return `
      <div class="advanced-control readonly">
        <span>${control.label}</span>
        <strong>${value}</strong>
      </div>
    `;
  }

  return `
    <label class="advanced-control advanced-control-input">
      <span>${control.label}</span>
      <strong>${value}</strong>
      <input
        type="range"
        min="${control.min}"
        max="${control.max}"
        step="${control.step}"
        value="${control.value}"
        data-advanced-control="${control.key}"
      >
    </label>
  `;
}

function renderTheoryItem(label, text) {
  return `
    <div class="theory-item">
      <strong>${label}</strong>
      <p>${text}</p>
    </div>
  `;
}

function renderCourseLink(sourceUrl) {
  if (!sourceUrl) return "";
  return `
    <a class="source-link" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">
      ${t("static.sourceCourse")}
    </a>
  `;
}

function renderBasicLab() {
  if (!els.basicTutorial) return;
  const frame = localizeFrame(
    buildBasicFrame(activeBasicChapter(), state.basicTick, activeBasicOverrides()),
    "basic",
  );

  els.basicChapterNav.innerHTML = BASIC_CHAPTERS.map((chapter) => {
    const localizedChapter = localizedContent(chapter, "basic");
    return `
    <button class="basic-chapter-button ${chapter.id === frame.id ? "active" : ""}" type="button" data-basic-id="${chapter.id}">
      <span>${chapter.shortName}</span>
      <strong>${chapterDisplayName(localizedChapter.chapter)}</strong>
    </button>
  `;
  }).join("");

  els.basicChapter.textContent = frame.chapter;
  els.basicTitle.textContent = frame.title;
  els.basicIntuition.textContent = frame.intuition;
  els.basicProgressLabel.textContent = `step ${frame.phase + 1}/${frame.steps.length}`;
  els.basicProgressBar.style.setProperty("--progress", `${Math.round(frame.progress * 100)}%`);
  els.basicFormula.textContent = frame.formula;
  els.basicControlLabel.textContent = `${frame.shortName} controls`;

  els.basicStage.innerHTML = frame.nodes.map((node) => `
    <div class="basic-node ${node.active ? "active" : ""}">
      <span>${node.label}</span>
      <strong>${node.value}</strong>
    </div>
  `).join("");

  els.basicMetrics.innerHTML = frame.metrics.map((metric) => `
    <div class="${metric.emphasis ? "emphasis" : ""}">
      <dt>${metric.label}</dt>
      <dd>${metric.value}</dd>
    </div>
  `).join("");

  els.basicControls.innerHTML = frame.controls.map(renderAdvancedControl).join("");
  els.basicTheory.innerHTML = [
    renderCourseLink(frame.sourceUrl),
    ...[
      [t("theoryLabels.core"), frame.theory.core],
      [t("theoryLabels.formula"), frame.theory.formula],
      [t("theoryLabels.note"), frame.theory.note],
    ].map(([label, text]) => renderTheoryItem(label, text)),
  ].join("");
}

function setBasicChapter(id) {
  state.basicChapterId = id;
  state.basicTick = 0;
  renderBasicLab();
}

function advanceBasicStep() {
  const chapter = activeBasicChapter();
  state.basicTick = (state.basicTick + 1) % chapter.steps.length;
  renderBasicLab();
}

function setBasicControlValue(key, value) {
  state.basicOverrides = {
    ...state.basicOverrides,
    [state.basicChapterId]: {
      ...activeBasicOverrides(),
      [key]: value,
    },
  };
  renderBasicLab();
}

function setAdvancedControlValue(key, value) {
  const algorithmId = currentTeachingAlgorithmId();
  state.advancedOverrides = {
    ...state.advancedOverrides,
    [algorithmId]: {
      ...activeAdvancedOverrides(),
      [key]: value,
    },
  };
  state.advancedBatchFrames = [];
  renderAdvancedLab();
}

function renderAdvancedTimeline() {
  if (state.advancedBatchFrames.length > 0) {
    els.advancedTimeline.classList.add("batch");
    els.advancedTimeline.innerHTML = state.advancedBatchFrames.map((frame, index) => {
      const localizedFrame = localizeFrame(frame, state.currentLab === "frontier" ? "frontier" : "advanced");
      const metric = localizedFrame.metrics[index % localizedFrame.metrics.length];
      return `
        <div class="timeline-item">
          <strong>${index + 1}. ${localizedFrame.activeStep}</strong>
          <span>${metric.label}: ${metric.value}</span>
        </div>
      `;
    }).join("");
    return;
  }

  els.advancedTimeline.classList.remove("batch");
  els.advancedTimeline.innerHTML = currentTeachingAlgorithms().map((algorithm) => {
    const localizedAlgorithm = localizedContent(
      algorithm,
      state.currentLab === "frontier" ? "frontier" : "advanced",
    );
    return `
    <div class="timeline-item">
      <strong>${algorithm.shortName}</strong>
      <span>${localizedAlgorithm.intuition}</span>
    </div>
  `;
  }).join("");
}

function renderAdvancedLab() {
  if (!els.advancedWorkspace) return;
  const frame = advancedFrame();
  const isFrontier = state.currentLab === "frontier";
  els.advancedNavTitle.textContent = isFrontier
    ? t("static.advancedNavFrontier")
    : t("static.advancedNavAdvanced");
  els.advancedExperimentTitle.textContent = isFrontier
    ? t("static.advancedExperimentFrontier")
    : t("static.advancedExperimentAdvanced");
  els.advancedExperimentIntro.textContent = isFrontier
    ? t("static.advancedIntroFrontier")
    : t("static.advancedIntroAdvanced");

  els.advancedNav.innerHTML = currentTeachingAlgorithms().map((algorithm) => {
    const localizedAlgorithm = localizedContent(algorithm, isFrontier ? "frontier" : "advanced");
    return `
    <button class="advanced-nav-button ${algorithm.id === frame.id ? "active" : ""}" type="button" data-advanced-id="${algorithm.id}">
      <span>${algorithm.shortName}</span>
      <strong>${chapterDisplayName(localizedAlgorithm.chapter)}</strong>
    </button>
  `;
  }).join("");

  els.advancedStepList.innerHTML = frame.steps.map((step, index) => {
    const statusClass =
      index === frame.phase ? "active" : index < frame.phase ? "complete" : "";
    return `<li class="${statusClass}" data-index="${index + 1}">${step}</li>`;
  }).join("");

  els.advancedChapter.textContent = frame.chapter;
  els.advancedTitle.textContent = frame.title;
  els.advancedIntuition.textContent = frame.intuition;
  els.advancedProgressLabel.textContent = `step ${frame.phase + 1}/${frame.steps.length}`;
  els.advancedProgressBar.style.setProperty("--progress", `${Math.round(frame.progress * 100)}%`);
  els.advancedFormula.textContent = frame.formula;
  els.advancedControlLabel.textContent = `${frame.shortName} controls`;

  els.advancedStage.innerHTML = frame.nodes.map((node) => `
    <div class="advanced-node ${node.active ? "active" : ""}">
      <span>${node.label}</span>
      <strong>${node.value}</strong>
    </div>
  `).join("");

  els.advancedMetrics.innerHTML = frame.metrics.map((metric) => `
    <div class="${metric.emphasis ? "emphasis" : ""}">
      <dt>${metric.label}</dt>
      <dd>${metric.value}</dd>
    </div>
  `).join("");

  els.advancedControls.innerHTML = frame.controls.map(renderAdvancedControl).join("");
  els.advancedTheory.innerHTML = [
    renderCourseLink(frame.sourceUrl),
    ...[
      [t("theoryLabels.core"), frame.theory?.core ?? ""],
      [t("theoryLabels.formula"), frame.theory?.formula ?? ""],
      [t("theoryLabels.note"), frame.theory?.note ?? ""],
    ].map(([label, text]) => renderTheoryItem(label, text)),
  ].join("");
  renderAdvancedTimeline();
}

function advancedBatchDemo() {
  const algorithm = activeAdvancedAlgorithm();
  const batchBuilder = state.currentLab === "frontier" ? buildFrontierBatchDemo : buildAdvancedBatchDemo;
  state.advancedBatchFrames = batchBuilder(
    algorithm,
    state.advancedTick,
    activeAdvancedOverrides(),
  );
  state.advancedTick += algorithm.steps.length - 1;
  renderAdvancedLab();
}

function renderSliderLabels() {
  els.epsilonValue.textContent = Number(els.epsilonInput.value).toFixed(2);
  els.alphaValue.textContent = Number(els.alphaInput.value).toFixed(2);
  els.gammaValue.textContent = Number(els.gammaInput.value).toFixed(2);
  els.nStepsValue.textContent = els.nStepsInput.value;
  els.planningStepsValue.textContent = els.planningStepsInput.value;
  els.episodesValue.textContent = els.episodesInput.value;
  els.speedValue.textContent = `${els.speedInput.value}ms`;
}

function render() {
  renderStaticText();
  renderBasicLab();
  renderSteps();
  renderGrid();
  renderTupleAndFormula();
  renderQBars();
  renderMetrics();
  renderPhaseMessage();
  renderBatchDelta();
  renderRewardChart();
  renderEventLog();
  renderSliderLabels();
  renderAdvancedLab();
}

function bindEvents() {
  els.basicLabButton.addEventListener("click", () => setCurrentLab("basic"));
  els.advancedLabButton.addEventListener("click", () => setCurrentLab("advanced"));
  els.frontierLabButton.addEventListener("click", () => setCurrentLab("frontier"));
  els.zhLangButton.addEventListener("click", () => setLanguage("zh"));
  els.enLangButton.addEventListener("click", () => setLanguage("en"));
  els.nextButton.addEventListener("click", advanceStep);
  els.autoButton.addEventListener("click", toggleAutoPlay);
  els.resetEpisodeButton.addEventListener("click", () => {
    stopAutoPlay();
    resetEpisodeState();
    render();
  });
  els.resetAllButton.addEventListener("click", resetAll);
  els.compareViewButton.addEventListener("click", () => setAlgorithmView("compare"));
  els.sarsaViewButton.addEventListener("click", () => setAlgorithmView("sarsa"));
  els.nStepSarsaViewButton.addEventListener("click", () => setAlgorithmView("nStepSarsa"));
  els.qLearningViewButton.addEventListener("click", () => setAlgorithmView("qLearning"));
  els.dynaQViewButton.addEventListener("click", () => setAlgorithmView("dynaQ"));
  els.teachModeButton.addEventListener("click", () => setMode("teach"));
  els.experimentModeButton.addEventListener("click", () => setMode("experiment"));
  els.trainButton.addEventListener("click", batchTrain);
  els.basicNextButton.addEventListener("click", advanceBasicStep);
  els.basicControls.addEventListener("input", (event) => {
    const input = event.target.closest("[data-advanced-control]");
    if (input) {
      setBasicControlValue(input.dataset.advancedControl, Number(input.value));
    }
  });
  els.basicChapterNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-basic-id]");
    if (button) {
      setBasicChapter(button.dataset.basicId);
    }
  });
  els.advancedNextButton.addEventListener("click", advanceAdvancedStep);
  els.advancedAutoButton.addEventListener("click", toggleAdvancedAutoPlay);
  els.advancedResetButton.addEventListener("click", resetAdvancedLab);
  els.advancedTrainButton.addEventListener("click", advancedBatchDemo);
  els.advancedControls.addEventListener("input", (event) => {
    const input = event.target.closest("[data-advanced-control]");
    if (input) {
      setAdvancedControlValue(input.dataset.advancedControl, Number(input.value));
    }
  });
  els.advancedNav.addEventListener("click", (event) => {
    const button = event.target.closest("[data-advanced-id]");
    if (button) {
      setAdvancedAlgorithm(button.dataset.advancedId);
    }
  });

  [
    els.epsilonInput,
    els.alphaInput,
    els.gammaInput,
    els.nStepsInput,
    els.planningStepsInput,
    els.episodesInput,
    els.speedInput,
  ].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === els.nStepsInput) {
        state.nStepBuffer = [];
      }
      renderSliderLabels();
      if (state.playing && input === els.speedInput) {
        stopAutoPlay();
        startAutoPlay();
      }
      if (state.advancedPlaying && input === els.speedInput) {
        stopAdvancedAutoPlay();
        startAdvancedAutoPlay();
      }
    });
  });
}

bindEvents();
resetEpisodeState();
setAlgorithmView("compare");
setMode("teach");
const initialQuery = new URLSearchParams(window.location.search);
const initialAlgorithm = initialQuery.get("algorithm");
if (ADVANCED_ALGORITHMS.some((algorithm) => algorithm.id === initialAlgorithm)) {
  state.advancedAlgorithmId = initialAlgorithm;
}
if (FRONTIER_ALGORITHMS.some((algorithm) => algorithm.id === initialAlgorithm)) {
  state.frontierAlgorithmId = initialAlgorithm;
}
const initialLab = initialQuery.get("lab");
setCurrentLab(
  initialLab === "frontier" || FRONTIER_ALGORITHMS.some((algorithm) => algorithm.id === initialAlgorithm)
    ? "frontier"
    : initialLab === "advanced" || ADVANCED_ALGORITHMS.some((algorithm) => algorithm.id === initialAlgorithm)
      ? "advanced"
      : "basic",
);
render();
