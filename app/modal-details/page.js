"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

const ModalDetails = () => {
  const [modalDetails, setModaldetails] = useState({});

  const [formData, setFormData] = useState({});
  const [outputData, setOutputData] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchModalDataById = async () => {
    try{
      let response = await axios.get(`/api/modalSpace/${id}`);
      setModaldetails(response?.data?.data);
      setErrorMessage("");
    }
    catch(err){
      console.log("err:", err?.response?.data?.data);
      setErrorMessage(err?.response?.data?.data?.detail);
    }
  };

  useEffect(() => {
    fetchModalDataById(id);
  }, []);

  const handleInputChange = (evt) => {
    console.log("evt:", evt.target.type);
    if (evt.target.type == "file") {
      let file = evt.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64String = e.target.result;
          setFormData((prev) => {
            return {
              ...prev,
              [evt.target.name]: base64String,
            };
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => {
        return {
          ...prev,
          [evt.target.name]: evt.target.value,
        };
      });
    }
  };

  const handleFormSubmit = async () => {
    try {
      let response = await axios.post(
        `/api/modalSpace/${id}`,
        formData
      );

      setErrorMessage("");
      setOutputData(response?.data?.data);
    } catch (err) {
      console.log("err:", err?.response?.data?.data);
      setErrorMessage(err?.response?.data?.data?.detail);
    }
  };

  return (
    <div>
      <Link href="/">
        {" "}
        <h2 className="text-center p-6 text-xl">Modal Space</h2>
      </Link>

      {errorMessage && (
        <div className="flex justify-center">
          <div className="px-4 text-center w-fit text-red-700 border rounded-md m-4">
            <span className="text-sm">❌</span> {errorMessage}
          </div>
        </div>
      )}
      <div className="flex gap-2 m-4">
        <div className="w-1/2 border">
          {modalDetails?.inputs?.map((item, index) => {
            return (
              <div className="border p-2" key={index}>
                <span className="text-xs">{item?.name}</span>
                <input
                  className="outline-none w-full"
                  type={
                    item?.type == "audio" ||
                    item?.type == "video" ||
                    item?.type == "image"
                      ? "file"
                      : item?.type
                  }
                  accept={`${item?.type}/*`}
                  value={
                    item?.type == "audio" ||
                    item?.type == "video" ||
                    item?.type == "image"
                      ? null
                      : formData[item?.name] || ""
                  }
                  onChange={handleInputChange}
                  name={item?.name || "name"}
                  id={item?.name}
                  placeholder={item?.name || ""}
                  // required={item?.required}
                />
              </div>
            );
          })}
          <div className="flex justify-end p-3">
            <button
              className="p-2 cursor-pointer text-white bg-black"
              onClick={handleFormSubmit}
            >
              Predict
            </button>
          </div>
        </div>
        <div className="border w-1/2 p-2">
          {modalDetails?.outputs?.map((item, index) => {
            return (
              <div className="border p-2" key={index}>
                <div>
                  <span>{item?.name}</span>
                  <p>{item?.description}</p>
                </div>
              </div>
            );
          })}

          <br></br>
          <hr></hr>
          <br></br>

          {outputData && modalDetails?.outputs?.map((item, index) => {
            let smallCaseKeyName = item?.name?.toLowerCase();
            let displayKeyName = item?.name;
            if (smallCaseKeyName?.includes("image")) {
              return (
                <img
                  className="w-36 m-4"
                  src={outputData?.[displayKeyName]}
                ></img>
              );
            } else if (smallCaseKeyName?.includes("audio")) {
              return (
                <audio>
                  <source
                    src={outputData?.[displayKeyName]}
                    type="audio/ogg"
                  ></source>
                  <source
                    src={outputData?.[displayKeyName]}
                    type="audio/ogg"
                  ></source>
                  Your browser does not support the video tag.
                </audio>
              );
            } else if (smallCaseKeyName?.includes("video")) {
              return (
                <video width="320" height="240" controls>
                  <source src="movie.mp4" type="video/mp4"></source>
                  <source src="movie.ogg" type="video/ogg"></source>
                  Your browser does not support the video tag.
                </video>
              );
            } else if (smallCaseKeyName?.includes("text")) {
              return (
                <div className="border p-2" key={index}>
                  <div>
                    <span>{outputData?.[displayKeyName]}</span>
                  </div>
                </div>
              );
            } else {
              return JSON.stringify(outputData);
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default ModalDetails;
