export type UserStatus = "avocat" | "magistrat" | "fonctionnaire";

export interface UserData {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  plaque: string;
  photoVehicule: string;
  photoPortrait: string;
  status: UserStatus;
  qrCode: string;
}

export const mockUsers: UserData[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    telephone: "+243 123 456 789",
    plaque: "CD-123-AB",
    photoVehicule:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    photoPortrait:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    status: "avocat",
    qrCode: "user1",
  },
  {
    id: "2",
    nom: "Kabanga",
    prenom: "Marie",
    telephone: "+243 987 654 321",
    plaque: "CD-456-XY",
    photoVehicule:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800",
    photoPortrait:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    status: "magistrat",
    qrCode: "user2",
  },
  // create user flora with id 3, role is fonctionnaire, plaque CD:10/39BKV, GENRATE OTHERS DATA
  {
    id: "3",
    nom: "Flora",
    prenom: "Florian",
    telephone: "+243 987 654 321",
    plaque: "CD-10/39BKV",
    photoVehicule:
      "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_gw/huracan/2023/09_18_refresh/s/gw_hura_s_02_m.jpg",
    photoPortrait:
      "https://media.istockphoto.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=612x612&w=0&k=20&c=Zjv4R6a73O3S8JMF9rKsAdn8r4ON-nt90UDJHdSPV6M=",
    status: "fonctionnaire",
    qrCode: "user3",
  },
];

export const findUserByQR = (qrCode: string): UserData | undefined => {
  return mockUsers.find((user) => user.qrCode === qrCode);
};
