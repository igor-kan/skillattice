
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = {
    skillsCompleted: 3,
    skillsInProgress: 2,
    totalSkills: 12,
    totalHours: 45,
    certificates: 1,
    currentStreak: 7,
  };

  const recentActivity = [
    { id: 1, type: "completed", skill: "HTML Basics", time: "2 hours ago" },
    { id: 2, type: "started", skill: "JavaScript Fundamentals", time: "1 day ago" },
    { id: 3, type: "project", skill: "CSS Basics", project: "Portfolio Website", time: "2 days ago" },
    { id: 4, type: "certificate", skill: "Frontend Foundations", time: "1 week ago" },
  ];

  const currentGoals = [
    { title: "Complete JavaScript Fundamentals", progress: 65, target: "End of month" },
    { title: "Build 3 Portfolio Projects", progress: 33, target: "Next 2 weeks" },
    { title: "Earn Frontend Certificate", progress: 80, target: "End of quarter" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed": return "✅";
      case "started": return "🚀";
      case "project": return "🛠️";
      case "certificate": return "🏆";
      default: return "📚";
    }
  };

  const overallProgress = Math.round((stats.skillsCompleted / stats.totalSkills) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome back to SkillForge
          </h1>
          <p className="text-gray-600 text-lg">
            Continue your learning journey and unlock new skills
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription>Overall Progress</CardDescription>
              <CardTitle className="text-3xl text-indigo-600">{overallProgress}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallProgress} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                {stats.skillsCompleted} of {stats.totalSkills} skills completed
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription>Learning Time</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.totalHours}h</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Total time invested</p>
              <p className="text-xs text-green-600 mt-1">+8h this week</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription>Current Streak</CardDescription>
              <CardTitle className="text-3xl text-orange-600">{stats.currentStreak}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Days learning</p>
              <p className="text-xs text-orange-600 mt-1">🔥 Keep it up!</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardDescription>Certificates</CardDescription>
              <CardTitle className="text-3xl text-purple-600">{stats.certificates}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Earned this month</p>
              <p className="text-xs text-purple-600 mt-1">2 more in progress</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Goals */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Current Goals</span>
              </CardTitle>
              <CardDescription>Track your progress towards learning objectives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentGoals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-900">{goal.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {goal.target}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress value={goal.progress} className="h-2" />
                    <p className="text-xs text-gray-600">{goal.progress}% complete</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>📈</span>
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your latest learning milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="text-lg">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.skill}
                    </p>
                    {activity.project && (
                      <p className="text-xs text-gray-600">{activity.project}</p>
                    )}
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>Jump into your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">🌳</div>
                <h4 className="font-medium text-gray-900">Explore Skill Tree</h4>
                <p className="text-sm text-gray-600">Discover new learning paths</p>
              </div>
              <div className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="font-medium text-gray-900">AI Curriculum</h4>
                <p className="text-sm text-gray-600">Generate custom learning plan</p>
              </div>
              <div className="p-4 border border-blue-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">🛠️</div>
                <h4 className="font-medium text-gray-900">Start Project</h4>
                <p className="text-sm text-gray-600">Build something amazing</p>
              </div>
              <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 cursor-pointer transition-colors">
                <div className="text-2xl mb-2">👥</div>
                <h4 className="font-medium text-gray-900">Join Community</h4>
                <p className="text-sm text-gray-600">Connect with learners</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
