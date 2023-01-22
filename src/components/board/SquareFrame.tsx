import { ReactNode } from 'react'
import { ConnectSquare } from '../../types'
import { Box, Center } from '@chakra-ui/react'

export function SquareFrame({ square, children }: { square: ConnectSquare; children?: ReactNode }) {
  const isOutOfBounds = square.location.includes('x')
  return (
    <Box
      id={square.location}
      key={square.location}
      position='relative'
      >
      <Center
        w="7rem"
        h={isOutOfBounds ? '1rem' : '7rem'}
        zIndex={0}
        border={!isOutOfBounds ? '20px solid': undefined}
        borderColor="#ffe19dff"
        sx={{
          '&': {
            WebkitMarginStart: '0px !important',
            marginInlineStart: '0px',
          },
          '&:before': {
            content: '""',
            paddingBottom: '50%',
            position: 'absolute',
            boxSize: '65%',
            top: '50%',
            left: '50%',
            zIndex: 8,
            borderRadius: '100%',
            transform: 'translate(-50%, -50%)',
            boxShadow: !isOutOfBounds ? '0px 0px 0px 16px #ffda85ff, 0px 0px 0px 18px #ffe19dff' : undefined
          },
        }}>
        {children}
      </Center>
    </Box>
  )
}