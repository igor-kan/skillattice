
import { Button } from "@/components/ui/button";

interface RiskCategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "All Skills", icon: "🌟" },
  { id: "technical", label: "Technical", icon: "💻" },
  { id: "creative", label: "Creative", icon: "🎨" },
  { id: "social", label: "Social", icon: "👥" },
  { id: "manual", label: "Manual", icon: "🔧" },
  { id: "analytical", label: "Analytical", icon: "📊" },
];

const RiskCategoryFilter = ({ selectedCategory, onCategoryChange }: RiskCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="flex items-center space-x-1"
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default RiskCategoryFilter;
