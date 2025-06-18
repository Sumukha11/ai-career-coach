import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import React from "react";

function TurboNode({ data }: any) {
  return (
    <div className="relative w-72 rounded-xl border border-gray-300 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
      
      <div className="mb-2">
        <div className="font-semibold text-gray-800 text-base mb-1">
          {data.title}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{data.description}</p>
      </div>

      <Link
        href={data?.link}
        target="_blank"
        className="inline-block mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        Learn More →
      </Link>

      {/* Decorative glow on hover */}
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] pointer-events-none transition-all duration-300"></div>

      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-500 w-3 h-3 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-500 w-3 h-3 border-2 border-white"
      />
    </div>
  );
}

export default TurboNode;
