import { useState } from "react";
import ColoredButton from "../common/ColoredButton";

export default function Simulation() {
  const [handleStage, setHandleStage] = useState<
    "initial" | "capture" | "execute"
  >("initial");
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState<object | null>(null);
  function openCamera() {
    setHandleStage("capture");
  }
  function captureCamera() {
    setHandleStage("execute");
  }
  function openGallery() {
    setHandleStage("initial");
  }
  function retakeImage() {
    setHandleStage("capture");
    setScanResult(null);
  }
  function scanImage() {
    console.log("running...");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setScanResult({ success: true, result: ["...", "...", "..."] });
    }, 3000);
  }
  return (
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row justify-center">
        <div className="w-full sm:w-6/12 lg:w-4/12 aspect-square rounded-lg bg-gray-200 animate-pulse grid place-items-center">
          {handleStage}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full sm:w-6/12 lg:w-4/12 flex flex-col">
          {(handleStage === "execute" || handleStage === "capture") && (
            <span
              onClick={handleStage === "execute" ? retakeImage : openGallery}
              className="text-xs underline text-right cursor-pointer text-blue-500"
            >
              {handleStage === "execute"
                ? "Retake image"
                : "Open from file system"}
            </span>
          )}
          <div className="mt-2">
            {handleStage === "initial" ? (
              <>
                <ColoredButton onClick={openGallery} pink>
                  Use Gallery
                </ColoredButton>
                <ColoredButton onClick={openCamera} yellow>
                  Use Camera
                </ColoredButton>
              </>
            ) : handleStage === "capture" ? (
              <ColoredButton onClick={captureCamera} blue>
                Capture
              </ColoredButton>
            ) : (
              <>
                <div
                  className={`w-full ${
                    scanResult || loading ? "py-2" : ""
                  } text-center text-xs overflow-y-auto`}
                >
                  {loading
                    ? "Executing..."
                    : scanResult && Object.keys(scanResult).length === 0
                    ? ""
                    : scanResult
                    ? JSON.stringify(scanResult)
                    : ""}
                </div>
                <ColoredButton onClick={!scanResult ? scanImage : null}>
                  {loading && (
                    <span className="block w-4 h-4 rounded-full border-2 border-t-gray-400 animate-spin"></span>
                  )}
                  {!loading ? "Execute" : ""}
                </ColoredButton>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
