import { useState } from "react";
import {
  Search,
  FileText,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Target,
  Layers,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const flowSteps = ["选择政策", "智能分析", "编辑润色", "导出报告"];

const recentPolicies = ["北京经开区产业发展促进办法", "科技创新企业扶持专项", "中小企业融资支持政策"];

const dimensions = [
  { title: "计划偏移度分析", desc: "对比政策预期目标与实际执行效果的偏离程度", icon: Target, bg: "bg-red-50", iconBg: "bg-red-100", iconColor: "text-primary" },
  { title: "政策工具多样性", desc: "评估政策所使用的工具类型丰富程度", icon: Layers, bg: "bg-blue-50", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "扶持范围分析", desc: "分析政策覆盖的行业、区域与企业类型", icon: Users, bg: "bg-green-50", iconBg: "bg-green-100", iconColor: "text-green-600" },
  { title: "扶持力度分析", desc: "量化政策在资金、税收等方面的支持强度", icon: TrendingUp, bg: "bg-teal-50", iconBg: "bg-teal-100", iconColor: "text-teal-600" },
  { title: "政策效果分析", desc: "综合评估政策实施后的经济社会效益", icon: BarChart3, bg: "bg-amber-50", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
];

const recentTasks = [
  { name: "北京经开区产业发展促进办法", status: "completed", label: "已完成", time: "2024-03-20", color: "text-green-600", bgColor: "bg-green-50 border-green-200", StatusIcon: CheckCircle2 },
  { name: "科技创新企业扶持专项", status: "in-progress", label: "进行中", time: "2024-03-19", color: "text-orange-500", bgColor: "bg-orange-50 border-orange-200", StatusIcon: Clock },
  { name: "中小企业融资支持政策", status: "editing", label: "编辑中", time: "2024-03-18", color: "text-orange-500", bgColor: "bg-orange-50 border-orange-200", StatusIcon: Clock },
];

const PolicyEvaluation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">政策评估工作台</h1>
        <p className="text-sm text-muted-foreground mt-1">
          针对发布政策，提供多维分析、智能诊断与报告生成能力
        </p>
      </div>

      {/* 使用流程 */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-foreground mb-6">使用流程</h3>
        <div className="flex items-center justify-start gap-4">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0
                    ? "bg-primary text-primary-foreground"
                    : "border-2 border-muted-foreground/30 text-muted-foreground"
                }`}>
                  {i + 1}
                </div>
                <span className="text-sm text-foreground font-medium">{step}</span>
              </div>
              {i < flowSteps.length - 1 && <ArrowRight className="w-5 h-5 text-muted-foreground/50" />}
            </div>
          ))}
        </div>
      </Card>

      {/* 已评估政策数 - 红色渐变卡片 */}
      <div className="rounded-xl p-6 bg-gradient-to-r from-red-50 via-red-50/50 to-transparent border">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">28</p>
            <p className="text-sm text-muted-foreground">已评估政策数</p>
          </div>
        </div>
      </div>

      {/* 选择待评估政策 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">选择待评估政策</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索政策名称/关键词"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="px-6">选择政策</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">开始评估</Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">最近查看：</span>
            {recentPolicies.map((p, i) => (
              <span key={p}>
                <button className="text-primary hover:underline text-sm">{p}</button>
                {i < recentPolicies.length - 1 && <span className="text-muted-foreground mx-2">/</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 核心评估维度 */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">核心评估维度</h3>
        <div className="grid grid-cols-5 gap-4">
          {dimensions.map((d) => (
            <div
              key={d.title}
              className={`${d.bg} rounded-xl p-5 cursor-pointer hover:shadow-md transition-shadow`}
            >
              <div className={`w-12 h-12 rounded-xl ${d.iconBg} flex items-center justify-center mb-4`}>
                <d.icon className={`w-6 h-6 ${d.iconColor}`} />
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{d.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* 最近评估任务 */}
      <Card className="p-6">
        <h3 className="text-base font-semibold text-foreground mb-4">最近评估任务</h3>
        <div className="grid grid-cols-3 gap-4">
          {recentTasks.map((t) => (
            <div key={t.name} className="border rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
              <p className="text-base font-semibold text-foreground mb-4">{t.name}</p>
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${t.bgColor} ${t.color}`}>
                  <t.StatusIcon className="w-3.5 h-3.5" />
                  {t.label}
                </div>
                <span className="text-sm text-muted-foreground">{t.time}</span>
              </div>
              <button className="flex items-center gap-1.5 text-primary text-sm hover:underline mx-auto">
                <Eye className="w-4 h-4" />
                查看详情
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PolicyEvaluation;
