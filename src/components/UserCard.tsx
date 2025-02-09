import { UserData } from "@/data/mockData";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface UserCardProps {
  userData: UserData;
}

const UserCard = ({ userData }: UserCardProps) => {
  const statusColors = {
    avocat: 'bg-primary text-primary-foreground',
    magistrat: 'bg-blue-500 text-white',
    fonctionnaire: 'bg-green-500 text-white'
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden slide-up">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Badge className={statusColors[userData.status]}>
              {userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={userData.photoPortrait}
                alt={`${userData.prenom} ${userData.nom}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {userData.prenom} {userData.nom}
              </h2>
              <p className="text-muted-foreground">{userData.telephone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Véhicule
              </h3>
              <p className="text-lg font-medium mb-3">{userData.plaque}</p>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={userData.photoVehicule}
                  alt="Véhicule"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const UserCardSkeleton = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden animate-pulse">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-24" />
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Skeleton className="aspect-square rounded-lg" />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div>
              <Skeleton className="h-6 w-24 mb-2" />
              <Skeleton className="h-6 w-32 mb-3" />
              <Skeleton className="aspect-video rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
