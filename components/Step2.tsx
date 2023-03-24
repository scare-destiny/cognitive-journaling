import { Box, Heading } from '@chakra-ui/layout'
import { Text, Textarea, useRadioGroup } from '@chakra-ui/react'

import { useController, useFormContext } from 'react-hook-form'
import { GiBirdHouse, GiGreenhouse, GiSydneyOperaHouse } from 'react-icons/gi'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'

export const Step2Schema = yup.object().shape({
	situation: yup.string().required('This value is required.'),
})

// const options = [
// 	{ label: 'Family home', value: 'family-home', icon: GiGreenhouse },
// 	{
// 		label: 'Townhouse',
// 		value: 'townhouse',
// 		icon: GiSydneyOperaHouse,
// 	},
// 	{ label: 'Condo', value: 'condo', icon: GiBirdHouse },
// ]

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
	)
}
