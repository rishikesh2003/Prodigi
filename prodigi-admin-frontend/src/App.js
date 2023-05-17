import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://prodigi-admin-backend.onrender.com/");
      const pD = await data.json();
      await setData(pD);
    }
    setInterval(async () => {
      await fetchData();
    }, 2000);
  }, []);
  return (
    <>
      <Navbar />
      <div className="total">
        <p>
          Total No.of People inside the building :{" "}
          <strong>
            {data ? data.hall + data.kitchen + data.studyroom : "Loading..."}
          </strong>
        </p>
      </div>
      <Rooms data={data} />
    </>
  );
}

export default App;
