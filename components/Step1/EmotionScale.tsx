import { Box, Heading } from '@chakra-ui/layout'
import {
	Flex,
	Slider,
	SliderFilledTrack,
	SliderThumb,
	SliderTrack,
	Text,
} from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import { ErrorMessage, FormValues } from '../../pages/index'

const EmotionScale = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'emotions',
		control,
	})

	const amount = new Intl.NumberFormat('nl-NL', {
		style: 'currency',
		currency: 'EUR',
	}).format(field.value * 10000)

	return (
		<Box
			sx={{
				mb: 8,
				display: 'flex',
				flexDir: 'column',
				alignItems: 'center',
			}}
		>
			<Heading size='lg' sx={{ mt: 8 }}>
				Estimated home value
			</Heading>
			<Text sx={{ my: 4 }}>Use the slider to estimate the home value.</Text>
			<Heading>{amount}</Heading>
			<Flex sx={{ minH: '126px', width: '100%' }}>
				<Slider
					id='slider'
					min={0}
					max={100}
					value={field.value.intensity}
					maxWidth={['100%', '65%']}
					colorScheme='blue'
					onChange={(selected) => console.log(selected)}
					sx={{ mx: 'auto' }}
				>
					<SliderTrack sx={{ height: 1.5 }}>
						<SliderFilledTrack />
					</SliderTrack>
					<SliderThumb boxSize={6} />
				</Slider>
			</Flex>
			{errors.emotions && <ErrorMessage message={errors.emotions.message || ''} />}
		</Box>
	)
}
export default EmotionScale
