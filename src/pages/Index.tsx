import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, Award, ScrollText, Wallet, Building2, ClipboardList, ArrowRight, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { overviewStats } from "@/data/mockData";

const modules = [
  {
    title: "政策兑现专报",
    description: "系统经过数据分类与统计后，对政策的兑现整体态势、已兑现事项分布、已兑现资金分布、已扶持企业分布这四个维度展开分析",
    icon: FileText,
    path: "/policy-report",
    color: "bg-primary",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "border-l-primary",
    capabilities: ["兑现整体态势分析", "已兑现事项分布", "已兑现资金分布", "已扶持企业分布"],
  },
  {
    title: "兑现效果看板",
    description: "为政务部门提供一个直观、自动化的工具，用于评估政策实施效果、优化政策设计、提升政策执行效率",
    icon: BarChart3,
    path: "/effect-dashboard",
    color: "bg-gov-blue",
    iconBg: "bg-[hsl(210,70%,45%)]/10",
    iconColor: "text-[hsl(210,70%,45%)]",
    borderColor: "border-l-[hsl(210,70%,45%)]",
    capabilities: ["政策实施效果评估", "政策设计优化建议", "数字人智能问数", "自动化数据分析"],
  },
  {
    title: "企业评优",
    description: "在部分惠企政策的申报事项中，存在\"择优奖励\"的情况。通过智能评分模块实现对企业的自动评分",
    icon: Award,
    path: "/enterprise-evaluation",
    color: "bg-gov-gold",
    iconBg: "bg-[hsl(38,90%,55%)]/10",
    iconColor: "text-[hsl(38,90%,55%)]",
    borderColor: "border-l-[hsl(38,90%,55%)]",
    capabilities: ["智能自动评分", "企业标签权重设定", "综合评分排序", "择优推荐企业"],
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">政策兑现</h1>
        <p className="text-sm text-muted-foreground mt-1">以数据为支撑，全面评估政策兑现效果，推动政策持续优化与精准施策</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="政策总数" value={overviewStats.totalPolicies} suffix="项" icon={ScrollText} color="bg-primary" />
        <StatCard title="兑现资金总额" value={overviewStats.totalFunds} suffix="亿元" icon={Wallet} color="bg-gov-blue" />
        <StatCard title="扶持企业总数" value={overviewStats.totalEnterprises} suffix="家" icon={Building2} color="bg-gov-green" />
        <StatCard title="兑现事项数" value={overviewStats.totalItems} suffix="项" icon={ClipboardList} color="bg-gov-orange" />
      </div>

      {/* Module Cards - Horizontal Layout */}
      <div className="space-y-4">
        {modules.map((mod) => (
          <Card
            key={mod.title}
            className={`overflow-hidden border-l-4 ${mod.borderColor} hover:shadow-md transition-shadow`}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Icon & Title */}
              <div className="flex flex-col items-center justify-center p-6 md:p-8 md:w-56 shrink-0 bg-muted/30">
                <div className={`w-14 h-14 rounded-2xl ${mod.iconBg} flex items-center justify-center mb-3`}>
                  <mod.icon className={`w-7 h-7 ${mod.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{mod.title}</h3>
                <div className="flex items-center gap-1 mt-2">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs text-primary font-medium">AI智能分析</span>
                </div>
              </div>

              {/* Right: Description & Capabilities */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{mod.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-3">核心能力</p>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {mod.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40" />
                          <span className="text-sm text-muted-foreground">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-5 w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  onClick={() => navigate(mod.path)}
                >
                  进入功能 <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
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
