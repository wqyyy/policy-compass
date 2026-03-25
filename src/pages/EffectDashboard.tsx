import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, FileText, BookOpen, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { dashboardData } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";

const COLORS = [
  "hsl(350,85%,42%)", "hsl(210,70%,45%)", "hsl(38,90%,55%)",
  "hsl(145,60%,42%)", "hsl(25,90%,55%)", "hsl(280,60%,50%)"
];

type TabType = "redeem" | "publish";

const EffectDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("redeem");
  const [itemSubTab, setItemSubTab] = useState(0);
  const [fundSubTab, setFundSubTab] = useState(0);
  const [entSubTab, setEntSubTab] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent to-background">
      {/* Header Banner */}
      <div className="gov-gradient text-primary-foreground py-4 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)"
        }} />
        <h1 className="text-2xl font-bold relative z-10">北京市经开区政策兑现效果看板</h1>
        <p className="text-sm opacity-80 relative z-10 mt-1">- 惠 企 政 策 大 脑 -</p>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">日期</span>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            请选择月份
          </Button>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 border-primary/30 text-primary">
          <Bot className="w-4 h-4" /> AI 智能助手
        </Button>
      </div>

      <div className="px-6 pb-24">
        {activeTab === "redeem" ? (
          <RedeemView
            itemSubTab={itemSubTab} setItemSubTab={setItemSubTab}
            fundSubTab={fundSubTab} setFundSubTab={setFundSubTab}
            entSubTab={entSubTab} setEntSubTab={setEntSubTab}
          />
        ) : (
          <PublishView />
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* AI Assistant */}
        <div className="absolute right-6 -top-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg text-xs font-bold">
          AI
        </div>
        <div className="bg-card border-t border-border">
          <p className="text-center text-xs text-muted-foreground py-1.5">Hi~我是亦智政务大模型平台服务助手小亦</p>
          <div className="flex">
            <button
              onClick={() => setActiveTab("publish")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === "publish"
                  ? "text-primary border-b-2 border-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <FileText className="w-4 h-4" /> 政策发布情况
            </button>
            <button
              onClick={() => setActiveTab("redeem")}
              className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                activeTab === "redeem"
                  ? "text-primary border-b-2 border-primary bg-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CheckCircle className="w-4 h-4" /> 政策兑现情况
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==================== 政策兑现情况 ==================== */
function RedeemView({
  itemSubTab, setItemSubTab,
  fundSubTab, setFundSubTab,
  entSubTab, setEntSubTab,
}: {
  itemSubTab: number; setItemSubTab: (v: number) => void;
  fundSubTab: number; setFundSubTab: (v: number) => void;
  entSubTab: number; setEntSubTab: (v: number) => void;
}) {
  const { redeemedItems, redeemedFunds, supportedEnterprises } = dashboardData;

  const itemTabs = ["近六年兑现事项数量", "所选年度兑现事项数量", "兑现事项扶持领域分布"];
  const fundTabs = ["近六年兑现资金统计", "所选年度兑资金统计", "兑现资金扶持领域分布"];
  const entTabs = ["近六年扶持企业数量", "所选年度扶持企业数量", "扶持企业注册资本分布"];

  return (
    <div className="space-y-4">
      {/* Top 3 analysis cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 已兑现事项分析 */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-primary mb-3">已兑现事项分析</h3>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <MiniDonut data={redeemedItems.byType} colors={COLORS} label="事项类型" />
              </div>
              <div className="flex-1">
                <MiniDonut data={redeemedItems.byStatus} colors={COLORS.slice(1)} label="兑现状态" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">● 已兑现事项数量统计</div>
            <SubTabs tabs={itemTabs} active={itemSubTab} onChange={setItemSubTab} />
            <div className="h-[180px] mt-2">
              {itemSubTab === 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={redeemedItems.yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" name="兑现数量" stroke="hsl(350,85%,42%)" strokeWidth={2} dot={{ fill: "hsl(350,85%,42%)", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {itemSubTab === 1 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={redeemedItems.yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" name="兑现数量" fill="hsl(350,85%,42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {itemSubTab === 2 && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={redeemedItems.byField} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value" nameKey="name" label={({ name }) => name}>
                      {redeemedItems.byField.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 已兑现资金分析 */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-primary mb-2">已兑现资金分析</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground">本月已拨付资金</span>
              <span className="text-xl font-bold text-foreground">{redeemedFunds.totalMonthly.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">万元</span>
            </div>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                {/* Department bar */}
                <div className="space-y-1">
                  {redeemedFunds.byDepartment.slice(0, 5).map((d) => (
                    <div key={d.name} className="flex items-center gap-1 text-[10px]">
                      <span className="w-24 truncate text-muted-foreground">{d.name}</span>
                      <div className="flex-1 bg-muted rounded h-2">
                        <div className="h-2 rounded bg-primary" style={{ width: `${(d.amount / 232968) * 100}%` }} />
                      </div>
                      <span className="text-muted-foreground w-16 text-right">{d.amount.toFixed(0)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-24">
                <MiniDonut data={redeemedFunds.byStatus} colors={COLORS} label="状态" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">● 已兑现资金情况统计</div>
            <SubTabs tabs={fundTabs} active={fundSubTab} onChange={setFundSubTab} />
            <div className="h-[180px] mt-2">
              {fundSubTab === 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={redeemedFunds.yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" name="兑现资金金额" stroke="hsl(350,85%,42%)" strokeWidth={2} dot={{ fill: "hsl(350,85%,42%)", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {fundSubTab === 1 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={redeemedFunds.yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" name="兑现资金" fill="hsl(350,85%,42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {fundSubTab === 2 && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={redeemedFunds.byField} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value" nameKey="name" label={({ name }) => name}>
                      {redeemedFunds.byField.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 扶持企业情况 */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-primary mb-2">扶持企业情况</h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-muted-foreground">扶持企业数</span>
              <span className="text-xl font-bold text-foreground">{supportedEnterprises.total.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">家</span>
            </div>
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <MiniDonut data={supportedEnterprises.byScale} colors={COLORS} label="企业规模" />
              </div>
              <div className="flex-1">
                <MiniDonut data={supportedEnterprises.byIndustry} colors={COLORS.slice(2)} label="行业分布" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-2">● 已扶持企业情况统计</div>
            <SubTabs tabs={entTabs} active={entSubTab} onChange={setEntSubTab} />
            <div className="h-[180px] mt-2">
              {entSubTab === 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={supportedEnterprises.yearlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" name="年度扶持企业数量" stroke="hsl(350,85%,42%)" strokeWidth={2} dot={{ fill: "hsl(350,85%,42%)", r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
              {entSubTab === 1 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={supportedEnterprises.yearlyCount}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="value" name="企业数量" fill="hsl(350,85%,42%)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
              {entSubTab === 2 && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={supportedEnterprises.capitalDistribution} cx="50%" cy="50%" innerRadius={30} outerRadius={60} dataKey="value" nameKey="name" label={({ name }) => name}>
                      {supportedEnterprises.capitalDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ==================== 政策发布情况 ==================== */
function PublishView() {
  const { departmentStats, policyPublished, policyInterpreted, itemsPublished, policyByLevel, itemFlow } = dashboardData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-4">
      {/* Left: Department Chart */}
      <Card className="border-primary/20">
        <CardContent className="p-4">
          <h3 className="text-base font-bold text-primary mb-3">部门发布情况</h3>
          <div className="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> 各部门事项发布数量</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-gov-orange inline-block" /> 各部门政策发布数量</span>
          </div>
          <ResponsiveContainer width="100%" height={520}>
            <BarChart data={departmentStats} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={90} />
              <Tooltip />
              <Bar dataKey="published" name="政策发布数" fill="hsl(350,85%,42%)" radius={[0, 3, 3, 0]} barSize={8} />
              <Bar dataKey="items" name="事项发布数" fill="hsl(25,90%,55%)" radius={[0, 3, 3, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Middle: Stats + Policy levels */}
      <div className="space-y-4 min-w-[320px]">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "政策发布", value: policyPublished, unit: "条", icon: FileText, color: "text-primary" },
            { label: "政策解读", value: policyInterpreted, unit: "条", icon: BookOpen, color: "text-gov-blue" },
            { label: "事项发布", value: itemsPublished, unit: "项", icon: CheckCircle, color: "text-gov-green" },
          ].map((s) => (
            <Card key={s.label} className="text-center p-4">
              <s.icon className={`w-8 h-8 mx-auto mb-2 ${s.color}`} />
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold text-foreground">{s.value}<span className="text-sm font-normal text-muted-foreground ml-1">{s.unit}</span></p>
            </Card>
          ))}
        </div>

        {/* Policy by level */}
        <Card className="border-primary/20">
          <CardContent className="p-4">
            <h3 className="text-base font-bold text-primary mb-4">兑现相关政策发布数量</h3>
            <div className="grid grid-cols-3 gap-4">
              {policyByLevel.map((p, i) => (
                <div key={p.level} className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <span className="w-2 h-2 bg-primary rounded-sm" />
                    <span className="text-lg font-bold text-foreground">{p.count}</span>
                    <span className="text-xs text-muted-foreground">条</span>
                  </div>
                  <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary opacity-60" />
                  </div>
                  <Badge variant="outline" className="bg-gradient-to-r from-primary/80 to-primary text-primary-foreground border-0 px-4 py-1">
                    {p.level}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Item flow */}
      <Card className="border-primary/20 min-w-[160px]">
        <CardContent className="p-4">
          <h3 className="text-base font-bold text-primary mb-4">事项流转情况</h3>
          <div className="space-y-4">
            {[
              { label: "申报中", value: itemFlow.applying, unit: "项" },
              { label: "申报已截止", value: itemFlow.expired, unit: "项", highlight: true },
              { label: "已确认扶持结果", value: itemFlow.confirmed, unit: "项" },
              { label: "已兑现", value: itemFlow.redeemed, unit: "项", highlight: true },
            ].map((f) => (
              <div key={f.label} className="text-center p-3 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">{f.label}</p>
                <p className={`text-xl font-bold ${f.highlight ? "text-primary" : "text-foreground"}`}>
                  {f.value}<span className="text-xs font-normal text-muted-foreground ml-0.5">{f.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ==================== Shared Components ==================== */
function SubTabs({ tabs, active, onChange }: { tabs: string[]; active: number; onChange: (i: number) => void }) {
  return (
    <div className="flex gap-1 flex-wrap">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => onChange(i)}
          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
            active === i
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function MiniDonut({ data, colors, label }: { data: { name: string; value: number }[]; colors: string[]; label: string }) {
  return (
    <div className="h-[100px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={20} outerRadius={38} dataKey="value" nameKey="name" strokeWidth={1}>
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EffectDashboard;
