import { ButtonSecondary } from "@/components/button";
import { InputType } from "@/components/input";
import { SelectScroll } from "@/components/select";
import { TextareaType } from "@/components/textarea";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "@/api/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

interface FormValues {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  category: string;
  urlVideo: string;
}

export default function NewVideo() {
  const initialFormValues: FormValues = {
    id: uuidv4(),
    title: "",
    description: "",
    thumbnail: "",
    category: "",
    urlVideo: "",
  };

  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [videos, setVideos] = useState<FormValues[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormValues((prevState) => ({
      ...prevState,
      category: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setVideos((prevVideos) => [...prevVideos, formValues]);

    try {
      await api.post("/videos", formValues);

      setFormValues({
        id: uuidv4(),
        title: "",
        description: "",
        thumbnail: "",
        category: "",
        urlVideo: "",
      });

      toast.success("video criado com sucesso!");
    } catch (erro) {
      toast.error("video criado com sucesso!");
      console.log(erro);
    }
  };

  const handleClear = () => {
    setFormValues({
      id: uuidv4(),
      title: "",
      description: "",
      thumbnail: "",
      category: "",
      urlVideo: "",
    });
  };

  return (
    <main>
      <Toaster className="bg-slate-950" />
      <h1 className="text-center text-5xl font-bold text-white mt-10">
        NOVO VIDEO
      </h1>
      <h4 className="text-center text-xl text-white mt-5">
        COMPLETE O FORMULÁRIO PARA CRIAR UM NOVO CARD DE VIDEO.
      </h4>

      <form
        onSubmit={handleSubmit}
        className="m-auto flex justify-center items-center flex-col gap-2 w-full max-w-[1100px] h-[700px] px-4"
      >
        <h3 className="w-full text-white text-3xl py-2 border-y font-bold border-white mt-10">
          Criar Card
        </h3>
        <div className="flex justify-start items-end gap-2 w-full mt-6">
          <InputType
            type="text"
            placeholder="Digite o título do vídeo"
            label="title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
          />
          <SelectScroll
            name="category"
            value={formValues.category}
            onChange={handleSelectChange}
          />
        </div>

        <div className="flex gap-2 w-full mt-14">
          <InputType
            type="text"
            placeholder="Digite o link da imagem do vídeo"
            label="thumbnail"
            name="thumbnail"
            value={formValues.thumbnail}
            onChange={handleInputChange}
          />
          <InputType
            type="text"
            placeholder="Digite o link do vídeo"
            label="urlVideo"
            name="urlVideo"
            value={formValues.urlVideo}
            onChange={handleInputChange}
          />
        </div>

        <TextareaType
          label="description"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
          placeholder="Digite a descrição do vídeo"
        />
        <div className="mt-10 w-full flex justify-center items-center gap-10">
          <ButtonSecondary name="Guardar" variant="dark" />

          <ButtonSecondary
            name="Limpar"
            typeButton="button"
            onClickClear={handleClear}
          />
        </div>
      </form>

      <section className="mt-10">
        <h3 className="text-center text-xl font-bold text-white">
          Vídeos Cadastrados
        </h3>
        <div className="flex flex-wrap gap-5 justify-center mt-5">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 p-4 rounded-lg text-white"
            >
              <h4>{video.title}</h4>

              <img src={video.thumbnail} className="w-40 h-40 object-cover" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
