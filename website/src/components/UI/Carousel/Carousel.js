import React from "react";

function Carousel() {
  return (
    <div className="carousel w-full ">
      <div id="slide1" className="carousel-item relative w-full ">
        <img
          src="https://media.licdn.com/dms/image/C5603AQF24YHWinOLlg/profile-displayphoto-shrink_400_400/0/1630937984574?e=1686182400&v=beta&t=pkCTURHXB9jBHdONRCCTB264j84bswb9oTuAaeuOTTk"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-none	">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://media.licdn.com/dms/image/C5603AQF24YHWinOLlg/profile-displayphoto-shrink_400_400/0/1630937984574?e=1686182400&v=beta&t=pkCTURHXB9jBHdONRCCTB264j84bswb9oTuAaeuOTTk"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-none	">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://media.licdn.com/dms/image/C5603AQF24YHWinOLlg/profile-displayphoto-shrink_400_400/0/1630937984574?e=1686182400&v=beta&t=pkCTURHXB9jBHdONRCCTB264j84bswb9oTuAaeuOTTk"
          className="w-full"
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 bg-none	">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
