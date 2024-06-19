import { useParams } from "react-router-dom";

export default function ModulesItem() {
  const { moduleId } = useParams();
  console.log(moduleId);
  return <div>ModuleItem: {moduleId}</div>;
}
