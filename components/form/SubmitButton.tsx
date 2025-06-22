import React from 'react'

export default function SubmitButton({text, disabled}: {text:string, disabled?:boolean}) {
  return (
    <div className="text-right">
        <button
        type="submit"
        disabled={disabled}
        className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700"
        >
            {text}
        </button>
    </div>
  )
}
