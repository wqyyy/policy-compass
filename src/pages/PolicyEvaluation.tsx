import { useState } from "react";
import {
  Search,
  FileCheck,
  Clock,
  FileEdit,
  CheckCircle2,
  AlertTriangle,
  Target,
  Layers,
  Users,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Sparkles,
  Eye,
  Play,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "已评估政策数", value: 28, icon: FileCheck, color: "text-primary" },
];

const dimensions = [
  { title: "计划偏移度分析", desc: "对比政策预期目标与实际执行效果的偏离程度", icon: Target, color: "bg-primary/10 text-primary" },
  { title: "政策工具多样性", desc: "评估政策所使用的工具类型丰富程度", icon: Layers, color: "bg-gov-blue/10 text-gov-blue" },
  { title: "扶持范围分析", desc: "分析政策覆盖的行业、区域与企业类型", icon: Users, color: "bg-gov-green/10 text-gov-green" },
  { title: "扶持力度分析", desc: "量化政策在资金、税收等方面的支持强度", icon: TrendingUp, color: "bg-gov-orange/10 text-gov-orange" },
  { title: "政策效果分析", desc: "综合评估政策实施后的经济社会效益", icon: BarChart3, color: "bg-gov-gold/10 text-gov-gold" },
];

const recentTasks = [
  { name: "北京经开区产业发展促进办法", status: "completed", stage: "已完成", time: "2024-03-20" },
  { name: "科技创新企业扶持专项", status: "in-progress", stage: "智能分析中", time: "2024-03-19" },
  { name: "中小企业融资支持政策", status: "editing", stage: "报告编辑", time: "2024-03-18" },
  { name: "人才引进与培养激励办法", status: "in-progress", stage: "数据采集", time: "2024-03-17" },
  { name: "绿色低碳产业发展支持政策", status: "pending", stage: "待启动", time: "2024-03-16" },
];

const insights = [
  { text: "检测到「科技创新企业扶持专项」目标达成偏差较大，建议重新审视扶持门槛设定", type: "warning" },
  { text: "「中小企业融资支持政策」工具使用结构单一，仅依赖贴息方式，建议增加担保等工具", type: "warning" },
  { text: "「人才引进与培养激励办法」扶持对象覆盖面偏窄，集中在信息技术行业", type: "info" },
  { text: "「北京经开区产业发展促进办法」综合评分优秀，可作为标杆案例推广", type: "success" },
];

const recentPolicies = ["北京经开区产业发展促进办法", "科技创新企业扶持专项", "中小企业融资支持政策"];

const flowSteps = ["选择政策", "智能分析", "编辑润色", "导出报告"];

const statusMap: Record<string, { label: string; class: string }> = {
  completed: { label: "已完成", class: "bg-gov-green/10 text-gov-green border-gov-green/20" },
  "in-progress": { label: "进行中", class: "bg-gov-orange/10 text-gov-orange border-gov-orange/20" },
  editing: { label: "编辑中", class: "bg-gov-blue/10 text-gov-blue border-gov-blue/20" },
  pending: { label: "待启动", class: "bg-muted text-muted-foreground border-border" },
};

const PolicyEvaluation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">政策评估工作台</h1>
        <p className="text-sm text-muted-foreground mt-1">
          围绕单篇已发布政策，提供多维分析、智能诊断与报告生成能力
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="gov-card-hover">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policy Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">选择待评估政策</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索政策名称/关键词"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">选择政策</Button>
            <Button className="gov-gradient text-primary-foreground">开始评估</Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">最近查看：</span>
            {recentPolicies.map((p, i) => (
              <span key={p}>
                <button className="text-primary hover:underline text-sm">{p}</button>
                {i < recentPolicies.length - 1 && <span className="text-muted-foreground mx-1">/</span>}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dimensions */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">核心评估维度</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {dimensions.map((d) => (
            <Card key={d.title} className="gov-card-hover cursor-pointer group">
              <CardContent className="p-4 text-center space-y-2">
                <div className={`w-12 h-12 rounded-xl ${d.color} mx-auto flex items-center justify-center`}>
                  <d.icon className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-foreground">{d.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">最近评估任务</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 font-medium">政策名称</th>
                  <th className="text-left py-2 font-medium">状态</th>
                  <th className="text-left py-2 font-medium">当前阶段</th>
                  <th className="text-left py-2 font-medium">更新时间</th>
                  <th className="text-right py-2 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((t) => (
                  <tr key={t.name} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="py-3 text-foreground">{t.name}</td>
                    <td className="py-3">
                      <Badge variant="outline" className={statusMap[t.status].class}>
                        {statusMap[t.status].label}
                      </Badge>
                    </td>
                    <td className="py-3 text-muted-foreground">{t.stage}</td>
                    <td className="py-3 text-muted-foreground">{t.time}</td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-primary h-7 gap-1">
                        <Eye className="w-3.5 h-3.5" /> 查看
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-base">AI智能洞察</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {insights.map((ins, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                ins.type === "warning"
                  ? "bg-gov-orange/5 text-gov-orange"
                  : ins.type === "success"
                  ? "bg-gov-green/5 text-gov-green"
                  : "bg-gov-blue/5 text-gov-blue"
              }`}
            >
              {ins.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              ) : ins.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              ) : (
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              )}
              <span>{ins.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Flow */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">使用流程</h3>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i === flowSteps.length - 1 ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}>
                  {i + 1}
                </div>
                <span className="text-sm text-foreground">{step}</span>
              </div>
              {i < flowSteps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PolicyEvaluation;
