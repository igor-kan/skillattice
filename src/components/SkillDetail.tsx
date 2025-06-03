
import { Skill } from "./SkillNode";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SkillDetailProps {
  skill: Skill;
  onClose: () => void;
}

const SkillDetail = ({ skill, onClose }: SkillDetailProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "available":
        return "bg-purple-100 text-purple-800";
      case "locked":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{skill.title}</h2>
            <div className="flex items-center space-x-2 mb-3">
              <Badge className={getLevelColor(skill.level)}>
                {skill.level}
              </Badge>
              <Badge className={getStatusColor(skill.status)}>
                {skill.status.replace("-", " ")}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm">{skill.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-4"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        {skill.status === "in-progress" && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-2" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-indigo-600">
              {skill.estimatedHours}h
            </div>
            <div className="text-sm text-gray-600">Estimated Time</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">
              {skill.projects.length}
            </div>
            <div className="text-sm text-gray-600">Projects</div>
          </div>
        </div>

        {/* Prerequisites */}
        {skill.prerequisites.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Prerequisites</h3>
            <div className="space-y-2">
              {skill.prerequisites.map((prereq) => (
                <div
                  key={prereq}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                  <span>{prereq.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Projects</h3>
          <div className="space-y-3">
            {skill.projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <h4 className="font-medium text-gray-900">{project}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Apply your {skill.title} skills in a real-world project
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              <span>📺</span>
              <span>Video Tutorial Series</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              <span>📖</span>
              <span>Interactive Documentation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              <span>💻</span>
              <span>Code Examples</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
              <span>🧪</span>
              <span>Practice Exercises</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 space-y-3">
        {skill.status === "available" && (
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
            Start Learning
          </Button>
        )}
        {skill.status === "in-progress" && (
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Continue Learning
          </Button>
        )}
        {skill.status === "completed" && (
          <Button variant="outline" className="w-full">
            Review & Practice
          </Button>
        )}
        {skill.status === "locked" && (
          <Button disabled className="w-full">
            Complete Prerequisites First
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillDetail;
