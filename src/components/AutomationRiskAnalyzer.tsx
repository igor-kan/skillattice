
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SkillRiskCard from "./SkillRiskCard";
import RiskCategoryFilter from "./RiskCategoryFilter";
import FutureProofSuggestions from "./FutureProofSuggestions";

export interface SkillRisk {
  id: string;
  name: string;
  category: "technical" | "creative" | "social" | "manual" | "analytical";
  riskLevel: "low" | "medium" | "high";
  riskScore: number; // 0-100
  description: string;
  automationFactors: string[];
  humanAdvantages: string[];
  trends: {
    currentDemand: "rising" | "stable" | "declining";
    futureOutlook: "positive" | "neutral" | "negative";
  };
  relatedJobs: string[];
  suggestions: string[];
}

const sampleSkillsData: SkillRisk[] = [
  {
    id: "emotional-intelligence",
    name: "Emotional Intelligence",
    category: "social",
    riskLevel: "low",
    riskScore: 15,
    description: "Understanding and managing emotions in yourself and others",
    automationFactors: ["Basic emotion detection in text/voice"],
    humanAdvantages: ["Complex empathy", "Cultural context", "Nuanced relationship building"],
    trends: {
      currentDemand: "rising",
      futureOutlook: "positive"
    },
    relatedJobs: ["Therapist", "HR Manager", "Sales Manager", "Teacher"],
    suggestions: ["Leadership Training", "Conflict Resolution", "Cross-Cultural Communication"]
  },
  {
    id: "creative-writing",
    name: "Creative Writing",
    category: "creative",
    riskLevel: "medium",
    riskScore: 45,
    description: "Original storytelling and content creation",
    automationFactors: ["AI content generation", "Template-based writing"],
    humanAdvantages: ["Unique voice", "Personal experiences", "Cultural authenticity"],
    trends: {
      currentDemand: "stable",
      futureOutlook: "neutral"
    },
    relatedJobs: ["Author", "Content Creator", "Copywriter", "Journalist"],
    suggestions: ["Interactive Storytelling", "Brand Voice Development", "Video Scriptwriting"]
  },
  {
    id: "data-entry",
    name: "Data Entry",
    category: "technical",
    riskLevel: "high",
    riskScore: 85,
    description: "Manual input and processing of structured data",
    automationFactors: ["OCR technology", "API integrations", "Automated data pipelines"],
    humanAdvantages: ["Complex judgment calls", "Error detection"],
    trends: {
      currentDemand: "declining",
      futureOutlook: "negative"
    },
    relatedJobs: ["Data Entry Clerk", "Administrative Assistant"],
    suggestions: ["Data Analysis", "Database Management", "Process Automation"]
  },
  {
    id: "strategic-thinking",
    name: "Strategic Thinking",
    category: "analytical",
    riskLevel: "low",
    riskScore: 20,
    description: "Long-term planning and complex decision making",
    automationFactors: ["Predictive analytics", "Scenario modeling"],
    humanAdvantages: ["Intuition", "Risk assessment", "Stakeholder considerations"],
    trends: {
      currentDemand: "rising",
      futureOutlook: "positive"
    },
    relatedJobs: ["CEO", "Strategy Consultant", "Product Manager", "Military Officer"],
    suggestions: ["Systems Thinking", "Scenario Planning", "Business Intelligence"]
  },
  {
    id: "manual-craftsmanship",
    name: "Manual Craftsmanship",
    category: "manual",
    riskLevel: "low",
    riskScore: 25,
    description: "Skilled manual creation and repair work",
    automationFactors: ["3D printing", "Robotic assembly"],
    humanAdvantages: ["Artistic touch", "Problem-solving", "Custom solutions"],
    trends: {
      currentDemand: "stable",
      futureOutlook: "positive"
    },
    relatedJobs: ["Carpenter", "Chef", "Mechanic", "Artist"],
    suggestions: ["Digital Design Integration", "Custom Manufacturing", "Repair Specialization"]
  },
  {
    id: "basic-coding",
    name: "Basic Coding",
    category: "technical",
    riskLevel: "medium",
    riskScore: 55,
    description: "Simple programming and scripting tasks",
    automationFactors: ["Code generation AI", "No-code platforms", "Automated testing"],
    humanAdvantages: ["Complex problem solving", "Architecture decisions", "Code review"],
    trends: {
      currentDemand: "stable",
      futureOutlook: "neutral"
    },
    relatedJobs: ["Junior Developer", "Automation Engineer", "QA Tester"],
    suggestions: ["System Architecture", "AI/ML Engineering", "DevOps", "Product Management"]
  }
];

const AutomationRiskAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSkill, setSelectedSkill] = useState<SkillRisk | null>(null);

  const filteredSkills = sampleSkillsData.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSkillAnalysis = () => {
    if (searchQuery && !filteredSkills.some(skill => 
      skill.name.toLowerCase() === searchQuery.toLowerCase())) {
      // Simulate AI analysis for custom skill
      const aiAnalysis: SkillRisk = {
        id: "custom-analysis",
        name: searchQuery,
        category: "technical",
        riskLevel: "medium",
        riskScore: Math.floor(Math.random() * 100),
        description: `AI analysis of ${searchQuery}`,
        automationFactors: ["AI and automation capabilities", "Pattern recognition"],
        humanAdvantages: ["Creative problem-solving", "Context understanding"],
        trends: {
          currentDemand: "stable",
          futureOutlook: "neutral"
        },
        relatedJobs: ["Various roles"],
        suggestions: ["Enhance with AI collaboration", "Focus on strategic aspects"]
      };
      setSelectedSkill(aiAnalysis);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI-Proof Skills Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover which skills will survive the AI revolution and how to future-proof your career
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for any skill or job (e.g., 'graphic design', 'project management')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSkillAnalysis()}
              />
            </div>
            <Button onClick={handleSkillAnalysis} className="bg-indigo-600 hover:bg-indigo-700">
              Analyze Risk
            </Button>
          </div>

          <RiskCategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skills Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((skill) => (
                <SkillRiskCard
                  key={skill.id}
                  skill={skill}
                  onClick={() => setSelectedSkill(skill)}
                  isSelected={selectedSkill?.id === skill.id}
                />
              ))}
            </div>
          </div>

          {/* Detailed Analysis Panel */}
          <div className="lg:col-span-1">
            {selectedSkill ? (
              <FutureProofSuggestions skill={selectedSkill} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Select a skill to see detailed analysis
                </h3>
                <p className="text-gray-600">
                  Click on any skill card to see automation risk factors, human advantages, 
                  and suggestions for future-proofing your career.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationRiskAnalyzer;
