import { Flex, Box } from '@chakra-ui/react'
import { SquareFrame } from '../board/SquareFrame'
import { SquareCenter } from '../board/SquareCenter'
import { useStore } from '../../provider/store/StoreProvider'
import { useParams } from 'react-router-dom'
import { useConnectFourGame } from '../../hooks/connectFour/useConnectFourGame'

export function ConnectFour() {
  const {
    currentSeason: { currentGame },
  } = useStore()

  const { gameId } = useParams()
  useConnectFourGame({ gameId })

  if (!currentGame) {
    return null
  }

  return (
    <Flex
      justifyContent='center'
      h='full'
      pt={{ starting: '20', '3xl': '0' }}
      alignItems={{ starting: 'flex-start', '3xl': 'center' }}
    >
      <Box
        overflow='hidden'
        h='fit-content'
        boxShadow='1px 1px 3px #fabd2e11, 4px 4px 6px #fabd2e11, 8px 8px 10px #fabd2e11, 16px 16px 18px #fabd2e11'
        rounded='md'
      >
        {currentGame.board.map((row, rowIndex) => {
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
