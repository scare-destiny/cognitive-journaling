import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

const theme = extendTheme({
	components: {
		Steps,
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
