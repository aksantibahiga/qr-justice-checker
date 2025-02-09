
import { useState } from "react";
import QRScanner from "@/components/QRScanner";
import UserCard, { UserCardSkeleton } from "@/components/UserCard";
import { findUserByQR } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import type { UserData } from "@/data/mockData";

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScanResult = async (result: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = findUserByQR(result);
      
      if (user) {
        setUserData(user);
      } else {
        toast({
          variant: "destructive",
          title: "Utilisateur non trouvé",
          description: "Aucun utilisateur trouvé pour ce QR code."
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScanError = (error: string) => {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: error
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 fade-in">
          <h1 className="text-4xl font-bold mb-2">QR Justice Checker</h1>
          <p className="text-muted-foreground">
            Scannez le QR code pour vérifier l'identité
          </p>
        </div>

        <div className="space-y-6">
          {!userData && !isLoading && (
            <QRScanner
              onResult={handleScanResult}
              onError={handleScanError}
            />
          )}

          {isLoading && <UserCardSkeleton />}
          
          {userData && !isLoading && (
            <UserCard userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
