import React from 'react'

export default function BlogLastUpdated({ updated_at }: { updated_at: string }) {
  return (
    <div className="mt-8 text-xs text-gray-400">
      Last updated: {new Date(updated_at).toLocaleDateString()}
    </div>
  )
}
