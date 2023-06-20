import { useFormContext, useController } from 'react-hook-form'
import {
	Box,
	Heading,
	Text,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
} from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { ErrorMessage, FormValues } from '../../pages/index'
import { emotions } from '../../data/data'

const EmotionsSelect = () => {
	const { control } = useFormContext()
	const {
		field,
		formState: { errors },
	} = useController({
		name: 'emotions',
		control,
		defaultValue: [],
	})

	const handleChange = (selected) => {
		const newEmotions = selected.map((emotion) => {
			const existingEmotion = field.value.find((e) => e.value === emotion.value)
			return existingEmotion ? existingEmotion : { ...emotion, intensityBefore: 0 }
		})
		field.onChange(newEmotions)
	}

	const handleIntensityChange = (emotionValue, intensityBefore) => {
		const updatedEmotions = field.value.map((emotion) =>
			emotion.value === emotionValue ? { ...emotion, intensityBefore } : emotion
		)
		field.onChange(updatedEmotions)
	}

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
				Which emotions do you experience right now?
			</Heading>
			<Text sx={{ mt: 4, mb: 4 }}>
				Pick any emotions you experience and mark their intensity. And don&apos;t
				worry, your data won&apos;t be sent anywhere.
			</Text>
			<Select
				isMulti
				name='emotions'
				options={emotions}
				closeMenuOnSelect={false}
				onChange={handleChange}
				size='lg'
				colorScheme='blue'
			/>
			{field.value.map((emotion) => (
				<Box key={emotion.value}>
					<Text>{emotion.label}</Text>
					<Slider
						min={0}
						max={10}
						step={1}
						value={emotion.intensityBefore}
						onChange={(value) => handleIntensityChange(emotion.value, value)}
						width='200px'
						colorScheme='pink'
					>
						<SliderTrack>
							<SliderFilledTrack />
						</SliderTrack>
						<SliderThumb boxSize={6} ml={2}>
							{emotion.intensityBefore}
						</SliderThumb>
					</Slider>
				</Box>
			))}
			{errors.emotions && <ErrorMessage message={errors.emotions.message || ''} />}
		</Box>
	)
}

export default EmotionsSelect
