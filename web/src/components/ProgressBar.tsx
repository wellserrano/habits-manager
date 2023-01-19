import * as Progress from '@radix-ui/react-progress';
import { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(props.progress);
  },[])
  
  return (
    <Progress.Root className='h-3 relative overflow-hidden bg-zinc-700 rounded-xl w-full mt-4'>
      <Progress.Indicator className='h-3 w-3/4 rounded-xl bg-violet-500 transition-transform delay-200'
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  )
}

