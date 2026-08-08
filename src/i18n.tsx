import * as React from "react";

export type Lang = "en" | "zh";

const LANG_STORAGE_KEY = "omoDashboardLang";

export function readStoredLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
}

const en = {
  "topbar.subtitle": "Live view (no prompts or tool arguments rendered).",
  "topbar.live": "Live",
  "topbar.disconnected": "Disconnected",
  "topbar.sourceAria": "Source",
  "topbar.noSources": "(no sources)",
  "topbar.theme.light": "Switch to light mode",
  "topbar.theme.dark": "Switch to dark mode",
  "topbar.sound.enable": "Enable sound",
  "topbar.sound.disable": "Disable sound",
  "topbar.sound": "Sound",
  "topbar.sound.on": "On",
  "topbar.sound.off": "Off",
  "topbar.ding": "Ding",
  "topbar.dingTitle": "Play ding",
  "topbar.dingAria": "Play ding sound",
  "topbar.copy.ok": "Copied",
  "topbar.copy.err": "Copy failed",
  "topbar.copy.idle": "Copy raw JSON",
  "topbar.lang.toZh": "Switch to Chinese",
  "topbar.lang.toEn": "Switch to English",
  "topbar.lang.zh": "中文",
  "topbar.lang.en": "EN",
  "timeseries.title": "Time-series activity",
  "timeseries.sub": "Last 5 minutes",
  "timeseries.mainAgents": "Main agents",
  "timeseries.backgroundTotal": "background tasks (total)",
  "timeseries.now": "Now",
  "mainSession.title": "Main session",
  "mainSession.agent": "AGENT",
  "mainSession.currentTool": "CURRENT TOOL",
  "mainSession.currentModel": "CURRENT MODEL",
  "mainSession.lastUpdated": "LAST UPDATED",
  "mainSession.session": "SESSION",
  "plan.title": "Plan progress and todos",
  "plan.todosCount": "todos",
  "plan.planCount": "plan",
  "plan.viewAria": "Plan and todos view",
  "plan.plan": "Plan",
  "plan.todos": "Todos",
  "plan.hideSteps": "Hide steps",
  "plan.showSteps": "Show steps",
  "plan.name": "NAME",
  "plan.progress": "PROGRESS",
  "plan.emptyStep": "(empty)",
  "plan.noSteps": "(no steps detected)",
  "plan.content": "CONTENT",
  "plan.status": "STATUS",
  "plan.priority": "PRIORITY",
  "plan.noTodos": "No todos detected yet.",
  "tokens.title": "Token usage",
  "tokens.model": "MODEL",
  "tokens.input": "INPUT",
  "tokens.output": "OUTPUT",
  "tokens.reasoning": "REASONING",
  "tokens.cacheRead": "CACHE.READ",
  "tokens.cacheWrite": "CACHE.WRITE",
  "tokens.total": "TOTAL",
  "tokens.empty": "No token usage detected yet.",
  "tokens.breakdown": "Model breakdown",
  "tasks.mainTitle": "Main session tasks",
  "tasks.bgTitle": "Background tasks",
  "tasks.description": "DESCRIPTION",
  "tasks.agent": "AGENT",
  "tasks.lastModel": "LAST MODEL",
  "tasks.status": "STATUS",
  "tasks.toolCalls": "TOOL CALLS",
  "tasks.lastTool": "LAST TOOL",
  "tasks.timeline": "TIMELINE",
  "tasks.noMain": "No main session tasks detected yet.",
  "tasks.noBg":
    "No background tasks detected yet. When you run background agents, they will appear here.",
  "tasks.collapse": "Collapse",
  "tasks.expand": "Expand",
  "tasks.collapseToolCalls": "Collapse tool calls",
  "tasks.expandToolCalls": "Expand tool calls",
  "tasks.toolCallsAria": "Tool calls",
  "tasks.toolCallsMeta": "Tool calls (metadata only)",
  "tasks.refreshing": " - refreshing",
  "tasks.capped": " - capped",
  "tasks.cappedDetail": " (max {messages} messages / {calls} tool calls)",
  "tasks.noSessionId": "No session id available for this task.",
  "tasks.toolCallsUnavailable": "Tool calls unavailable.",
  "tasks.loadingToolCalls": "Loading tool calls...",
  "tasks.noToolCalls": "No tool calls recorded.",
  "misc.appTitle": "Agent Dashboard",
  "misc.rawJson": "Raw JSON",
  "misc.footer": "Local-only dashboard. Served from",
  "misc.lastUpdate": "Last update:",
  "misc.never": "never",
} as const;

export type MessageKey = keyof typeof en;

