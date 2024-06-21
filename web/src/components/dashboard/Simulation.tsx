import { useState } from "react";
import ColoredButton from "../common/ColoredButton";
import { scanUploadImage } from "../../services/api";

export default function Simulation() {
  const [handleStage, setHandleStage] = useState<
    "initial" | "capture" | "execute"
  >("initial");
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<object | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  function openCamera() {
    setHandleStage("capture");
  }
  function captureCamera() {
    setHandleStage("execute");
  }
  function openGallery() {
    setHandleStage("initial");
  }
  function fileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const previewObj = URL.createObjectURL(file);
      setPreviewUrl(previewObj);
      setSelectedFile(file);
      setHandleStage("execute");
    }
  }

  function retakeImage() {
    setHandleStage("capture");
    setScanResult(null);
    setPreviewUrl(null);
  }
  async function scanImage() {
    if (!selectedFile) return;

    setLoading(true);
    const response = await scanUploadImage(selectedFile);
    setLoading(false);
    setScanResult(response);
  }

  return (
    <div className="mx-auto">
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-6/12 lg:w-4/12 aspect-square rounded-lg bg-gray-200 grid place-items-center">
          {handleStage === "initial" && (
            <div className="flex flex-col items-center space-y-2 relative w-full h-full justify-center border-2 border-dashed border-gray-400 hover:border-blue-400 animate-pulse rounded-lg">
              <input
                type="file"
                onChange={fileInput}
                className="w-full h-full opacity-0 absolute cursor-pointer"
              />
              <span className="text-gray-500 text-center">
                Drag and drop your image here
                <br /> or click to select image
              </span>
              <svg
                className="w-12 h-12 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
          )}
          {handleStage === "execute" && previewUrl && (
            <div className="flex flex-col items-center space-y-2">
              <img
                src={previewUrl}
                alt="Selected Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full sm:w-6/12 lg:w-4/12 flex flex-col">
          {/* Button links below preview option */}
          {handleStage === "capture" && (
            <span
              onClick={openGallery}
              className="text-xs underline text-right cursor-pointer text-blue-500"
            >
              {"Open from file system"}
            </span>
          )}
          {handleStage === "execute" && (
            <div className="flex justify-between">
              <span
                onClick={openGallery}
                className="text-xs underline text-right cursor-pointer text-blue-500"
              >
                {"Use gallery"}
              </span>
              <span
                onClick={retakeImage}
                className="text-xs underline text-right cursor-pointer text-blue-500"
              >
                {"Retake image"}
              </span>
            </div>
          )}

          <div className="mt-2">
            {handleStage === "initial" ? (
              <>
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
                    ? "Scanning..."
                    : scanResult && Object.keys(scanResult).length === 0
                    ? ""
                    : scanResult
                    ? JSON.stringify(scanResult)
                    : ""}
                </div>
                <div
                  className={`w-full ${
                    scanResult ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <ColoredButton onClick={!scanResult ? scanImage : null}>
                    {loading && (
                      <span className="block w-4 h-4 rounded-full border-2 border-t-gray-400 animate-spin"></span>
                    )}
                    {!loading
                      ? !scanResult
                        ? "Scan Image"
                        : "Scan Complete"
                      : ""}
                  </ColoredButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
