import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PencilLine } from "lucide-react";
import { InputType } from "../input";
import { SelectScroll } from "../select";
import { ButtonSecondary } from "../button";
import { useState, useEffect } from "react";
import { api } from "@/api/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface ModalProps {
  id: number | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
}

export function Modal({ id }: ModalProps) {
  const [videoData, setVideoData] = useState({
    thumbnail: "",
    url: "",
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await api.get(`/videos/${id}`);
        setVideoData(response.data);
      } catch (error) {
        console.error("Erro ao buscar os dados do vídeo", error);
      }
    };

    if (id) {
      fetchVideoData();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`/videos/${id}`, videoData);
      toast.success("Vídeo atualizado com sucesso!");
      setTimeout(function () {
        location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erro ao atualizar o vídeo", error);
      toast.error("Erro ao atualizar o vídeo");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!e.target) return;
    const { name, value } = e.target;
    setVideoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setVideoData((prevData) => ({
      ...prevData,
      category: value,
    }));
  };

  return (
    <Dialog>
      <Toaster className="bg-slate-950" />
      <DialogTrigger className="flex items-center gap-2">
        <PencilLine /> Atualizar
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#2271D1] text-2xl font-bold">
            Editar Card
          </DialogTitle>

          <form onSubmit={handleSubmit}>
            <InputType
              type="text"
              placeholder="Digite o link da imagem do vídeo"
              label="Imagem"
              name="thumbnail"
              value={videoData.thumbnail}
              onChange={handleChange}
              width="w-full"
            />

            <SelectScroll
              name="category"
              value={videoData.category}
              width="w-full"
              onChange={handleSelectChange}
            />

            <InputType
              type="text"
              placeholder="Digite o link da imagem do vídeo"
              label="Imagem"
              name="url"
              value={videoData.url}
              onChange={handleChange}
              width="w-full"
            />

            <InputType
              type="text"
              placeholder="Título do vídeo"
              label="Título"
              name="title"
              value={videoData.title}
              onChange={handleChange}
              width="w-full"
            />

            <InputType
              type="text"
              placeholder="Descrição do vídeo"
              label="Descrição"
              name="description"
              value={videoData.description}
              onChange={handleChange}
              width="w-full"
            />

            <div className="mt-10 w-full flex justify-center gap-10">
              <ButtonSecondary name="Guardar" variant="dark" />
              <ButtonSecondary name="Limpar" typeButton="button" />
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
