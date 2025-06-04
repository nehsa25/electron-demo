import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';
import './styles.css';
import styled from 'styled-components';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import BoxVisualization from './vizs/BoxVisualization';
import SphereVisualization from './vizs/SphereVisualization';
import TorusKnotVisualization from './vizs/TorusKnotVisualization';

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #000;
    color: #fff;
    font-family: sans-serif;
    overflow: hidden;
`;

const Header = styled.h1`
    font-size: 2em;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #4CAF50;
`;

const CounterContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const CounterButton = styled.button`
    background-color: #007acc;
    color: white;
    font-size: 1.5em;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 10px;

    &:hover {
        background-color: #005fa3;
    }
`;

const CountDisplay = styled.span`
    font-size: 2em;
    margin: 0 20px;
`;

const RecordingButton = styled.button`
    background-color: #e53935;
    color: white;
    font-size: 1.2em;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #b71c1c;
    }
`;

const VisualizationContainer = styled.div`
    width: 80%;
    height: 60%;
    min-height: 500px;
`;

const App = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const canvasRef = useRef(null);
    const chunks = useRef([]);
    const [canvasReady, setCanvasReady] = useState(false);

    // Effect to check when the canvas is ready
    useEffect(() => {
        if (canvasRef.current) {
            setCanvasReady(true);
        }
    }, [canvasRef.current]);

    const visualizationIndex = Math.abs(count % 3);

    const renderVisualization = () => {
        switch (visualizationIndex) {
            case 0:
                return <BoxVisualization position={[0, 0, 0]} />;
            case 1:
                return <SphereVisualization position={[0, 0, 0]} />;
            case 2:
                return <TorusKnotVisualization position={[0, 0, 0]} />;
            default:
                return <BoxVisualization position={[0, 0, 0]} />;
        }
    };

    const startRecording = async () => {
        if (canvasReady && canvasRef.current) {
            try {
                // Access the canvas directly from canvasRef
                const canvas = canvasRef.current;
                const stream = canvas.captureStream(30);

                const recorder = new MediaRecorder(stream, {
                    mimeType: 'video/webm',
                });

                recorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        chunks.current.push(event.data);
                    }
                };

                recorder.onstop = () => {
                    const blob = new Blob(chunks.current, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'visualization.webm';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    chunks.current = [];
                };

                recorder.start();
                setMediaRecorder(recorder);
                setRecording(true);
            } catch (error) {
                console.error("Error starting recording:", error);
            }
        } else {
            console.warn("Canvas not yet available for recording.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    return (
        <AppContainer>
            <Header>Change Visualization:</Header>
            <CounterContainer>
                <CounterButton onClick={() => dispatch(decrement())}>-</CounterButton>
                <CountDisplay>{count}</CountDisplay>
                <CounterButton onClick={() => dispatch(increment())}>+</CounterButton>
            </CounterContainer>

            <RecordingButton onClick={recording ? stopRecording : startRecording} disabled={!canvasReady}>
                {recording ? 'Stop Recording' : 'Start Recording'}
            </RecordingButton>

            <VisualizationContainer>
                <Canvas ref={canvasRef} camera={{ position: [0, 0, 5], fov: 75 }} onCreated={() => setCanvasReady(true)}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Environment preset="city" />
                    <OrbitControls />
                    {renderVisualization()}
                </Canvas>
            </VisualizationContainer>
        </AppContainer>
    );
};

export default App;