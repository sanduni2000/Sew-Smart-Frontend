import axios from 'axios'; // Import the axios library
import ReactPlayer from 'react-player';
import React, { useState } from 'react';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import { Card, Col, Row, Upload, Spin, Alert, Button } from 'antd';

const EveluateMoment = () => {

  const { Dragger } = Upload;
  
  const [isLoading, setLoading] = useState(false);
  const [fileObject, setFileObject] = useState(null);
  const [predictions, setPredictions] = useState(null);

  const handleChange = async (e) => {
    setPredictions(null);
    setLoading(true);

    const objectURL = URL.createObjectURL(e.fileList[0].originFileObj);
    setFileObject(objectURL);

    const formData = new FormData();
    formData.append('file', e.fileList[0].originFileObj);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/prediction`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setPredictions(response.data.predictions[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };


  const handleReset = () => {
    setPredictions(null);
    setFileObject(null);
    setLoading(false);
  };

  return (
    <div className="eveluate-moment">
      <Card title={<p className="title">Evaluating Hand Movement for Accuracy</p>}>


        {fileObject && (
          <Row justify={"center"}>
            <Col xl="12" lg="24" className='video-preview'>
              <ReactPlayer
                url={fileObject}
                controls
                width="60%"
                height="auto"
                muted
              />
            </Col>
          </Row>
        )}

        <Spin spinning={isLoading} tip="Processing">

          {!fileObject ? <Row justify="center">
            <Col
              xl={12}
              lg={24}
              md={15}
              sm={24}
              xs={24}
              className="mb-40"
            >
              <Dragger
                name="file"
                accept="video/mp4,video/x-m4v,video/*"
                multiple={false}
                beforeUpload={() => false}
                onChange={handleChange}
              >
                <p className="ant-upload-drag-icon">
                  <VideoCameraAddOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            </Col>
          </Row> : <div></div>}

          <Row justify={'center'}>
            <Col
              xl={12}
              lg={24}
              md={15}
              sm={24}
              xs={24}
              className="mb-40"
            >
              {predictions !== null && (
                <div className="prediction-result">
                  <Alert
                    type={predictions === 1 ? "success" : "error"}
                    showIcon
                    message="Prediction Result:"
                    description={predictions === 1 ? "Hand movement is Accurate" : "Hand movement is Not Accurate"}
                  />
                </div>
              )}
            </Col>
          </Row>


          {fileObject && (
            <Row justify={'center'}>
              <Button htmlType="button" onClick={() => handleReset()}>Start Agin</Button>
            </Row>
          )}

        </Spin>
      </Card>

    </div>
  );
};



export default EveluateMoment;