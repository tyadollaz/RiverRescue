import { useEffect, useRef } from 'react'
import { initGame, destroyGame } from './game/GameInit'

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current!
    const game = initGame(el)
    return () => destroyGame(game)
  }, [])

  return (
    <div style={{height:'100%', display:'grid', placeItems:'center'}}>
      <div ref={containerRef} style={{ width: 960, height: 540, border: '2px solid #7cd9ff'}} />
    </div>
  )
}
