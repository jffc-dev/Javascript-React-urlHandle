'use client'

import { Button } from "@mantine/core"
import { useRouter } from "next/navigation";

export const Home = () => {
    const router = useRouter();

  return (
    <div>
        <Button onClick={() => router.push('/string/random')}>
            Go to Target
        </Button>
    </div>
  )
}