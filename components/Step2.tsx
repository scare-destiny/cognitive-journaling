import { Box, Heading } from '@chakra-ui/layout'
import { Text, Textarea, List, ListItem, ListIcon } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useController, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'
import { Key } from 'react'

export const Step2Schema = yup.object().shape({
	situation: yup.string().required('This value is required.'),
	automaticThoughts: yup
		.string()
		.required('Please share your automatic thoughts'),
})

const AutomaticThoughts = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'automaticThoughts',
		control,
		defaultValue: '',
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
				Please share your thoughts
			</Heading>
			<Text sx={{ mt: 4 }}>
				Write down the automatic thoughts that occurred during the situation (i.e.,
				what you were thinking).
			</Text>
			<Textarea
				sx={{ mt: 8 }}
				name='emotions'
				onChange={field.onChange}
				size='lg'
				maxW='600px'
				defaultValue={field.value}
			/>
			{errors.automaticThoughts && (
				<ErrorMessage message={errors.automaticThoughts.message || ''} />
			)}
		</Box>
	)
}

export const Step2 = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'situation',
		control,
	})

	const methods = useFormContext()
	const mood = methods.getValues('mood')
	const emotions = methods.getValues('emotions')

	return (
		<>
			<Box
				sx={{
					mb: 8,
					display: 'flex',
					flexDir: 'column',
					alignItems: 'center',
				}}
			>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					So your mood is {mood}.{' '}
				</Text>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					You also experience following emotions:{' '}
				</Text>
				<List mt={2} spacing={3}>
					{emotions.map((emotion: Key | null | undefined) => (
						<ListItem key={emotion} fontWeight={200}>
							{' '}
							<ListIcon as={CheckIcon} color='green.500' />
							{emotion?.value}
						</ListItem>
					))}
				</List>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					Please share more details.
				</Text>
				<Heading size='lg' sx={{ mt: 8 }}>
					Situation or event that led to the emotional response.
				</Heading>
				<Text sx={{ mt: 4 }}>Please type your response below.</Text>
				<Textarea
					onChange={field.onChange}
					mb={4}
					name='Step2'
					defaultValue={field.value}
					sx={{ mt: 8 }}
					maxW='600px'
				/>
				{/* <RadioGroup mb={4} name='Step2' sx={{ mt: 8 }}>
				<Stack {...group} spacing={4} direction='row'>
					{options.map(({ value, label, icon }, i) => {
						const radio = getRadioProps({ value })
						return (
							<RadioCard icon={icon} key={value} {...radio}>
								{label}
							</RadioCard>
						)
					})}
				</Stack>
			</RadioGroup> */}
				{errors.situation && (
					<ErrorMessage message={errors.situation.message || ''} />
				)}
			</Box>
			<AutomaticThoughts />
		</>
	)
}
