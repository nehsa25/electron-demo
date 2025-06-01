import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';
import './styles.css';

// Import R3F components
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// Import your visualization components
import BoxVisualization from './vizs/BoxVisualization';
import SphereVisualization from './vizs/SphereVisualization';
import TorusKnotVisualization from './vizs/TorusKnotVisualization';

const App = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

    // Determine which visualization to show based on the count
    // We'll use a modulo operator (%) to cycle through visualizations
    const visualizationIndex = Math.abs(count % 3); // 0, 1, 2, 0, 1, 2...

    const renderVisualization = () => {
        switch (visualizationIndex) {
            case 0:
                return <BoxVisualization position={[0, 0, 0]} />;
            case 1:
                return <SphereVisualization position={[0, 0, 0]} />;
            case 2:
                return <TorusKnotVisualization position={[0, 0, 0]} />;
            default:
                return <BoxVisualization position={[0, 0, 0]} />; // Fallback
        }
    };

    return (
        <div className="app">
            <h1>Change Visualization:</h1>
            <div className="counter">
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>

            <div className="visualization">
                {/* R3F Canvas component */}
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    {/* Lighting for the scene */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    {/* Environment for realistic lighting and reflections (optional but good) */}
                    <Environment preset="city" /> {/* Or 'sunset', 'dawn', 'warehouse', 'forest', 'apartment', 'studio', 'fields', 'parque', 'lobby' */}

                    {/* OrbitControls allows you to drag to rotate the camera */}
                    <OrbitControls />

                    {/* Render the selected visualization */}
                    {renderVisualization()}
                </Canvas>
            </div>
        </div>
    );
};

export default App;