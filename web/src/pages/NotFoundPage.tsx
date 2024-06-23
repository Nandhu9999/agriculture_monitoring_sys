import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col">
      <span>NotFoundPage</span>
      <Link to={"/"}>Go back to Home</Link>
    </div>
  );
}
