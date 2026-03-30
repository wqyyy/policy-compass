import { Search, TrendingUp, FileText, Clock, ChevronDown, Flame, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "政策知识库", value: "30万+", desc: "国家到区级政策全量接入" },
  { label: "智能草稿", value: "486", desc: "近 30 天 AI 生成政策草稿" },
  { label: "评估报告", value: "128", desc: "自动完成合规与落地性评估" },
  { label: "平均起草时长", value: "18 分钟", desc: "从主题到初稿的中位数" },
];

const flowSteps = [
  {
    num: "01",
    title: "政策检索",
    tag: "找依据",
    desc: "按主题、地域、时间和政策类型做多维召回，支持语义检索与条数抽取。",
  },
  {
    num: "02",
    title: "政策分析",
    tag: "做判断",
    desc: "对比扶持对象、力度与门槛条件，自动生成差异分析与趋势判断。",
  },
  {
    num: "03",
    title: "政策起草",
    tag: "写内容",
    desc: "基于分析结果生成核心要点、大纲与正文，支持章节级 AI 协同。",
  },
  {
    num: "04",
    title: "政策评估",
    tag: "做校验",
    desc: "从合规性、一致性和可落地性三方面发现风险并给出修改建议。",
  },
];

const topics = [
  {
    title: "推动生命健康产业高质量创新引领",
    desc: "生物医药研发、医疗器械创新、健康服务新业态与临床成果转化",
    hot: true,
  },
  {
    title: "抢占人工智能核心技术与应用高地",
    desc: "大模型研发、算力基础设施、AI场景开放与数据要素流通治理",
    hot: true,
  },
  {
    title: "深化人才引育机制与厚植人才沃土",
    desc: "高层次人才引进激励、青年人才培育、住房子女教育等配套保障",
    hot: true,
  },
];

const recentDrafts = [
  {
    title: "关于支持未来能源产业创新发展的若干措施",
    status: "起草中",
    time: "今天 10:24",
    owner: "王秋月",
  },
  {
    title: "关于支持未来能源产业创新发展的若干措施",
    status: "起草中",
    time: "今天 10:24",
    owner: "王秋月",
  },
  {
    title: "关于促进专精特新企业梯度培育的实施意见",
    status: "待评估",
    time: "昨天 16:18",
    owner: "于慧妍",
  },
  {
    title: "关于促进专精特新企业梯度培育的实施意见",
    status: "待评估",
    time: "昨天 16:18",
    owner: "于慧妍",
  },
];

export default function PolicyWriting() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1200px]">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">政策写作</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          面向政府政策制定场景，打通政策检索、政策分析、政策起草、政策评估四大模块，形成从"找参考"到"出成稿"的一体化智能闭环。
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-primary/70 mt-1">{s.desc}</p>
          </Card>
        ))}
      </div>

      {/* Flow Navigation */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-bold text-foreground">流程导航</h2>
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          从主题输入到评估导出，按业务链路逐步推进。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {flowSteps.map((step) => (
            <Card key={step.num} className="p-4 border border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.num}
                </span>
                <span className="font-semibold text-sm text-foreground">{step.title}</span>
                <Badge variant="outline" className="ml-auto text-xs text-primary border-primary/30">
                  {step.tag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Topic Sketches */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </span>
            <h2 className="text-base font-bold text-foreground">政策主题速写</h2>
          </div>
          <button className="text-sm text-primary flex items-center gap-1 hover:underline">
            <ChevronDown className="h-4 w-4" />
            更多主题（8）
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topics.map((topic, i) => (
            <Card key={i} className="p-4 border border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 shrink-0">
                  <ArrowRight className="h-3.5 w-3.5 text-primary" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground truncate">{topic.title}</span>
                    {topic.hot && (
                      <Badge className="bg-primary/10 text-primary border-0 text-xs shrink-0">
                        <Flame className="h-3 w-3 mr-0.5" /> 热门
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{topic.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Drafts */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg font-bold text-foreground">最近编辑政策</h2>
          <button className="text-sm text-primary font-medium hover:underline">我的草稿</button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          保留近期待办与进行中的政策任务，方便继续流转。
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentDrafts.map((draft, i) => (
            <Card key={i} className="p-4 border border-border flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{draft.title}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge variant="outline" className="text-xs">{draft.status}</Badge>
                  <span className="text-xs text-muted-foreground">{draft.time}</span>
                  <span className="text-xs text-muted-foreground">负责人：{draft.owner}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 ml-4">继续编辑</Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
