import { Box, Heading } from '@chakra-ui/layout'
import { RadioGroup, Stack, Text, useRadioGroup } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useController, useFormContext } from 'react-hook-form'
import { BiHappyAlt } from 'react-icons/bi'
import { RiEmotionNormalLine } from 'react-icons/ri'
import { FaRegSadTear } from 'react-icons/fa'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'
import { RadioCard } from './RadioCard'
import { emotions } from '../data/data'

export const Step1Schema = yup.object().shape({
	mood: yup.string().required('This value is required.'),
	emotions: yup.array().min(1, 'Please share your mood.'),
})

const options = [
	{ label: 'Good', value: 'good', icon: BiHappyAlt },
	{ label: 'OK', value: 'ok', icon: RiEmotionNormalLine },
	{ label: 'Sad', value: 'sad', icon: FaRegSadTear },
]

const EmotionsSelect = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'emotions',
		control,
		defaultValue: [],
	})

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
			<Text sx={{ mt: 4 }}>Pick any emotions you experience.</Text>
			<Select
				isMulti
				name='emotions'
				options={emotions}
				closeMenuOnSelect={false}
				onChange={field.onChange}
				size='lg'
			/>
			{errors.emotions && <ErrorMessage message={errors.emotions.message || ''} />}
		</Box>
	)
}

export const Step1 = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'mood',
		control,
	})

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'mood',
		defaultValue: field.value,
		onChange: field.onChange,
	})

	const group = getRootProps()

	return (
		<>
			<EmotionsSelect />
			<Box
				sx={{
					mb: 8,
					display: 'flex',
					flexDir: 'column',
					alignItems: 'center',
				}}
			>
				<Heading size='lg' sx={{ mt: 8 }}>
					How are you feeling today?
				</Heading>
				<Text sx={{ mt: 4 }}>Select an icon below to get started.</Text>
				<RadioGroup mb={4} name='Step1' defaultValue={field.value} sx={{ mt: 8 }}>
					<Stack {...group} spacing={4} direction='column'>
						{options.map(({ value, label, icon }, i) => {
							const radio = getRadioProps({ value })
							return (
								<RadioCard icon={icon} key={value} {...radio}>
									{label}
								</RadioCard>
							)
						})}
					</Stack>
				</RadioGroup>
				{errors.mood && <ErrorMessage message={errors.mood.message || ''} />}
			</Box>
		</>
	)
}
