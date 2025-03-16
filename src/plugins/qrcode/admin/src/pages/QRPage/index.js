// @ts-nocheck
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import "./QRPage.css";
import { getPocketBook, updateQRCode } from "../../api/qr.js";

const App = () => {
  const [format, setFormat] = useState("PNG");
  const [token, setToken] = useState("");
  const [link, setLink] = useState();
  const [confirmLink, setConfirmLink] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [pocketBook, setPocketBook] = useState();
  const isDisabledConfirmLink = pocketBook?.qrCode
    ? extractLinkToken(pocketBook.qrCode).url === link
    : true;

  useEffect(() => {
    getQRCode();
  }, []);

  async function getQRCode() {
    try {
      setIsFetching(true);
      const pocketBook = await getPocketBook();
      setPocketBook(pocketBook);
      if (pocketBook.qrCode) {
        const extractInfo = extractLinkToken(pocketBook.qrCode);
        setLink(extractInfo.url);
        setToken(extractInfo.token);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function saveQrCode(newToken) {
    try {
      setIsFetching(true);
      let urlObj = new URL(link);
      const webHost = process.env.NEXT_WEB_API;
      urlObj.searchParams.delete("viveToken");
      urlObj.searchParams.append("viveToken", newToken);

      const pocketBookUpdated = await updateQRCode(
        pocketBook.id,
        urlObj.toString()
      );
      setPocketBook(pocketBookUpdated);
      const extractInfo = extractLinkToken(pocketBookUpdated.qrCode);
      setLink(extractInfo.url);
      setToken(extractInfo.token);
    } catch (err) {
      console.log(err);
      alert("Error");
    } finally {
      setIsFetching(false);
    }
  }

  const handleDownload = () => {
    const canvas = document.getElementById("qrCode");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code.${format.toLowerCase()}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  async function generateToken() {
    const newToken = Math.random().toString(36).substring(2);
    await saveQrCode(newToken);
  }

  async function handleConfirmLink() {
    if (link.includes("viveToken")) {
      alert("Please remove viveToken in your link!");
      return;
    }
    await saveQrCode(token);

    let urlObj;
  }

  function extractLinkToken(qrCode) {
    let [url, token] = qrCode.split("viveToken=");
    url = url.replace(/[?&]$/, "");
    return { url, token };
  }

  return (
    <div className="qr-code">
      <div className="qr-container">
        {pocketBook?.qrCode && (
          <QRCode id="qrCode" value={pocketBook.qrCode} size={400} level="H" />
        )}
      </div>
      {pocketBook?.qrCode &&  <a className="qr-link" href={pocketBook.qrCode} target="_blank">{pocketBook.qrCode}</a>}
      <div className="controls">
        <div className="form-group">
          <label htmlFor="token">Token</label>
          <input id="token" type="text" disabled value={token} />
          <button onClick={generateToken}>&#x21BB;</button>
        </div>
        {/* <div className="form-group">
          <label htmlFor="token">Link</label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          z<button
            disabled={isDisabledConfirmLink}
            className={`${isDisabledConfirmLink ? "disabled" : ""}`}
            onClick={() => handleConfirmLink()}
          >
            &#10003;
          </button>
        </div> */}

        <button className="qr-download" onClick={handleDownload}>
          Tải xuống QR
        </button>
      </div>
    </div>
  );
};

export default App;
