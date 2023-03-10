import { useMemo, useRef } from 'react'
import { ConnectSquare } from '../../types'
import { Flex, keyframes } from '@chakra-ui/react'
import { TEAM } from '../../constants'
import { useStore } from '../../provider/store/StoreProvider'
import { rotateAnimation } from '../../utils/animation'

export function SquareCenter({ square, rowIndex }: { square: ConnectSquare; rowIndex: number }) {
  const animateDownTraveling = keyframes`
    0%   { opacity: 100%; transform: translateY(-${800 - (rowIndex || 1 * 100)}%) }
    100% { opacity: 100%;  transform: translateY(0%) }
`
  const animationDownTraveling = `${animateDownTraveling} ${2 + (rowIndex || 1)}s ease-out 1`

  const animatedChipRef = useRef<HTMLDivElement>(null)
  const {
    currentSeason: { currentGame },
  } = useStore()

  const shouldRunAnimation = useMemo(() => {
    if (!currentGame) {
      return false
    }
    const { lastTurnData } = currentGame
    if (!lastTurnData) {
      return false
    }
    const { lastColumn, lastRow } = lastTurnData
    return square.location === `${lastRow}:${lastColumn}`
  }, [currentGame, square])

  const CoinIcon = square.team ? TEAM[square.team - 1].CoinIcon : undefined
  return (
    <Flex
      justifyContent='center'
      pl={{ min0: 1, min400: 2, min1920: 3 }}
      pt={{ min0: 1, min400: 2, min1920: 3 }}
      ref={animatedChipRef}
      animation={shouldRunAnimation ? animationDownTraveling : undefined}
      transform='translateY(0)'
      position='absolute'
      zIndex={-1}
    >
      {!!CoinIcon && (
        <CoinIcon
          id={square.location}
          boxSize={{ min0: '2.75rem', min400: 16, min600: 20, min1920: '6.5rem' }}
          zIndex={0}
          animation={square.connected ? rotateAnimation : undefined}
        />
      )}
    </Flex>
  )
}
