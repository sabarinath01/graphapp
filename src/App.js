import "./App.css";
import BarChart from "./components/BarChart";
import { useState, useEffect } from "react";
import { UserData } from "./Data";
import LineChart from "./components/LineChart";
import Papa from "papaparse";

export default function App() {
  const [fileData, setFileData] = useState([]);
  const [filechosen, setFilechosen] = useState(false);
  // const [userData, setUserData] = useState({
  //   labels: UserData.map((data) => data.time),
  //   datasets: [
  //     {
  //       label: "Voltage",
  //       data: UserData.map((data) => data.voltage),
  //     },
  //   ],
  // });

  const [userData, setUserData] = useState();

  const handleFileChosen = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.split("\n");
      const data = [];

      // Iterate over each line and create a new object with properties for each column
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
          const values = line.split(",");
          const obj = {};
          obj.time = i++;
          obj.voltage = values[0];
          data.push(obj);
        }
      }

      setFileData(data);
      console.log(data);
      let mydata = {
        labels: data.map((data) => data.time),
        datasets: [
          {
            label: "Voltage",
            data: data.map((data) => data.voltage),
          },
        ],
      };
      setUserData(mydata);
      setFilechosen(true);
      console.log("User data is ", userData);
    };
    reader.readAsText(file);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileChosen(file);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {filechosen && (
        <div className="flex flex-col justify-center items-center w-5/6">
          <h1>Voltage vs Time Plot</h1>
          <LineChart chartData={userData} />
        </div>
      )}
      <div className="bg-gray-100  rounded-sm flex flex-row justify-center items-center space-x-4">
        <h1 className="bg-blue-600 text-white p-3">
          {" "}
          Choose the input CSV file:
        </h1>
        <input type="file" onChange={handleFileUpload} />
      </div>
      {console.log(userData)}
    </div>
  );
}
