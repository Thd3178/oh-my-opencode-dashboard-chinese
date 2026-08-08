import { describe, expect, it } from "vitest";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  I18nProvider,
  localizeKnown,
  translate,
  translateFmt,
  translateStatus,
} from "./i18n";
import { TimeSeriesActivitySection, SourceSelect } from "./App";
import { TokenUsageUi, TokenUsage } from "./token-usage-ui";

describe("i18n translate", () => {
  it("should return original English text for lang=en", () => {
    expect(translate("en", "mainSession.title")).toBe("Main session");
    expect(translate("en", "tasks.noBg")).toContain("No background tasks detected yet");
    expect(translate("en", "topbar.copy.idle")).toBe("Copy raw JSON");
  });

  it("should return Chinese text for lang=zh", () => {
    expect(translate("zh", "mainSession.title")).toBe("主会话");
    expect(translate("zh", "topbar.copy.idle")).toBe("复制原始 JSON");
    expect(translate("zh", "timeseries.now")).toBe("现在");
  });
});

describe("i18n translateFmt", () => {
  it("should interpolate placeholders in both languages", () => {
    expect(
      translateFmt("en", "tasks.cappedDetail", { messages: 5, calls: 3 })
    ).toBe(" (max 5 messages / 3 tool calls)");
    expect(
      translateFmt("zh", "tasks.cappedDetail", { messages: 5, calls: 3 })
    ).toBe("（最多 5 条消息 / 3 次工具调用）");
  });
});

describe("i18n translateStatus", () => {
  it("should pass through status words in en", () => {
    expect(translateStatus("en", "busy")).toBe("busy");
    expect(translateStatus("en", "whatever")).toBe("whatever");
  });

  it("should map known status words in zh", () => {
    expect(translateStatus("zh", "busy")).toBe("忙碌");
    expect(translateStatus("zh", "idle")).toBe("空闲");
    expect(translateStatus("zh", "running tool")).toBe("运行工具");
    expect(translateStatus("zh", "thinking")).toBe("思考中");
    expect(translateStatus("zh", "not started")).toBe("未开始");
    expect(translateStatus("zh", "in progress")).toBe("进行中");
    expect(translateStatus("zh", "complete")).toBe("已完成");
    expect(translateStatus("zh", "completed")).toBe("已完成");
    expect(translateStatus("zh", "running")).toBe("运行中");
    expect(translateStatus("zh", "queued")).toBe("排队中");
    expect(translateStatus("zh", "error")).toBe("出错");
    expect(translateStatus("zh", "cancelled")).toBe("已取消");
  });

  it("should pass through unknown status words in zh", () => {
    expect(translateStatus("zh", "custom-state")).toBe("custom-state");
  });
});

describe("i18n localizeKnown", () => {
  it("should pass through text in en", () => {
    expect(localizeKnown("en", "just now")).toBe("just now");
  });

  it("should map known fallback strings in zh", () => {
    expect(localizeKnown("zh", "just now")).toBe("刚刚");
    expect(localizeKnown("zh", "(no description)")).toBe("（无描述）");
    expect(localizeKnown("zh", "unknown")).toBe("未知");
    expect(localizeKnown("zh", "never")).toBe("从未");
  });

  it("should pass through unknown text in zh", () => {
    expect(localizeKnown("zh", "something custom")).toBe("something custom");
  });
});

describe("i18n SSR rendering", () => {
  it("should render English UI by default (no provider)", () => {
    const html = renderToStaticMarkup(<TimeSeriesActivitySection timeSeries={makeTimeSeries()} />);
    expect(html).toContain("Time-series activity");
    expect(html).toContain("Main agents");

    const sourceHtml = renderToStaticMarkup(
      <SourceSelect sources={[]} selectedSourceId="" disabled={false} onChange={() => {}} />
    );
    expect(sourceHtml).toContain("(no sources)");
  });

  it("should render Chinese UI inside I18nProvider with initialLang=zh", () => {
    const html = renderToStaticMarkup(
      <I18nProvider initialLang="zh">
        <TimeSeriesActivitySection timeSeries={makeTimeSeries()} />
      </I18nProvider>
    );
    expect(html).toContain("时序活动");
    expect(html).toContain("主代理");
    expect(html).toContain("现在");
    expect(html).not.toContain("Time-series activity");
  });

  it("should render Chinese UI in TokenUsageUi inside I18nProvider", () => {
    const tokenUsage: TokenUsage = {
      totals: { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0, total: 0 },
      rows: [],
    };
    const html = renderToStaticMarkup(
      <I18nProvider initialLang="zh">
        <TokenUsageUi tokenUsage={tokenUsage} expanded={true} />
      </I18nProvider>
    );
    expect(html).toContain("总计");
    expect(html).toContain("尚未检测到 Token 用量。");
  });
});

function makeTimeSeries() {
  type SeriesId =
    | "overall-main"
    | "agent:sisyphus"
    | "agent:prometheus"
    | "agent:atlas"
    | "background-total";
  const buckets = 3;
  const mkSeries = (id: SeriesId, values: number[]) => ({ id, label: id, tone: "muted" as const, values });
  return {
    windowMs: 300_000,
    buckets,
    bucketMs: 2_000,
    anchorMs: 0,
    serverNowMs: 0,
    series: [
      mkSeries("overall-main", [0, 0, 0]),
      mkSeries("agent:sisyphus", [0, 0, 0]),
      mkSeries("agent:prometheus", [0, 0, 0]),
      mkSeries("agent:atlas", [0, 0, 0]),
      mkSeries("background-total", [0, 0, 0]),
    ],
  };
}
