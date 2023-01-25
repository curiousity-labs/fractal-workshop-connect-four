import { Flex, Box } from '@chakra-ui/react'
import { SquareFrame } from './SquareFrame'
import { SquareCenter } from './SquareCenter'
import { useStore } from '../../provider/store/StoreProvider'
import { useParams } from 'react-router-dom'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'
import { useDetectWinningPieces } from '../../hooks/connectFour/useDetectWinningPieces'
import { useMemo } from 'react'

export function Board() {
  const {
    currentSeason: { currentGame },
  } = useStore()

  const { gameId } = useParams()
  useConnectFourGame({ gameId })

  const { connectedPieces } = useDetectWinningPieces()

  const currentBoard = useMemo(() => {
    if (!currentGame) {
      return []
    }
    const { board } = currentGame;
    if (!connectedPieces.length) {
      return board
    }

    const updatedBoard = board.map(row => row.map((square) => {
      if(connectedPieces.includes(square.location)) {
        return {...square, connected: true}
      }
      return square;
    }))
    return updatedBoard
  }, [currentGame, connectedPieces])
  if (!currentGame) {
    return null
  }



  return (
    <Flex
      justifyContent='center'
      h='full'
      pt={{ starting: '20', '3xl': '36' }}
      alignItems='flex-start'
    >
      <Box
        h='fit-content'
        boxShadow='1px 1px 3px #fabd2e11, 4px 4px 6px #fabd2e11, 8px 8px 10px #fabd2e11, 16px 16px 18px #fabd2e11'
        rounded='md'
      >
        {currentBoard.map((row, rowIndex) => {
          return (
            <Flex key={rowIndex} borderX='1px solid' borderColor='gold.500'>
              {row.map((square) => {
                return (
                  <SquareFrame key={square.location} square={square}>
                    <SquareCenter square={square} rowIndex={rowIndex} />
                  </SquareFrame>
                )
              })}
            </Flex>
          )
        })}
      </Box>
    </Flex>
  )
}