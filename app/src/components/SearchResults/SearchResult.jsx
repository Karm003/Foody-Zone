import { BASE_URL } from "../../App";

const SearchResult = ({ data }) => {
  if (!data?.length) return (
    <div className="flex items-center justify-center py-20 text-white/60 text-lg">
      No food items found.
    </div>
  );

  return (
    <section
      className="min-h-[calc(100vh-210px)] bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-wrap justify-center gap-6">
          {data.map(({ name, image, text, price }) => (
            <div
              key={name}
              className="w-80 flex rounded-2xl p-3 backdrop-blur-md border border-white/20"
              style={{
                background:
                  "radial-gradient(90.16% 143.01% at 15.32% 21.04%, rgba(165,239,255,0.2) 0%, rgba(110,191,244,0.04) 77%, rgba(70,144,213,0) 100%)",
              }}
            >
              {/* Food Image */}
              <img
                src={BASE_URL + image}
                alt={name}
                className="w-32 h-36 object-contain flex-shrink-0"
              />

              {/* Food Info */}
              <div className="flex flex-col justify-between items-end flex-1 pl-2">
                <div>
                  <h3 className="text-white font-medium text-base mt-2">{name}</h3>
                  <p className="text-white/70 text-xs mt-1 leading-relaxed">{text}</p>
                </div>
                <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-1.5 rounded-lg transition-colors cursor-pointer">
                  ${price.toFixed(2)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
