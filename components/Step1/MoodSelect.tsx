import { RadioGroup, Stack, Text, useRadioGroup } from '@chakra-ui/react'
import { useController, useFormContext } from 'react-hook-form'
import { Box, Heading } from '@chakra-ui/layout'
import { BiHappyAlt } from 'react-icons/bi'
import { RiEmotionNormalLine } from 'react-icons/ri'
import { FaRegSadTear } from 'react-icons/fa'
import { ErrorMessage, FormValues } from '../../pages/index'
import { RadioCard } from '../RadioCard'

const options = [
	{ label: 'Good', value: 'good', icon: BiHappyAlt },
	{ label: 'OK', value: 'ok', icon: RiEmotionNormalLine },
	{ label: 'Sad', value: 'sad', icon: FaRegSadTear },
]

const MoodSelect = () => {
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
	)
}

export default MoodSelect