const zh: Record<MessageKey, string> = {
  "topbar.subtitle": "实时视图（不渲染提示词或工具参数）。",
  "topbar.live": "在线",
  "topbar.disconnected": "已断开",
  "topbar.sourceAria": "来源",
  "topbar.noSources": "（无来源）",
  "topbar.theme.light": "切换到浅色模式",
  "topbar.theme.dark": "切换到深色模式",
  "topbar.sound.enable": "开启声音",
  "topbar.sound.disable": "关闭声音",
  "topbar.sound": "声音",
  "topbar.sound.on": "开",
  "topbar.sound.off": "关",
  "topbar.ding": "提示音",
  "topbar.dingTitle": "播放提示音",
  "topbar.dingAria": "播放提示音",
  "topbar.copy.ok": "已复制",
  "topbar.copy.err": "复制失败",
  "topbar.copy.idle": "复制原始 JSON",
  "topbar.lang.toZh": "切换到中文",
  "topbar.lang.toEn": "切换到英文",
  "topbar.lang.zh": "中文",
  "topbar.lang.en": "EN",
  "timeseries.title": "时序活动",
  "timeseries.sub": "最近 5 分钟",
  "timeseries.mainAgents": "主代理",
  "timeseries.backgroundTotal": "后台任务（总计）",
  "timeseries.now": "现在",
  "mainSession.title": "主会话",
  "mainSession.agent": "代理",
  "mainSession.currentTool": "当前工具",
  "mainSession.currentModel": "当前模型",
  "mainSession.lastUpdated": "最后更新",
  "mainSession.session": "会话",
  "plan.title": "计划进度与待办",
  "plan.todosCount": "待办",
  "plan.planCount": "计划",
  "plan.viewAria": "计划与待办视图",
  "plan.plan": "计划",
  "plan.todos": "待办",
  "plan.hideSteps": "隐藏步骤",
  "plan.showSteps": "显示步骤",
  "plan.name": "名称",
  "plan.progress": "进度",
  "plan.emptyStep": "（空）",
  "plan.noSteps": "（未检测到步骤）",
  "plan.content": "内容",
  "plan.status": "状态",
  "plan.priority": "优先级",
  "plan.noTodos": "尚未检测到待办事项。",
  "tokens.title": "Token 用量",
  "tokens.model": "模型",
  "tokens.input": "输入",
  "tokens.output": "输出",
  "tokens.reasoning": "推理",
  "tokens.cacheRead": "缓存读",
  "tokens.cacheWrite": "缓存写",
  "tokens.total": "总计",
  "tokens.empty": "尚未检测到 Token 用量。",
  "tokens.breakdown": "按模型细分",
  "tasks.mainTitle": "主会话任务",
  "tasks.bgTitle": "后台任务",
  "tasks.description": "描述",
  "tasks.agent": "代理",
  "tasks.lastModel": "最后模型",
  "tasks.status": "状态",
  "tasks.toolCalls": "工具调用",
  "tasks.lastTool": "最后工具",
  "tasks.timeline": "时间线",
  "tasks.noMain": "尚未检测到主会话任务。",
  "tasks.noBg": "尚未检测到后台任务。当你运行后台代理时，它们会显示在这里。",
  "tasks.collapse": "收起",
  "tasks.expand": "展开",
  "tasks.collapseToolCalls": "收起工具调用",
  "tasks.expandToolCalls": "展开工具调用",
  "tasks.toolCallsAria": "工具调用",
  "tasks.toolCallsMeta": "工具调用（仅元数据）",
  "tasks.refreshing": " - 刷新中",
  "tasks.capped": " - 已截断",
  "tasks.cappedDetail": "（最多 {messages} 条消息 / {calls} 次工具调用）",
  "tasks.noSessionId": "此任务没有可用的会话 ID。",
  "tasks.toolCallsUnavailable": "工具调用不可用。",
  "tasks.loadingToolCalls": "正在加载工具调用...",
  "tasks.noToolCalls": "没有记录到工具调用。",
  "misc.appTitle": "Agent 仪表盘",
  "misc.rawJson": "原始 JSON",
  "misc.footer": "本地仪表盘，服务地址",
  "misc.lastUpdate": "最后更新：",
  "misc.never": "从未",
};

export function translate(lang: Lang, key: MessageKey): string {
  return lang === "zh" ? (zh[key] ?? en[key]) : en[key];
}

export function translateFmt(
  lang: Lang,
  key: MessageKey,
  params: Record<string, string | number>
): string {
  let out = translate(lang, key);
  for (const [k, v] of Object.entries(params)) {
    out = out.replaceAll(`{${k}}`, String(v));
  }
  return out;
}

// Status words that come from the server payload (data stays English; only the
// rendered label is localized). Unknown values pass through unchanged.
const zhStatusWords: Record<string, string> = {
  busy: "忙碌",
  idle: "空闲",
  unknown: "未知",
  "running tool": "运行工具",
  thinking: "思考中",
  "not started": "未开始",
  "in progress": "进行中",
  complete: "已完成",
  completed: "已完成",
  running: "运行中",
  queued: "排队中",
  pending: "待处理",
  error: "出错",
  cancelled: "已取消",
};

export function translateStatus(lang: Lang, status: string): string {
  if (lang !== "zh") return status;
  return zhStatusWords[status] ?? status;
}

// Small known English fallback/data strings that occasionally surface as
// display values (e.g. placeholder data or legacy payloads).
const zhKnownFallbacks: Record<string, string> = {
  "just now": "刚刚",
  "(no description)": "（无描述）",
  "(no session)": "（无会话）",
  unknown: "未知",
  never: "从未",
  disconnected: "已断开",
};

export function localizeKnown(lang: Lang, text: string): string {
  if (lang !== "zh") return text;
  return zhKnownFallbacks[text] ?? text;
}

const LangContext = React.createContext<{ lang: Lang; setLang: (next: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function I18nProvider(props: {
  children: React.ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = React.useState<Lang>(props.initialLang ?? readStoredLang);

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // ignore localStorage access errors
    }
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{props.children}</LangContext.Provider>;
}

export function useI18n(): { lang: Lang; setLang: (next: Lang) => void } {
  return React.useContext(LangContext);
}
