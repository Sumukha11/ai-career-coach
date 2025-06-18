"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { aiToolsList } from "./AiTools";
import { Skeleton } from "@/components/ui/skeleton";

type HistoryRecord = {
  createdAt: string;
  aiAgentType: string;
  recordId: string;
};

const History = () => {
  const [userHistory, setUserHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const GetHistory = async () => {
    try {
      setLoading(true);
      const result = await axios.get("/api/history");
      console.log("Fetched History:", result.data);
      setUserHistory(result.data);
    } catch (err) {
      console.error("Failed to fetch history", err);
    } finally {
      setLoading(false);  // ✅ Always stop loading even if error occurs
    }
  };

  const GetAgentName = (path: string) => {
    return aiToolsList.find((item) => item.path === path);
  };

  useEffect(() => {
    GetHistory();
  }, []);

  return (
    <div className="mt-5 p-5 border rounded-xl">
      <h2 className="font-bold text-lg">Previous History</h2>
      <p>What you had previously worked on</p>

      {loading && (
        <div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="my-2">
              <Skeleton className="h-[20px] w-[100px] rounded-md" />
            </div>
          ))}
        </div>
      )}

      {!loading && userHistory.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">No history available.</p>
      )}

      {!loading &&
        userHistory
          .slice(0, 10) // No need to sort, API provides sorted data
          .map((history, index) => {
            const agent = GetAgentName(history.aiAgentType);
            return (
              <a
                key={index}
                href={`${history.aiAgentType}/${history.recordId}`}
                className="block border border-gray-300 rounded p-2 hover:bg-gray-50 my-1"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {agent?.icon ? (
                      <Image
                        src={agent.icon}
                        alt={agent.name}
                        width={16}
                        height={16}
                      />
                    ) : (
                      <div className="w-4 h-4 bg-gray-300 rounded" />
                    )}
                    <span className="text-sm">
                      {agent?.name || "Unknown Tool"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(history.createdAt).toLocaleString()}
                  </span>
                </div>
              </a>
            );
          })}
    </div>
  );
};

export default History;
