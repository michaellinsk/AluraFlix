import { Trash2 } from "lucide-react";
import { api } from "@/api/api";
import { Modal } from "../modal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface CardsProps {
  urlVideo: string;
  id: string;
  thumbnail: string;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

export function Cards({ id, onDelete, thumbnail, urlVideo }: CardsProps) {
  console.log("video", urlVideo);
  function handleDelete(id: string) {
    api.delete(`/videos/${id}`);
    onDelete(Number(id));
    toast.success("Vídeo deletado com sucesso!");
  }

  return (
    <div className="w-full max-w-[500px]  overflow-hidden">
      <Toaster className="bg-slate-950" />
      <a href={`${urlVideo}`} target="_blank" rel="noopener noreferrer">
        <img
          src={thumbnail}
          alt="Image"
          width="100%"
          height="400px"
          className="h-[300px]"
        />
      </a>

      <div className="bg-black w-full flex justify-center relative bottom-4 py-3 gap-6 rounded">
        <button
          className="flex justify-c'enter items-center gap-1 text-white"
          onClick={() => handleDelete(id)}
        >
          <Trash2 />
          Deletar
        </button>
        <button className="flex gap-1 text-white">
          <Modal id={Number(id)} />
        </button>
      </div>
    </div>
  );
}
