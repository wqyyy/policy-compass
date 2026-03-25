import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, FileText, BookOpen, ClipboardList } from "lucide-react";
import { dashboardData } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["hsl(350,85%,42%)", "hsl(210,70%,45%)", "hsl(38,90%,55%)", "hsl(145,60%,42%)", "hsl(25,90%,55%)"];

const statCards = [
  { title: "政策发布数", value: dashboardData.policyPublished, icon: FileText, color: "text-primary" },
  { title: "政策解读数", value: dashboardData.policyInterpreted, icon: BookOpen, color: "text-gov-blue" },
  { title: "事项发布数", value: dashboardData.itemsPublished, icon: ClipboardList, color: "text-gov-green" },
];

const EffectDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">兑现效果看板</h1>
          <p className="text-sm text-muted-foreground mt-1">政策实施效果评估与智能分析</p>
        </div>
        <Button variant="outline" className="gap-1.5 border-primary/30 text-primary">
          <Bot className="w-4 h-4" /> 智能问数
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <Card key={s.title} className="p-5">
            <div className="flex items-center gap-3">
              <s.icon className={`w-8 h-8 ${s.color}`} />
              <div>
                <p className="text-sm text-muted-foreground">{s.title}</p>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">部门发布情况</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={dashboardData.departmentStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
                <Tooltip />
                <Legend />
                <Bar dataKey="published" name="发布数" fill="hsl(350,85%,42%)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="interpreted" name="解读数" fill="hsl(210,70%,45%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Policy Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">兑现相关政策分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={dashboardData.policyDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" nameKey="name" label={({ name, value }) => `${name} ${value}%`}>
                  {dashboardData.policyDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Item Transitions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">事项流转趋势</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.itemTransitions}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="submitted" name="提交" stroke="hsl(350,85%,42%)" strokeWidth={2} />
              <Line type="monotone" dataKey="reviewing" name="审核中" stroke="hsl(210,70%,45%)" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" name="已通过" stroke="hsl(38,90%,55%)" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" name="已兑现" stroke="hsl(145,60%,42%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default EffectDashboard;
