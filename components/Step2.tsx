import { Box, Heading } from '@chakra-ui/layout'
import { Text, Textarea, useRadioGroup } from '@chakra-ui/react'

import { useController, useFormContext } from 'react-hook-form'
import { GiBirdHouse, GiGreenhouse, GiSydneyOperaHouse } from 'react-icons/gi'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'

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

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'situation',
		defaultValue: field.value,
		onChange: field.onChange,
	})

	const group = getRootProps()

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
