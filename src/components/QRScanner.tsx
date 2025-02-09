
import { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Camera, X } from "lucide-react";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError: (error: string) => void;
}

const QRScanner = ({ onResult, onError }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    if (!scannerRef.current) return;

    const newScanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    newScanner.render(
      (decodedText) => {
        newScanner.clear();
        setIsScanning(false);
        onResult(decodedText);
      },
      (errorMessage) => {
        if (errorMessage.includes("NotAllowedError")) {
          onError("Veuillez autoriser l'accès à la caméra");
        }
      }
    );

    setScanner(newScanner);
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setIsScanning(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 fade-in">
      {!isScanning ? (
        <div className="text-center">
          <Button
            size="lg"
            onClick={startScanning}
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
              onClick={stopScanning}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <div id="reader" ref={scannerRef} className="w-full" />
        </div>
      )}
    </Card>
  );
};

export default QRScanner;
