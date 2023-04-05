import { useState } from "react";
import Head from "next/head";
import styles from "../styles/contribute.module.css";

// const FormVal = require('form-data');

// import {Storage} from '@google-cloud/storage';

export default function Contribute({ PATH_ROUTE }) {
  const [video, setVideo] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  async function fetchResponse(options, fileName) {
    // const formData = new FormData();
    const formData = new FormData();
    console.log(formData);

    console.log("file is : ", video);
    formData.append("file", video);

    console.log("new file name is:", fileName);
    formData.append("newFileName", fileName);

    console.log("options is: ", options);
    formData.append("options", JSON.stringify(options));

    const headers = {};

    headers["Content-type"] = "multipart/form-data";

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    const response = await fetch("/api/GCSAPI", {
      method: "POST",
      headers: headers,
      body: formData,
    });
    console.log("response is:", response);
    console.log("data being sent");
    const data = await response.json();

    console.log("data result is: ", data.result);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g. send data to server
    // console.log('event : ',event.target);
    console.table(video, latitude, longitude);
    console.log("submit event registered");

    const fileName = `${latitude}#${longitude}#.mp4`;
    // const sendFile = new File([video],fileName,{type : video.type});

    // console.log(sendFile);
    // console.log(process.env.PATH_ROUTE);
    const options = {
      resumable: false,
      metadata: {
        contentType: video.type,
      },
    };
    console.log("calling fetch response");
    fetchResponse(options, fileName);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ocean Trash Detection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="card card-compact w-96 bg-base-100 shadow-xl ocean-gradient">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title">Ocean Trash Detection</h2>
          <label>
            Video:
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="file-input w-full max-w-xs input-bordered input-info"
            />
          </label>

          <label>
            Latitude:
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </label>

          <label>
            Longitude:
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="input input-bordered input-info w-full max-w-xs"
            />
          </label>

          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>

      <footer className={styles.footer}>Powered by Next.js</footer>
    </div>
  );
}

// export async function getServerSideProps() {
//     return {
//       props: {
//         // SECRET_KEY: process.env.SECRET_KEY,
//         // hello: "Heelow",
//         PATH_ROUTE: process.env.PATH_ROUTE,
//       },
//     };
//   }
