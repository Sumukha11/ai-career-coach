import React from 'react'
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './TurboNode';

const nodeTypes={
    turbo:TurboNode
}


function RoadmapCanvas({initialNodes,initialEdges}:any) {
    // const initialNodes = [
    //     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
    //     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
    // ];
    // const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
  
    return (
    <div
      style={{
        width: '100%',
        height: '100vh',  // Full viewport height for a spacious layout
        background: '#f9fafb', // Light modern background (Tailwind's gray-50)
      }}
      className="rounded-lg shadow-inner"
    >
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        style={{
          fontFamily: 'Inter, sans-serif', // Modern clean font
          color: '#111827',               // Tailwind's gray-900 for text
        }}
      >
        <Controls 
          showInteractive={false} 
          position="top-right" 
          style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} 
        />

        <MiniMap 
          nodeColor={() => '#3b82f6'} // blue-500
          maskColor="rgba(0,0,0,0.1)" // subtle mask, lets nodes pop
          nodeStrokeWidth={2}
          nodeBorderRadius={4}
        />


        <Background
          //@ts-ignore
          variant="dots"
          gap={20}
          size={1.5}
          color="#d1d5db" // Tailwind's gray-300 dots for subtle grid
        />
      </ReactFlow>
    </div>
  )
}

export default RoadmapCanvas
