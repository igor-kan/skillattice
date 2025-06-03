
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SkillRisk } from "./AutomationRiskAnalyzer";

interface FutureProofSuggestionsProps {
  skill: SkillRisk;
}

const FutureProofSuggestions = ({ skill }: FutureProofSuggestionsProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="p-6 sticky top-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{skill.name}</h3>
          <div className="flex items-center space-x-2 mb-3">
            <Badge variant="secondary">{skill.category}</Badge>
            <span className={`font-bold ${getRiskColor(skill.riskLevel)}`}>
              {skill.riskScore}% Risk
            </span>
          </div>
          <p className="text-gray-600 text-sm">{skill.description}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">🤖 Automation Factors</h4>
          <ul className="space-y-1">
            {skill.automationFactors.map((factor, index) => (
              <li key={index} className="text-sm text-red-600 flex items-start">
                <span className="mr-2">•</span>
                {factor}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">💪 Human Advantages</h4>
          <ul className="space-y-1">
            {skill.humanAdvantages.map((advantage, index) => (
              <li key={index} className="text-sm text-green-600 flex items-start">
                <span className="mr-2">•</span>
                {advantage}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">📈 Market Trends</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Current Demand:</span>
              <span className={`font-medium ${
                skill.trends.currentDemand === "rising" ? "text-green-600" :
                skill.trends.currentDemand === "stable" ? "text-blue-600" : "text-red-600"
              }`}>
                {skill.trends.currentDemand}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Future Outlook:</span>
              <span className={`font-medium ${
                skill.trends.futureOutlook === "positive" ? "text-green-600" :
                skill.trends.futureOutlook === "neutral" ? "text-blue-600" : "text-red-600"
              }`}>
                {skill.trends.futureOutlook}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">💼 Related Jobs</h4>
          <div className="flex flex-wrap gap-1">
            {skill.relatedJobs.map((job, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {job}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-800 mb-2">🚀 Future-Proof Suggestions</h4>
          <ul className="space-y-2">
            {skill.suggestions.map((suggestion, index) => (
              <li key={index} className="text-sm">
                <Button variant="ghost" size="sm" className="w-full justify-start h-auto p-2">
                  <span className="text-left">{suggestion}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
          Add to Learning Path
        </Button>
      </div>
    </Card>
  );
};

export default FutureProofSuggestions;
