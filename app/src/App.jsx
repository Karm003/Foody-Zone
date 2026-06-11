import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResults/SearchResult";

export const BASE_URL = "http://localhost:9100";

const filterBtns = [
  { name: "All", type: "all" },
  { name: "Breakfast", type: "breakfast" },
  { name: "Lunch", type: "lunch" },
  { name: "Dinner", type: "dinner" },
];

const App = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
      } catch {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const value = e.target.value;
    if (!value) return setFilteredData(data);
    setFilteredData(data?.filter((food) =>
      food.name.toLowerCase().includes(value.toLowerCase())
    ));
  };

  const filterFood = (type) => {
    setSelectedBtn(type);
    if (type === "all") return setFilteredData(data);
    setFilteredData(data?.filter((food) =>
      food.type.toLowerCase() === type.toLowerCase()
    ));
  };

  if (error) return (
    <div className="flex items-center justify-center min-h-screen text-red-400 text-xl">
      {error}
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen text-white text-xl animate-pulse">
      Loading...
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-2 py-9 gap-4">
        <img src="/logo.svg" alt="Foody Zone Logo" className="h-12" />
        <input
          onChange={searchFood}
          placeholder="Search Food..."
          className="bg-transparent border border-red-500 text-white placeholder-white/70 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-64"
        />
      </div>

      {/* Filter Buttons */}
      <div className="max-w-6xl mx-auto flex justify-center gap-3 pb-10 px-4 flex-wrap">
        {filterBtns.map(({ name, type }) => (
          <button
            key={type}
            onClick={() => filterFood(type)}
            className={`px-5 py-2 rounded-lg text-white text-sm font-medium transition-all cursor-pointer
              ${selectedBtn === type
                ? "bg-red-600 outline outline-2 outline-white"
                : "bg-red-500 hover:bg-red-600"
              }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Food Cards */}
      <SearchResult data={filteredData} />
    </div>
  );
};

export default App;
