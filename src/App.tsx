import player from "./assets/player.svg";
import { Cards } from "./components/cards";
import { api } from "./api/api";
import { useEffect, useState } from "react";

interface Video {
  id: number;
  title: string;
  description: string;
  urlVideo: string;
  thumbnail: string;
  category: string;
}

function App() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await api.get("/videos");
        setVideos(response.data);
        setFilteredVideos(response.data);
      } catch (error) {
        console.error("Erro ao buscar vídeos", error);
      }
    }

    fetchVideos();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) => video.category === selectedCategory)
      );
    }
  }, [selectedCategory, videos]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUpdateVideo = (id: number) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));

    setFilteredVideos((prevVideos) =>
      prevVideos.filter((video) => video.id !== id)
    );
  };

  return (
    <main>
      <div className="w-full flex flex-col justify-center items-center bg-blue-950 py-5">
        <section className="m-auto relative bg-[url('./assets/player.svg')] bg-cover bg-center h-[300px] md:h-[500px] lg:h-[800px] flex text-white p-4">
          <span className="absolute inset-0 bg-blue-900 opacity-30 flex w-full h-full justify-center items-center"></span>

          <div className="wf-full md:w-[50%] flex flex-col justify-end md:justify-center z-10 gap-1 sm:text-xl">
            <h1 className="w-28 sm:w-40 bg-green-700 text-center p-1 sm:text-3xl font-bold">
              Front End
            </h1>
            <h2 className="font-bold">SEO com REACT</h2>
            <p className="font-semibold xl:text-4xl">
              Eu to aqui pra nesse vídeo dizer que a gente vai aprender a
              começar uma app inspirada no desenho Pokémon com Nextjs e React,
              ver algumas dicas sobre performance e de quebra conhecer uma
              plataforma sensacional pra fazer deploy que é a Vercel. Tudo em 22
              minutos nesse vídeo feito com todo o carinho do mundo construindo
              uma "Pokedex"!
            </p>
          </div>

          <div className="min-w-[300px] w-[50%] hidden md:flex justify-center items-center gap-2">
            <img src={player} alt="imagem player" width="90%" />
          </div>
        </section>
      </div>

      <section className="my-5 mx-auto w-[90%] flex flex-col ">
        <div className="m-auto w-[90%] flex flex-col justify-center items-center gap-3 xl:flex-row xl:gap-9">
          <button
            onClick={() => handleCategoryChange("front-end")}
            className=" bg-[#6BD1FF] max-w-[450px] w-full py-2 text-white font-bold"
          >
            Front End
          </button>
          <button
            onClick={() => handleCategoryChange("mobile")}
            className=" bg-[#6BD1FF] w-full max-w-[450px] py-2 text-white font-bold"
          >
            Mobile
          </button>
          <button
            onClick={() => handleCategoryChange("back-end")}
            className=" bg-[#6BD1FF] max-w-[450px] w-full py-2 text-white font-bold"
          >
            Backend
          </button>
          <button
            onClick={() => handleCategoryChange("")}
            className=" bg-[#6BD1FF] max-w-[450px] w-full py-2 text-white font-bold"
          >
            Todos
          </button>
        </div>

        <div className="mt-10 mx-auto w-full max-w-[1600px] flex justify-center flex-wrap gap-5">
          {filteredVideos.length === 0 ? (
            <p>Nenhum vídeo encontrado para essa categoria.</p>
          ) : (
            filteredVideos.map((video) => (
              <Cards
                key={video.id}
                thumbnail={video.thumbnail}
                id={String(video.id)}
                onUpdate={handleUpdateVideo}
                onDelete={handleUpdateVideo}
                urlVideo={video.urlVideo}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
