import { useFormContext, useController } from 'react-hook-form'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { ErrorMessage, FormValues } from '../../pages/index'
import { EmotionScale } from './index.js'
import { emotions } from '../../data/data'

const EmotionsSelect = ({ setSelectedEmotions }) => {
	const { control } = useFormContext()
	const {
		field,
		formState: { errors },
	} = useController({
		name: 'emotions',
		control,
		defaultValue: [],
	})

	console.log(field.value)

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
				Pick any emotions you experience. And don&apos;t worry, your data won&apos;t
				be sent anywhere
			</Text>
			<Select
				isMulti
				name='emotions'
				options={emotions}
				closeMenuOnSelect={false}
				onChange={(selected) => {
					field.onChange(selected)
				}}
				size='lg'
				colorScheme='blue'
			/>
			{errors.emotions && <ErrorMessage message={errors.emotions.message || ''} />}
			{field.value.length > 0 &&
				field.value.map((emotion) => (
					<EmotionScale key={emotion} emotion={emotion} />
				))}
		</Box>
	)
}

export default EmotionsSelect
