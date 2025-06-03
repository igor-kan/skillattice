
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Skill {
  id: string;
  title: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  status: "locked" | "available" | "in-progress" | "completed";
  progress: number;
  description: string;
  prerequisites: string[];
  projects: string[];
  estimatedHours: number;
}

interface SkillNodeProps {
  skill: Skill;
  position: { x: number; y: number };
  onClick: (skill: Skill) => void;
  isSelected?: boolean;
}

const SkillNode = ({ skill, position, onClick, isSelected = false }: SkillNodeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getNodeColor = () => {
    switch (skill.status) {
      case "completed":
        return "from-green-400 to-green-600";
      case "in-progress":
        return "from-blue-400 to-blue-600";
      case "available":
        return "from-indigo-400 to-purple-600";
      case "locked":
        return "from-gray-300 to-gray-400";
      default:
        return "from-gray-300 to-gray-400";
    }
  };

  const getLevelIcon = () => {
    switch (skill.level) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "🌿";
      case "advanced":
        return "🌳";
      default:
        return "❓";
    }
  };

  return (
    <div
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
        isHovered ? "scale-110" : "scale-100",
        isSelected ? "z-20" : "z-10"
      )}
      style={{ left: position.x, top: position.y }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(skill)}
    >
      <div
        className={cn(
          "w-20 h-20 rounded-full cursor-pointer relative",
          "bg-gradient-to-br",
          getNodeColor(),
          "shadow-lg hover:shadow-xl transition-all duration-300",
          isSelected ? "ring-4 ring-yellow-400 ring-opacity-75" : "",
          skill.status === "locked" ? "opacity-60" : "opacity-100"
        )}
      >
        {/* Progress ring for in-progress skills */}
        {skill.status === "in-progress" && (
          <div className="absolute inset-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray={`${skill.progress}, 100`}
              />
            </svg>
          </div>
        )}

        {/* Level indicator */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-xs shadow-md">
          {getLevelIcon()}
        </div>

        {/* Skill content */}
        <div className="flex flex-col items-center justify-center h-full text-white text-center p-2">
          <div className="text-xs font-bold truncate w-full">{skill.title}</div>
          <div className="text-xs opacity-90">{skill.category}</div>
        </div>

        {/* Completion checkmark */}
        {skill.status === "completed" && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
            ✓
          </div>
        )}
      </div>

      {/* Hover tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-black bg-opacity-90 text-white text-xs rounded-lg shadow-lg min-w-48 z-30">
          <div className="font-semibold">{skill.title}</div>
          <div className="text-gray-300 mt-1">{skill.description}</div>
          <div className="text-gray-400 mt-1">⏱️ {skill.estimatedHours}h</div>
          <div className="text-gray-400">📁 {skill.projects.length} projects</div>
        </div>
      )}
    </div>
  );
};

export default SkillNode;
