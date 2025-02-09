
import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
}

const QRScanner = ({ onResult, onError }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = (result: string) => {
    if (result) {
      setIsScanning(false);
      onResult(result);
    }
  };

  const handleError = (error: Error) => {
    if (error.message.includes("NotAllowedError")) {
      onError("Veuillez autoriser l'accès à la caméra");
    } else {
      onError(error.message);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 fade-in">
      {!isScanning ? (
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setIsScanning(true)}
            className="gap-2"
          >
            <Camera className="w-5 h-5" />
            Scanner un QR Code
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsScanning(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <Scanner
            onResult={handleScan}
            onError={handleError}
            constraints={{
              facingMode: "environment"
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default QRScanner;
