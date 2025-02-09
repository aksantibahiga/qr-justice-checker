
import { useState } from "react";
import QRCode from "react-qr-code";
import { mockUsers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { toast } = useToast();

  const downloadQRCode = (userId: string) => {
    const svg = document.getElementById(`qr-${userId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${userId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();

      toast({
        title: "QR Code téléchargé",
        description: "Le QR code a été téléchargé avec succès."
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">
            Gérez les QR codes des utilisateurs
          </p>
        </div>

        <div className="grid gap-6">
          {mockUsers.map((user) => (
            <Card key={user.id} className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <img
                    src={user.photoPortrait}
                    alt={`${user.prenom} ${user.nom}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {user.prenom} {user.nom}
                    </h2>
                    <p className="text-muted-foreground">{user.telephone}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {(selectedUser === user.id) && (
                      <div className="p-4 bg-white rounded-lg">
                        <QRCode
                          id={`qr-${user.id}`}
                          value={user.qrCode}
                          size={128}
                        />
                      </div>
                    )}
                    
                    <div className="space-x-2">
                      <Button
                        variant={selectedUser === user.id ? "outline" : "default"}
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                      >
                        {selectedUser === user.id ? "Masquer" : "Générer"} QR Code
                      </Button>
                      
                      {selectedUser === user.id && (
                        <Button
                          variant="outline"
                          onClick={() => downloadQRCode(user.id)}
                          className="gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Télécharger
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
