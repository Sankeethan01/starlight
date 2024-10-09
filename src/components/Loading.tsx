import React from 'react'

const Loading = ({ loadText }: { loadText: string }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid mb-4"></div>
      <p className="pt-2 text-xl font-medium text-gray-700">{loadText}</p>
    </div>
  )
}

export default Loading
