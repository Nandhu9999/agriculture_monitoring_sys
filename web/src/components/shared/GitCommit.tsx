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
  }, []);
  if (Object.keys(gitCommitMsg).length === 0) return null;
  return (
    <footer className="h-20 absolute bottom-0 flex items-center">
      <span className="p-1 bg-gray-200 flex items-center gap-2 rounded-lg border-2 border-gray-300 text-xs">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          className="h-4 w-4"
        />
        <span>{gitCommitMsg?.sha?.substring(0, 7)}</span>
        <span>|</span>
        <span className="text-xs">{gitCommitMsg?.message}</span>
      </span>
    </footer>
  );
}
