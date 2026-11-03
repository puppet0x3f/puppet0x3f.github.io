<ul class="research-focus">
  <li><strong>任务分解与责任建模。</strong> 研究复杂任务的层次化分解、委派与责任边界，使多智能体协作中的规划承诺与执行工件保持关联。</li>
  <li><strong>过程监督与智能体后训练。</strong> 将验证证据、责任转移和执行反馈转化为轨迹筛选与状态—动作监督，探索面向智能体后训练的过程学习机制。</li>
  <li><strong>可验证执行与有界修复。</strong> 结合显式契约、执行检查与可审计记录，支持受控修改、状态恢复和结果核验。</li>
  <li><strong>技能选择与组合。</strong> 研究技能适用条件、前置依赖与跨领域组合，在资源预算和执行合法性约束下求解多步骤任务。</li>
</ul>

### 研究工作

<article class="project-entry project-with-figure" aria-labelledby="project-audittrainer">
  <a class="publication-figure" href="static/assets/img/publications/audittrainer-method.png" aria-label="放大查看 AuditTrainer 方法图" aria-haspopup="dialog" data-figure-title="AuditTrainer · 方法概览">
    <img src="static/assets/img/publications/audittrainer-method-thumb.webp" width="480" height="196" alt="AuditTrainer 方法：轨迹收集、责任审计筛选、保留上下文的样本构建，以及监督微调与责任感知强化学习" loading="lazy" decoding="async" />
  </a>
  <div>
    <h4 class="project-heading" id="project-audittrainer">AuditTrainer</h4>
    <p class="project-meta"><span>共同第一作者，排名第一</span><span>智能体后训练</span></p>
    <p>以可审计责任转移为监督单元，研究递归智能体的后训练。结合责任树、来源 DAG 与“功能正确性＋责任有效性”双门控轨迹筛选，构建状态—下一动作监督，并结合 Qwen3-8B 的 QLoRA 微调与递归运行时回接。</p>
  </div>
</article>

<article class="project-entry">
  <h4 class="project-heading">DVC-Edit</h4>
  <p class="project-meta"><span>第一作者</span><span>面向 Web 迭代编辑的智能体</span></p>
  <p>研究决策—代码—视觉对齐，以可执行编辑事务关联用户需求、代码读写范围、视觉影响与保持条件。设计多任务 LoRA 监督与执行反馈纠错机制，联合学习目标定位、影响预测、任务分解与补丁生成。</p>
</article>

<article class="project-entry">
  <h4 class="project-heading">GeoJEV-Skill</h4>
  <p class="project-meta"><span>共同第一作者，排名第二</span><span>技能选择与组合</span></p>
  <p>研究能够保留技能适用条件和模式关联的几何表示，结合显式契约、可验证执行反馈与资源预算，设计面向跨领域技能选择和组合的决策与训练机制。</p>
</article>

<article class="funding-project">
  <h3>资助项目</h3>
  <h4 class="project-heading">工业级复杂编程任务中的可信代码生成核心技术研究</h4>
  <p class="project-meta"><span>国家级大学生创新训练项目</span><span>项目负责人</span><span>2025.06–至今</span></p>
  <p>围绕多模态程序表征、层次化任务规划、可追溯决策与执行核验开展研究，为复杂编程场景中的智能体任务分解与过程验证提供应用场景。</p>
  <p class="project-meta">项目编号：2025190101 · 资助经费：1.5 万元</p>
</article>


