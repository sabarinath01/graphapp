import "./App.css";
import BarChart from "./components/BarChart";
import { useState, useEffect } from "react";
import { UserData } from "./Data";
import LineChart from "./components/LineChart";
import Papa from "papaparse";
import { db, storage } from "./firebase-config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function App() {
  const [fileData, setFileData] = useState([]);
  const [filechosen, setFilechosen] = useState(false);
  const [dataupload, setDataupload] = useState(false);

  const [pname, setName] = useState();
  const [pid, setPid] = useState();
  const [page, setAge] = useState();
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

  const addData = async (file) => {
    // let downloadURL;
    // const storage = getStorage();
    // const storageRef = ref(storage, "csvsheets/myname.csv");

    // uploadBytes(storageRef, file).then((snapshot) => {
    //   console.log("Uploaded a blob or file!");
    // });
    // getDownloadURL(storageRef)
    //   .then((url) => {
    //     downloadURL = url;
    //   })
    //   .catch((e) => console.log("ERROR, ", e));
    // console.log("inside add data");
    const patientRef = collection(db, "patients");
    // console.log(UserData);
    console.log("UPLOADED DATA IS ", fileData);
    const docRef = await addDoc(patientRef, {
      name: pname,
      age: page,
      patient_id: pid,
      data: fileData,
    });

    setDataupload(true);
  };
  const handleFileChosen = async (file) => {
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
          obj.time = i;
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
    <div className="flex flex-col justify-center items-center space-y-2">
      {filechosen &&
        (dataupload ? (
          <div className="bg-green-600 text-white p-4 rounded-md mt-3 space-y-3">
            <h1>DATA UPLOADED!</h1>
            <button
              className="bg-white p-2 rounded-md text-black"
              onClick={() => window.location.reload(false)}
            >
              ADD NEXT ENTRY
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center w-4/6 space-y-4">
            <h1>Voltage vs Time Plot</h1>
            <LineChart chartData={userData} />
            <div className="flex flex-col items-center justify-center space-y-2 bg-gray-200 p-2 rounded-md">
              <div className="flex flex-col space-y-2">
                <input
                  placeholder="Name"
                  className="border-gray-500 border-2 rounded-md p-1"
                  onChange={(e) => setName(e.target.value)}
                ></input>

                <input
                  placeholder="Age"
                  className="border-gray-500 border-2 rounded-md p-1"
                  onChange={(e) => setAge(e.target.value)}
                ></input>
                <input
                  placeholder="Patient ID"
                  className="border-gray-500 border-2 rounded-md p-1"
                  onChange={(e) => setPid(e.target.value)}
                ></input>
              </div>
              <button
                className="bg-blue-600 p-3 text-white rounded-md"
                onClick={addData}
              >
                UPLOAD DATA
              </button>
            </div>
          </div>
        ))}

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
