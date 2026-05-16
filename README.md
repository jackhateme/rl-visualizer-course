# RL Visualizer Course / 强化学习可视化课程

An interactive, dependency-light reinforcement learning course for visualizing classic TD control, deep RL, and frontier RL concepts.

一个轻量、可交互的强化学习可视化课程，用来演示经典 TD 控制、深度强化学习和前沿强化学习主题。

## English

### What It Includes

- Foundation RL tutorial: RL loop, bandits, MDP, dynamic programming, TD learning, and Dyna-Q.
- Cliff Walking visualizer: Sarsa, n-step Sarsa, Q-learning, and Dyna-Q side-by-side.
- Advanced RL lab: DQN, DQN improvements, policy gradient, actor-critic, TRPO, PPO, DDPG, and SAC.
- Frontier RL lab: imitation learning, MPC, MBPO, offline RL, goal-conditioned RL, multi-agent RL, and MADDPG.
- Chinese/English UI switching through the on-page language toggle or `?lang=zh` / `?lang=en`.
- Unit tests for the algorithm calculations and teaching-frame builders.

### Run Locally

```bash
npm run serve
```

Then open:

```text
http://127.0.0.1:4173
```

No build step is required. The app is a static HTML/CSS/JavaScript project using native ES modules.

### Test

```bash
npm test
```

### Project Structure

```text
index.html          App shell
styles.css          Application styles
src/app.js          UI state, rendering, and interactions
src/sarsa.js        Cliff Walking environment and tabular RL updates
src/basic.js        Foundation-course teaching frames
src/advanced.js     Advanced RL teaching frames
src/frontier.js     Frontier RL teaching frames
src/*.test.js       Node test suite
package.json        Local scripts
```

## 中文

### 内容概览

- 基础篇：强化学习闭环、多臂老虎机、MDP、动态规划、TD 学习和 Dyna-Q。
- 悬崖漫步可视化：并排对比 Sarsa、n-step Sarsa、Q-learning 和 Dyna-Q。
- 进阶篇：DQN、DQN 改进、策略梯度、Actor-Critic、TRPO、PPO、DDPG 和 SAC。
- 前沿篇：模仿学习、MPC、MBPO、离线强化学习、目标导向强化学习、多智能体强化学习和 MADDPG。
- 支持中英文界面切换：页面右上角按钮，或使用 `?lang=zh` / `?lang=en`。
- 包含算法计算和教学 frame 的单元测试。

### 本地运行

```bash
npm run serve
```

然后打开：

```text
http://127.0.0.1:4173
```

项目不需要构建步骤，是基于原生 ES Modules 的静态 HTML/CSS/JavaScript 应用。

### 测试

```bash
npm test
```

### 项目结构

```text
index.html          页面骨架
styles.css          页面样式
src/app.js          UI 状态、渲染和交互
src/sarsa.js        悬崖漫步环境和表格型 RL 更新
src/basic.js        基础篇教学 frame
src/advanced.js     进阶篇教学 frame
src/frontier.js     前沿篇教学 frame
src/*.test.js       Node 测试
package.json        本地脚本
```
