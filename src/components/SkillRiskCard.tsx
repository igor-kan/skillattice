
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillRisk } from "./AutomationRiskAnalyzer";

interface SkillRiskCardProps {
  skill: SkillRisk;
  onClick: () => void;
  isSelected: boolean;
}

const SkillRiskCard = ({ skill, onClick, isSelected }: SkillRiskCardProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technical":
        return "💻";
      case "creative":
        return "🎨";
      case "social":
        return "👥";
      case "manual":
        return "🔧";
      case "analytical":
        return "📊";
      default:
        return "🧠";
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score <= 30) return "text-green-600";
    if (score <= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card 
      className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? "ring-2 ring-indigo-500 shadow-lg" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getCategoryIcon(skill.category)}</span>
          <h3 className="font-semibold text-gray-800">{skill.name}</h3>
        </div>
        <Badge className={getRiskColor(skill.riskLevel)}>
          {skill.riskLevel} risk
        </Badge>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {skill.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Automation Risk</span>
          <span className={`font-bold ${getRiskScoreColor(skill.riskScore)}`}>
            {skill.riskScore}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              skill.riskScore <= 30 ? "bg-green-500" :
              skill.riskScore <= 60 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${skill.riskScore}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Demand</span>
          <span className={`font-medium ${
            skill.trends.currentDemand === "rising" ? "text-green-600" :
            skill.trends.currentDemand === "stable" ? "text-blue-600" : "text-red-600"
          }`}>
            {skill.trends.currentDemand === "rising" ? "↗️" :
             skill.trends.currentDemand === "stable" ? "→" : "↘️"} 
            {skill.trends.currentDemand}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default SkillRiskCard;
