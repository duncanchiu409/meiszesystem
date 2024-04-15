import "../../App.css";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, database } from "../../firebase";

import { doc, setDoc } from "firebase/firestore";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n'

const ShareDrive = () => {
  const [file, setFile] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  // const [imageUrls, setImageUrls] = useState([]);
  const { t } = useTranslation()

  const onFileChange = (files) => {
    const currentFile = files[0];
    setFile(currentFile);
    console.log(files);
  };

  const uploadToDatabase = (url) => {
    let docData = {
      mostRecentUploadURL: url,
      username: "jasondubon",
    };
    const userRef = doc(database, "users", docData.username);
    setDoc(userRef, docData, { merge: true })
      .then(() => {
        console.log("successfully updated DB");
      })
      .catch((error) => {
        console.log("errrror");
      });
  };

  const handleClick = () => {
    if (file === null) return;
    const fileRef = ref(storage, `common/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgressBar((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progressBar);
      },
      (error) => {
        console.log("error :(");
      },
      () => {
        console.log("success!!");
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          uploadToDatabase(downloadURL);
          console.log(downloadURL);
        });
      }
    );
  };

  // useEffect(() => {
  //   listAll(ref(storage, "common/")).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <div className="main">
      <div className="App">
        <div className="container">
          <h2 className="header">{t("Share Drive.Drop File Input")}</h2>
          <br></br>
          <DropFileInput onFileChange={(files) => onFileChange(files)} />

          <br></br>
          {/* <div className="progressMain">
            <progress
              className="progress progress-accent w-56"
              value={progressBar}
              max="100"
            ></progress>
          </div> */}
          <br></br>
          <button className="btn-create" onClick={() => handleClick()}>
            {" "}
            Upload
          </button>
          <label htmlFor='file'>Upload File</label>
          <input type="file" id="file" onChange={(e) => console.log(e.target.files[0] ? e.target.files[0] : "No File Chosen")} hidden/>
          <br></br>
          {/* {
                    imageUrls.map(dataVal=><div>
                        <img src={dataVal} height="200px" width="200px" />
                        <br/> 
                    </div>)
                } */}
        </div>
      </div>
    </div>
  );
};

export default ShareDrive;

// import { RiArrowDownSFill } from "react-icons/ri";
// import { FaList } from "react-icons/fa";
// import { IoIosInformationCircle } from "react-icons/io";
// import { MdInsertDriveFile } from "react-icons/md";

// import { RiArrowDownLine } from "react-icons/ri";
// import styled from 'styled-components';
// import { useEffect, useState } from 'react';
// import { database } from '../../firebase';

// const DataContainer = styled.div`
//     flex: 1 1;
//     padding: 10px 0px 0px 20px;
// `

// const DataHeader = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid lightgray;
//     height: 40px;
//     .headerLeft {
//         display: flex;
//         align-items: center;
//     }
//     .headerRight svg {
//         margin:0px 10px;
//     }
// `

// const DataGrid = styled.div`
//     display: flex;
//     align-items: center;
//     margin-top: 30px;
//     margin-bottom: 30px;
// `

// const DataFile = styled.div`
//     text-align: center;
//     border: 1px solid rgb(204 204 204 / 46%);
//     margin: 10px;
//     min-width: 200px;
//     padding: 10px 0px 0px 0px;
//     border-radius: 5px;
//     svg {
//         font-size: 60px;
//         color:gray
//     }
//     p {
//         border-top: 1px solid #ccc;
//         margin-top: 5px;
//         font-size: 12px;
//         background: whitesmoke;
//         padding: 10px 0px;
//     }
// `
// const DataListRow = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid #ccc;
//     padding: 10px;
//     p {
//         display: flex;
//         align-items: center;
//         font-size: 13px;
//         b {
//             display: flex;
//             align-items: center;
//         }
//         svg {
//             font-size: 22px;
//             margin:10px
//         }
//     }
// `

// const ShareDrive = () => {
//     const [files, setFiles] = useState([]);

//     useEffect(() => {
//         database.collection("myfiles").onSnapshot(snapshot => {
//             setFiles(snapshot.docs.map(doc => ({
//                 id: doc.id,
//                 data: doc.data()
//             })))
//         })
//     },[])

//     const changeBytes = (bytes, decimals = 2) => {
//         if (bytes === 0) return '0 Bytes';
//         const k = 1024;
//         const dm = decimals < 0 ? 0 : decimals;
//         const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//         const i = Math.floor(Math.log(bytes) / Math.log(k));
//         return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
//     }

//     return (
//         <DataContainer>
//             <DataHeader>
//                 <div className="headerLeft">
//                     <p>My Drive</p>
//                     <RiArrowDownSFill />
//                 </div>
//                 <div className="headerRight">
//                     <FaList  />
//                     <IoIosInformationCircle />
//                 </div>
//             </DataHeader>
//             <div>
//                 <DataGrid>
//                     {files.map(file => (
//                         <DataFile key={file.id}>
//                             <MdInsertDriveFile />
//                             <p>{file.data.filename}</p>
//                         </DataFile>
//                     ))}
//                 </DataGrid>
//                 <div>
//                     <DataListRow>
//                         <p><b>Name <RiArrowDownLine /></b></p>
//                         <p><b>Owner</b></p>
//                         <p><b>Last Modified</b></p>
//                         <p><b>File Size</b></p>
//                     </DataListRow>
//                     {files.map(file => (
//                         <DataListRow key={file.id}>
//                             <a href={file.data.fileURL} target='_blank' rel="noreferrer">
//                                 <p><MdInsertDriveFile /> {file.data.filename}</p>
//                             </a>
//                             <p>Owner </p>
//                             <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
//                             <p>{changeBytes(file.data.size)}</p>
//                         </DataListRow>
//                     ))}
//                 </div>
//             </div>
//         </DataContainer>
//     )
// }
// export default ShareDrive
