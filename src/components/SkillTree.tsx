
import { useState, useRef, useEffect } from "react";
import SkillNode, { Skill } from "./SkillNode";
import SkillDetail from "./SkillDetail";

// Sample skill data
const sampleSkills: Skill[] = [
  {
    id: "html-basics",
    title: "HTML Basics",
    category: "Frontend",
    level: "beginner",
    status: "completed",
    progress: 100,
    description: "Learn the fundamentals of HTML markup and document structure",
    prerequisites: [],
    projects: ["Personal Portfolio", "Simple Blog"],
    estimatedHours: 8,
  },
  {
    id: "css-basics",
    title: "CSS Basics",
    category: "Frontend",
    level: "beginner",
    status: "completed",
    progress: 100,
    description: "Master CSS styling, layouts, and responsive design",
    prerequisites: ["html-basics"],
    projects: ["Styled Portfolio", "CSS Art"],
    estimatedHours: 12,
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    category: "Frontend",
    level: "beginner",
    status: "in-progress",
    progress: 65,
    description: "Learn core JavaScript concepts, variables, functions, and DOM manipulation",
    prerequisites: ["html-basics", "css-basics"],
    projects: ["Interactive Calculator", "Todo App"],
    estimatedHours: 20,
  },
  {
    id: "react-basics",
    title: "React Basics",
    category: "Frontend",
    level: "intermediate",
    status: "available",
    progress: 0,
    description: "Build dynamic user interfaces with React components and hooks",
    prerequisites: ["javascript-fundamentals"],
    projects: ["Weather App", "Shopping Cart"],
    estimatedHours: 25,
  },
  {
    id: "nodejs-basics",
    title: "Node.js Basics",
    category: "Backend",
    level: "intermediate",
    status: "locked",
    progress: 0,
    description: "Server-side JavaScript with Node.js and Express",
    prerequisites: ["javascript-fundamentals"],
    projects: ["REST API", "Chat Application"],
    estimatedHours: 18,
  },
  {
    id: "database-design",
    title: "Database Design",
    category: "Backend",
    level: "intermediate",
    status: "locked",
    progress: 0,
    description: "Design and work with relational and NoSQL databases",
    prerequisites: ["nodejs-basics"],
    projects: ["Blog Database", "E-commerce Schema"],
    estimatedHours: 15,
  },
];

const SkillTree = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skills] = useState<Skill[]>(sampleSkills);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple positioning algorithm for demo
  const getSkillPosition = (skill: Skill, index: number) => {
    const centerX = 400;
    const centerY = 300;
    
    // Create a simple tree layout
    const angles = [0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3];
    const radius = 120 + (index % 3) * 80;
    const angle = angles[index % angles.length] + (Math.floor(index / 6) * Math.PI / 6);
    
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    };
  };

  // Draw connections between related skills
  const drawConnections = () => {
    return skills.map((skill, index) => {
      return skill.prerequisites.map((prereqId) => {
        const prereqIndex = skills.findIndex(s => s.id === prereqId);
        if (prereqIndex === -1) return null;

        const fromPos = getSkillPosition(skills[prereqIndex], prereqIndex);
        const toPos = getSkillPosition(skill, index);

        return (
          <line
            key={`${prereqId}-${skill.id}`}
            x1={fromPos.x}
            y1={fromPos.y}
            x2={toPos.x}
            y2={toPos.y}
            stroke="#e5e7eb"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="transition-all duration-300"
          />
        );
      });
    }).flat().filter(Boolean);
  };

  return (
    <div className="flex h-full">
      {/* Skill Tree Canvas */}
      <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-slate-50 to-indigo-50">
        <div
          ref={containerRef}
          className="w-full h-full relative"
          style={{ minHeight: "600px" }}
        >
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {drawConnections()}
          </svg>

          {/* Skill Nodes */}
          {skills.map((skill, index) => (
            <SkillNode
              key={skill.id}
              skill={skill}
              position={getSkillPosition(skill, index)}
              onClick={setSelectedSkill}
              isSelected={selectedSkill?.id === skill.id}
            />
          ))}

          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Skill Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-green-600"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                <span>Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Detail Panel */}
      {selectedSkill && (
        <div className="w-96 bg-white border-l border-gray-200 shadow-lg">
          <SkillDetail 
            skill={selectedSkill} 
            onClose={() => setSelectedSkill(null)}
          />
        </div>
      )}
    </div>
  );
};

export default SkillTree;
