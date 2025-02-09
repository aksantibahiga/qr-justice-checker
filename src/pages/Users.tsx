import { useState } from "react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Plus, QrCode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/stores/userStore";
import { UserStatus } from "@/data/mockData";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  telephone: z.string().min(10),
  plaque: z.string().min(2),
  status: z.enum(["avocat", "magistrat", "fonctionnaire"] as const),
  photoVehicule: z.string().url(),
  photoPortrait: z.string().url(),
});

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const { toast } = useToast();
  const { users, addUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      telephone: "",
      plaque: "",
      status: "avocat",
      photoVehicule: "",
      photoPortrait: "",
    },
  });

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
        description: "Le QR code a été téléchargé avec succès.",
      });
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // @ts-ignore
    addUser(values);
    setIsModalOpen(false);
    form.reset();
    toast({
      title: "Utilisateur ajouté",
      description: "Le nouvel utilisateur a été ajouté avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Gestion des Utilisateurs
            </h1>
            <p className="text-muted-foreground">
              Gérez les utilisateurs et leurs QR codes
            </p>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Ajouter un utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="plaque"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plaque d'immatriculation</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rôle</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un rôle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="avocat">Avocat</SelectItem>
                            <SelectItem value="magistrat">Magistrat</SelectItem>
                            <SelectItem value="fonctionnaire">
                              Fonctionnaire
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photoVehicule"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Photo véhicule</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="photoPortrait"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL Photo portrait</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Ajouter l'utilisateur
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Nom complet</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Plaque</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <img
                      src={user.photoPortrait}
                      alt={`${user.prenom} ${user.nom}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    {user.prenom} {user.nom}
                  </TableCell>
                  <TableCell className="capitalize">{user.status}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{user.plaque}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant={
                          selectedUser === user.id ? "outline" : "default"
                        }
                        size="sm"
                        onClick={() =>
                          setSelectedUser(
                            selectedUser === user.id ? null : user.id
                          )
                        }
                        className="gap-2"
                      >
                        <QrCode className="w-4 h-4" />
                        {selectedUser === user.id ? "Masquer" : "QR Code"}
                      </Button>

                      {selectedUser === user.id && (
                        <>
                          <div
                            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
                            onClick={() => setSelectedUser(null)}
                          >
                            <div
                              className="bg-white p-6 rounded-lg"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <QRCode
                                id={`qr-${user.id}`}
                                value={user.qrCode}
                                size={256}
                              />
                              <Button
                                variant="outline"
                                onClick={() => downloadQRCode(user.id)}
                                className="mt-4 w-full gap-2"
                              >
                                <Download className="w-4 h-4" />
                                Télécharger
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Users;
