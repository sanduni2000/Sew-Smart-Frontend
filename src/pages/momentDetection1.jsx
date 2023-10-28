import Webcam from 'react-webcam';
import { AudioMutedOutlined, AudioOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Button, Card, Col, Row, Select, Space, Switch, Tooltip } from 'antd';

const MomentDetection = () => {

    const { Option } = Select;

    //camera options
    const [mute, setMute] = useState(true);
    const [mirrored, setMirrored] = useState(true);

    //recording options 
    const webCamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    //multi device camera options
    const [devices, setDevices] = useState([]);
    const [deviceId, setDeviceId] = useState({});

    let audio = new Audio("/audio_1.mp3")

    const startRecording = useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webCamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
        mediaRecorderRef.current.start();
    }, [webCamRef, setCapturing, mediaRecorderRef]);

    const stopRecording = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDataAvailable = useCallback(({ data }) => {
        if (data.size > 0) {
            setRecordedChunks((prev) => prev.concat(data));
        }
    }, [setRecordedChunks]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const handleDevices = useCallback((mediaDevices) =>
        setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]);

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    return (
        <div className="moment-detection">
            <Card title={<p className="title">Real-time Hand Moment Detection</p>}>
                <Row justify={'center'}>

                    {/* <Col lg={18} md={18}>
    <Alert
        message="Warning"
        description="Incorrect hand moment detected"
        type="warning"
        showIcon
    />
</Col> */}

                    <Col lg={14} md={14}>
                        <div className="camera">
                            <Webcam
                                width={'100%'}
                                height={'50%'}
                                ref={webCamRef}
                                audio={mute}
                                imageSmoothing={true}
                                screenshotFormat="image/jpeg"
                                screenshotQuality={1}
                                mirrored={mirrored}
                                videoConstraints={{
                                    facingMode: "user",
                                    deviceId: deviceId
                                }}
                            />
                        </div>
                    </Col>

                    <Col className="camera-controls"
                        xl={24}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}>
                        <Space align='center' wrap={true}>
                            <Tooltip title="Audio">
                                <Switch
                                    defaultChecked
                                    onChange={setMute}
                                    checkedChildren={<AudioOutlined />}
                                    unCheckedChildren={<AudioMutedOutlined />}
                                />
                            </Tooltip>

                            <Tooltip title="Flip Camera">
                                <Switch
                                    defaultChecked
                                    onChange={setMirrored}
                                />
                            </Tooltip>

                            <Select
                                placeholder="Select the device"
                                onChange={setDeviceId}
                                defaultChecked
                            >
                                {devices.map((device, key) => <Option value={device.deviceId} key={key}>{device.label || `Device ${key + 1}`}</Option>)}
                            </Select>

                            <Button type="primary" ghost onClick={startRecording} disabled={capturing}>
                                Start Recording
                            </Button>

                            <Button danger onClick={stopRecording} disabled={!capturing}>
                                Stop Recording
                            </Button>

                            {recordedChunks.length > 0 && <Button onClick={handleDownload}>Download</Button>}
                        </Space>
                    </Col>

                    {/* <button onClick={() => audio.play()}>click</button> */}
                </Row>
            </Card>
        </div>
    )
}

export default MomentDetection