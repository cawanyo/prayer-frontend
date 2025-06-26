import React from 'react'
import { Button } from '../ui/button'

export default function SubmitButton({text, disabled}: {text:string, disabled?:boolean}) {
  return (
    <div className="text-right">
        <Button disabled={disabled}>
          {text}
        </Button>
    </div>
  )
}
