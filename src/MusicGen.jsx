import React, { useState } from "react";
import "./MusicGen.css";
import SubmitPhrase from "./SubmitPhrase";

function MusicGen(props) {
  const [inputValue, setInputValue] = useState("");

  const [displayText, setDisplayText] = useState("");

  const [musicFileName, setMusicFileName] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false); // State for error checking

  const [responseData, setResponseData] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setIsError(false); // Reset error state when input changes
  };

  const handleSubmit = () => {
    //setDisplayText(inputValue);
    e.preventDefault();

    if (!inputValue.trim()) {
      setIsError(true); // If input is empty, set the error state
      return;
    }

    // Pass the valid input to SubmitPhrase for submission
    handleResponse(null, true, false); // Show progress

    if (responseData) {
      setDisplayText(responseData.english_lyric);
    }
  };

  // Handle response from SubmitPhrase
  const handleResponse = (data, loadingState, errorState) => {
    setResponseData(null);
    setIsLoading(loadingState); // Set the loading state to true/false
    setIsError(errorState); // Set error state

    if (data) {
      setResponseData(data); // Store the response data
      setDisplayText(data.english_lyric);
      setMusicFileName(data.english_mp3_path);
    }

    if (!loadingState && !errorState) {
      setInputValue(""); // Clear the input field after successful submission
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(displayText).then(
      () => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000); // Auto-hide after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleButtonClick = (lang, submit_phrase, musicFilePath) => {
    if (!responseData) {
      console.error("No response data available");
      return;
    }

    setDisplayText(submit_phrase); // Update displayed lyrics
    setMusicFileName(""); // Reset music file to force reload

    if (lang === "English") {
      //setMusicFileName("/src/assets/music_files/final-english-audio.mp3");
      setMusicFileName(musicFilePath);
      setDisplayText(submit_phrase);
      console.log(musicFilePath);
      console.log(submit_phrase);
    } else if (lang === "Telugu") {
      //setMusicFileName("/src/assets/music_files/final-telugu-audio.mp3");
      // setDisplayText(
      //   "ఓ బంగరు రంగుల చిలకా పలకవే \n ఓ అల్లరి చూపుల రాజా ఏమనీ నా మీద ప్రేమే ఉందనీ \n నా పైన అలకే లేదనీ \n ఓ అల్లరి చూపుల రాజా పలకవా \n ఓ బంగరు రంగుల చిలకా ఏమనీ \n నా మీద ప్రేమే ఉందనీ \n నా పైన అలకే లేదనీ \n------------\n పంజరాన్ని దాటుకునీ \n  బంధనాలు తెంచుకునీ నీ కోసం వచ్చా ఆశతో \n  మేడలోని చిలకమ్మా మిద్దెలోని బుల్లెమ్మా \n నిరుపేదను వలచావెందుకే \n నీ చేరువలో నీ చేతులలో పులకించేటందుకే \n-----------\n సన్నజాజి తీగుంది తీగ మీద పువ్వుంది \n పువ్వులోని నవ్వే నాదిలే \n కొంటె తుమ్మెదొచ్చింది జుంటి తేనె కోరింది \n అందించే భాగ్యం నాదిలే \n ఈ కొండల్లో ఈ కోనల్లో మనకెదురే లేదులే \n--------------\n ఓ అల్లరి చూపుల రాజా పలకవా \n ఓ బంగరు రంగుల చిలకా ఏమనీ \n నా మీద ప్రేమే ఉందనీ నా పైన అలకే లేదనీ \n"
      // );
      setMusicFileName(musicFilePath);
      setDisplayText(submit_phrase);
    } else if (lang === "Hindi") {
      //setMusicFileName("/src/assets/music_files/final-hindi-audio.mp3");
      setMusicFileName(musicFilePath);
      setDisplayText(submit_phrase);
    }
    console.log(musicFileName);
  };

  return (
    <>
      <div className="input-container">
        {isError && <div className="error-message">Please enter a phrase!</div>}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          //onChange={(e) => handleInputChange(e.target.value)}
          maxLength="200"
          placeholder="Enter phrase here ...!"
          className={isError ? "error" : ""}
        />
        {/* <button className="submit-button" onClick={handleSubmit}>
          <img src="./src/assets/submit-button.png" alt="Submit" />
        </button> */}
        {/* <SubmitPhrase onSubmit={handleResponse} /> */}
        <SubmitPhrase
          musicPhrase={inputValue}
          onSubmit={handleResponse}
          isLoading={isLoading}
          isError={isError} // Pass the error state to SubmitPhrase
        />
      </div>
      {responseData && (
        <div className="outer-container">
          <div className="first-column">
            <div className="inner-column">
              <div className="inner-first-column">
                <button
                  className="lang-button"
                  onClick={() =>
                    handleButtonClick(
                      "English",
                      responseData.english_lyric,
                      responseData.english_mp3_path
                    )
                  }
                >
                  <img src="./src/assets/english-button.png" alt="Submit" />
                </button>
                <button
                  className="lang-button"
                  onClick={() =>
                    handleButtonClick(
                      "Telugu",
                      responseData.telugu_lyric,
                      responseData.telugu_mp3_path
                    )
                  }
                >
                  <img src="./src/assets/telugu-button.png" alt="Submit" />
                </button>
                <button
                  className="lang-button"
                  onClick={() =>
                    handleButtonClick(
                      "Hindi",
                      responseData.hindi_lyric,
                      responseData.hindi_mp3_path
                    )
                  }
                >
                  <img src="./src/assets/hindi-button.png" alt="Submit" />
                </button>
              </div>
              <div className="inner-second-column">
                <div className="scroll-box">
                  <b>
                    {displayText.split("\n").map((line, index) => (
                      <div key={index}>{line}</div>
                    ))}
                  </b>
                  <svg
                    className="copy-icon"
                    onClick={handleCopyClick}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 2a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H8zm0 2h12v14H8V4zM2 8a2 2 0 012-2h2v2H4v10h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="second-column">
            <div className="media-box">
              {/* Display the file name without the path */}
              {musicFileName && (
                <div className="file-name flash">
                  {musicFileName.split("/").pop()}{" "}
                  {/* Extracts just the file name from the full path */}
                </div>
              )}
              {/* Display the audio player */}
              {musicFileName && (
                // <audio key={musicFileName} controls autoPlay preload="auto">
                //   <source src={musicFileName} type="audio/mp3" />
                //   Your browser does not support the audio element.
                // </audio>
                <audio
                  key={`${musicFileName}?v=${new Date().getTime()}`}
                  controls
                  autoPlay
                  preload="auto"
                >
                  <source
                    src={`${musicFileName}?v=${new Date().getTime()}`}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
              )}
            </div>
          </div>
        </div>
      )}
      {showAlert && (
        <div className="alert-box">
          <div className="alert-message">Text copied to clipboard!</div>
          <button className="alert-close-button" onClick={closeAlert}>
            Close
          </button>
        </div>
      )}
    </>
  );
}
export default MusicGen;
