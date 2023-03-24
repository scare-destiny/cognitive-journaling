import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'
import MultiStepFormContainer from '../components/FormContainer'

const theme = extendTheme({
	components: {
		Steps,
	},
})

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
			<MultiStepFormContainer />
		</ChakraProvider>
	)
}

export default MyApp
