import { useEffect, useState } from "react";
import { getLatestCommit } from "../../services/api";

export default function GitCommit() {
  const [gitCommitMsg, setGitCommitMsg] = useState<any>({});

  async function callGetLatestCommit(user: string, repo: string) {
    const response = await getLatestCommit(user, repo);
    setGitCommitMsg(response);
  }

  useEffect(() => {
    callGetLatestCommit("Nandhu9999", "Nandhu9999/agriculture_monitoring_sys");
  });
  if (!gitCommitMsg.sha) return null;
  return (
    <footer className="h-20 absolute bottom-0 flex items-center">
      <span className="p-1 bg-gray-200 rounded-lg border-2 border-gray-300">
        {"" + gitCommitMsg?.sha?.substring(0, 7)}
        <span className="text-sm">{" | " + gitCommitMsg?.message}</span>
      </span>
    </footer>
  );
}
