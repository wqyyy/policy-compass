import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, Award, ScrollText, Wallet, Building2, ClipboardList, ArrowRight, Database, Brain, ChartBar, FileOutput, Send, Search, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { overviewStats } from "@/data/mockData";

const modules = [
  {
    title: "政策兑现专报",
    description: "对政策兑现整体态势、已兑现事项分布、资金分布、企业分布四维度分析，结合可视化图表，为政策优化提供量化依据。",
    icon: FileText,
    path: "/policy-report",
    color: "bg-primary",
    flow: [
      { icon: Database, label: "数据采集" },
      { icon: ChartBar, label: "分类统计" },
      { icon: Brain, label: "AI分析" },
      { icon: FileOutput, label: "生成专报" },
    ],
  },
  {
    title: "兑现效果看板",
    description: "为政务部门提供直观、自动化的工具，评估政策实施效果，优化政策设计，内置数字人实现智能问数。",
    icon: BarChart3,
    path: "/effect-dashboard",
    color: "bg-gov-blue",
    flow: [
      { icon: Send, label: "数据汇聚" },
      { icon: ChartBar, label: "指标计算" },
      { icon: Search, label: "智能问数" },
      { icon: BarChart3, label: "效果展示" },
    ],
  },
  {
    title: "企业评优",
    description: "针对\"择优奖励\"申报事项，通过智能评分模块，根据企业标签设定权重，综合评分择优推荐。",
    icon: Award,
    path: "/enterprise-evaluation",
    color: "bg-gov-gold",
    flow: [
      { icon: ClipboardList, label: "企业申报" },
      { icon: Star, label: "智能评分" },
      { icon: Award, label: "择优推荐" },
    ],
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">政策兑现总览</h1>
        <p className="text-sm text-muted-foreground mt-1">北京经济技术开发区惠企政策智能管理平台</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="政策总数" value={overviewStats.totalPolicies} suffix="项" icon={ScrollText} color="bg-primary" />
        <StatCard title="兑现资金总额" value={overviewStats.totalFunds} suffix="亿元" icon={Wallet} color="bg-gov-blue" />
        <StatCard title="扶持企业总数" value={overviewStats.totalEnterprises} suffix="家" icon={Building2} color="bg-gov-green" />
        <StatCard title="兑现事项数" value={overviewStats.totalItems} suffix="项" icon={ClipboardList} color="bg-gov-orange" />
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {modules.map((mod) => (
          <Card
            key={mod.title}
            className="gov-card-hover cursor-pointer group overflow-hidden"
            onClick={() => navigate(mod.path)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${mod.color} flex items-center justify-center`}>
                  <mod.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <CardTitle className="text-lg">{mod.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">{mod.description}</p>

              {/* Business Flow */}
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2 font-medium">智能化流程</p>
                <div className="flex items-center gap-1 flex-wrap">
                  {mod.flow.map((step, i) => (
                    <div key={step.label} className="flex items-center gap-1">
                      <div className="flex items-center gap-1 bg-card rounded px-2 py-1">
                        <step.icon className="w-3 h-3 text-primary" />
                        <span className="text-xs text-foreground">{step.label}</span>
                      </div>
                      {i < mod.flow.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="ghost" size="sm" className="text-primary group-hover:underline w-full justify-end gap-1">
                进入模块 <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom Flow */}
      <Card className="p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">政策兑现全流程闭环</h3>
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          {["政策制定", "政策发布", "企业申报", "审核评估", "资金拨付", "效果评价", "政策优化"].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${i === arr.length - 1 ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                  {i + 1}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{step}</span>
              </div>
              {i < arr.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Index;
