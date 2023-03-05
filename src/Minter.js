import { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { pinJSONToIPFS } from "./util/pinata.js";

import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js";

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [priceType, setPriceType] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [stlBase64, setStlBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일
  const [stlFile, setStlFile] = useState(null);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }


  const handleChangeImageFile = (event) => {
    console.log(event.target.files)
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {

        let image_label = document.getElementById("image_label");
        image_label.innerHTML = event.target.files[i].name;

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString()
              setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)

          }
        }
      }
    }
  }

  const handleChangeSTLFile = (event) => {
    console.log(event.target.files)
    setStlFile(event.target.files);
    //fd.append("file", event.target.files)
    setStlBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        console.log(event.target.files[i].name);
        let stl_label = document.getElementById("stl_label");
        stl_label.innerHTML = event.target.files[i].name;
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString()
              setStlBase64(stlBase64 => [...stlBase64, base64Sub]);
            //  setStlBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        }
      }
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {


    let imgURI = null;
    let stlURI = null;
  
    console.log(imgFile);
    if (imgFile != null) {
  
      const pinataImgResponse = await pinJSONToIPFS(imgFile);
      if (!pinataImgResponse.success) {
        return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
        };
      }
      imgURI = pinataImgResponse.pinataUrl;
  
    }
  
    console.log(imgURI);
  
    if (stlFile != null) {
  
      const pinataStlResponse = await pinJSONToIPFS(stlFile);
      if (!pinataStlResponse.success) {
        return {
          success: false,
          status: "😢 Something went wrong while uploading your tokenURI.",
        };
      }  
      stlURI = pinataStlResponse.pinataUrl;
  
    }
    console.log(stlURI);

    const { success, status } = await mintNFT(name, description, price, priceType, imgURI, stlURI);
    setStatus(status);
    if (success) {
      setName("");
      setPrice("");
      setPriceType("");
      setDescription("");
      setImgFile(null);
      setStlFile(null);
    }
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title"> 3D Design NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2> Image file Upload: </h2>
        <input type="file" id="imagefile" style={{ display: 'none' }} onChange={handleChangeImageFile} multiple="multiple" />
        <label for="imagefile" class="FlexCol_c" style={{ border: '2px solid black', width: '700px', height: '300px', marginTop: '100px', fontSize: '20px' }}><strong>IMAGE FILE UPLOAD - </strong> <strong id="image_label">Not updated</strong></label>

        <h2> STL file Upload: </h2>
        <input type="file" id="stlfile" style={{ display: 'none' }} onChange={handleChangeSTLFile} multiple="multiple" />
        <label for="stlfile" class="FlexCol_c" style={{ border: '2px solid black', width: '700px', height: '300px', marginTop: '100px', fontSize: '20px' }}><strong>STL FILE UPLOAD - </strong> <strong id="stl_label">Not updated</strong></label>        

        <h2> Name : </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2> Price Type : </h2>
        <input
          type="text"
          placeholder="e.g. eth or USDC"
          onChange={(event) => setPriceType(event.target.value)}
        />
        <h2> Price : </h2>
        <input
          type="text"
          placeholder="e.g. 0.002 or 20"
          onChange={(event) => setPrice(event.target.value)}
        />

        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>

      <Carousel interval={null}>
        {imgBase64.map((item) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={item}
                alt="First slide"
                style={{ width: "100%", height: "550px" }}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>


      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;
