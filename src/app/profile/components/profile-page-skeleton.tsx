"use client"

import { Card } from "@mantine/core"

export default function ProfilePageSkeleton() {
  return (
    <div className="flex w-full min-h-screen bg-gray-50">

      {/* Main Content Skeleton */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-32 h-6 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-20 bg-gray-200 rounded-md h-9"></div>
              <div className="w-20 bg-gray-200 rounded-md h-9"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto animate-pulse">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Profile Section */}
            <div className="flex items-start gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-full"></div>

              {/* Profile Form */}
              <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i}>
                    <div className="w-24 h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                    {i === 1 && <div className="w-32 h-3 mt-1 bg-gray-200 rounded"></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Bio Section */}
            <div>
              <div className="w-12 h-4 mb-2 bg-gray-200 rounded"></div>
              <div className="w-full h-24 bg-gray-200 rounded-md"></div>
              <div className="w-64 h-3 mt-2 bg-gray-200 rounded"></div>
            </div>

            {/* Metro Card Information */}
            <Card className="bg-gray-100 border-none">
              <Card.Section className="p-6">
                <div className="w-48 h-6 mb-6 bg-gray-200 rounded"></div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <div className="w-32 h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                  </div>

                  <div>
                    <div className="w-24 h-4 mb-2 bg-gray-200 rounded"></div>
                    <div className="w-full h-10 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </Card.Section>
            </Card>

            {/* Metefy Token */}
            <Card className="bg-gray-100 border-none">
              <Card.Section className="p-6">
                <div className="w-32 h-6 mb-6 bg-gray-200 rounded"></div>

                <div className="py-8 text-center">
                  <div className="w-64 h-4 mx-auto mb-4 bg-gray-200 rounded"></div>
                  <div className="w-48 mx-auto bg-gray-200 rounded-md h-9"></div>
                </div>
              </Card.Section>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
