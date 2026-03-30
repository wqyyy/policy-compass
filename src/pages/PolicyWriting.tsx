import { Sparkles, FileText, Activity, TrendingUp, Clock, ChevronRight, Heart, PenTool, Shield, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: FileText, label: "政策知识库", value: "30万+", desc: "国家到区级政策资金全覆盖", color: "bg-primary/10 text-primary" },
  { icon: Activity, label: "智能草稿", value: "486", desc: "近 30 天 AI 生成政策草稿", color: "bg-orange-500/10 text-orange-500" },
  { icon: TrendingUp, label: "评估报告", value: "128", desc: "自动完成合规与落地性评估", color: "bg-emerald-500/10 text-emerald-500" },
  { icon: Clock, label: "平均起草时长", value: "18 分钟", desc: "从主题到初稿的中位数", color: "bg-orange-600/10 text-orange-600" },
];

const flowSteps = [
  {
    num: "01",
    title: "政策搜集",
    tag: "找参考",
    tagColor: "bg-primary text-white",
    borderColor: "border-l-primary",
    desc: "搜集基础、辅助、对标相关政策信息，支持跨层级领域检索聚合",
  },
  {
    num: "02",
    title: "政策分析",
    tag: "做判断",
    tagColor: "bg-gray-700 text-white",
    borderColor: "border-l-gray-700",
    desc: "对比政策背景、工具和措施、目标引导及提出关键性建议",
  },
  {
    num: "03",
    title: "政策起草",
    tag: "写内容",
    tagColor: "bg-emerald-500 text-white",
    borderColor: "border-l-emerald-500",
    desc: "基于前期检索及分析检测，并编辑正文、支持生成对外新闻稿",
  },
  {
    num: "04",
    title: "政策评估",
    tag: "优化改造",
    tagColor: "bg-orange-500 text-white",
    borderColor: "border-l-orange-500",
    desc: "从政策性、政策形式与政策兑现性等方面政策效力性进行评估并评价优化",
  },
];

const topics = [
  {
    icon: Shield,
    iconColor: "bg-primary/10 text-primary",
    title: "推动半导体产业集群质量提升引领",
    desc: "全面提振半导体产业、加大培育性资金投入、进展企业人才技术高能推进建言。",
  },
  {
    icon: Activity,
    iconColor: "bg-violet-500/10 text-violet-500",
    title: "抢占人工智能核心技术与应用高地",
    desc: "大整合科技资源、建立全局化引导机制、AI能源开放分布共享科技资源配套完备。",
  },
  {
    icon: Users,
    iconColor: "bg-emerald-500/10 text-emerald-500",
    title: "深化人才引育机制与能级人才支持",
    desc: "激发各类人才创新活力、舒适企业人才居住、住房投保人才支持等便条化支持。",
  },
];

export default function PolicyWriting() {
  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1200px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">政策写作</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            面向政府政策制定场景，打通政策检索、政策分析、政策起草、政策评估四大模块，形成从"找参考"到"出成稿"的一体化智能闭环。
          </p>
        </div>
        <Button className="shrink-0 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
          <Sparkles className="w-4 h-4" />
          开始新写作
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 border border-border">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm font-medium text-foreground mt-1">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
          </Card>
        ))}
      </div>

      {/* Flow Navigation */}
      <Card className="p-6 border border-border">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">流程导航</h2>
            <p className="text-sm text-muted-foreground mt-1">从主题输入到评估输出，按业务链路逐步推进。</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {flowSteps.map((step, i) => (
            <Card
              key={step.num}
              className={`p-4 border-l-4 ${step.borderColor} border border-border hover:shadow-md transition-shadow cursor-pointer relative`}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${
                  i === 0 ? "bg-primary" : i === 1 ? "bg-gray-700" : i === 2 ? "bg-emerald-500" : "bg-orange-500"
                }`}>
                  {step.num}
                </span>
                <Badge className={`text-xs ${step.tagColor} border-0`}>{step.tag}</Badge>
              </div>
              <p className="font-semibold text-sm text-foreground mb-2">{step.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              {i < 3 && (
                <ChevronRight className="absolute right-[-14px] top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/40 hidden md:block z-10" />
              )}
            </Card>
          ))}
        </div>
      </Card>

      {/* Topic Sketches */}
      <Card className="p-6 border border-border">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">政策主题速写</h2>
              <p className="text-sm text-muted-foreground">更多主题 (8)</p>
            </div>
          </div>
          <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            查看全部 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {topics.map((topic, i) => (
            <Card key={i} className="p-5 border border-border hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${topic.iconColor}`}>
                    <topic.icon className="w-5 h-5" />
                  </div>
                  <Badge className="bg-emerald-500 text-white border-0 text-xs">新推荐</Badge>
                </div>
                <p className="font-semibold text-sm text-foreground mb-2">{topic.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{topic.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  <Heart className="w-3.5 h-3.5" /> 收藏
                </button>
                <button className="flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                  开始写作 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
