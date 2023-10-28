import React, { useRef } from "react";
import axios from "axios";
import { Card, Button, Space, Row, Col } from "antd";

function VideoCapture() {
  const videoRef = useRef();
  const canvasRef = useRef();

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing the webcam: ", error);
    }
  };

  const captureFrame = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, 640, 480);

    const frame = canvas.toDataURL("image/jpeg");

    // Send the captured frame to the Flask server
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/predict`, {
        ret: "someReturnValue", // You can set this value
        frame: frame,
        frame_width: 640, // Adjust the width and height as needed
        frame_height: 480,
      })
      .then((response) => {
        console.log("Prediction:", response.data.prediction);
      })
      .catch((error) => {
        console.error("Error sending the frame: ", error);
      });
  };

  return (
    <div className="video-capture">
      <Card title={<p className="title">Real-time handmovement Evaluation</p>}>

        <Row justify={"center"}>
          <Col
            xl={12}
            lg={24}
            md={15}
            sm={24}
            xs={24}
            className="video-wrapper mb-40"
          >
            <video
              ref={videoRef}
              autoPlay
            />

            <canvas
              ref={canvasRef}
              width={640}
              height={480}
              style={{ display: "none" }}
            />
          </Col>
        </Row>

        <Row justify={'center'}>
          <Space>
            <Button
              onClick={startVideo}
              htmlType="button"
              type="primary" >
              Start Video
            </Button>

            <Button
              onClick={captureFrame}
              htmlType="button"
            >
              Capture Frame and Send
            </Button>
          </Space>
        </Row>

      </Card>
    </div>
  );
}

export default VideoCapture;
