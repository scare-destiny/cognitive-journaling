import { Box, Heading } from '@chakra-ui/layout'
import { Text, Textarea } from '@chakra-ui/react'

import { useController, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'

export const Step3Schema = yup.object().shape({
	evidenceSupporting: yup.string().required('This value is required.'),
	evidenceAgainst: yup.string().required('Please share your automatic thoughts'),
})

const EvidenceAgainst = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'evidenceAgainst',
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
				Evidence against the thoughts.
			</Heading>
			<Text sx={{ mt: 4 }}>
				List any evidence that contradicts the automatic thoughts.
			</Text>
			<Textarea
				sx={{ mt: 8 }}
				name='emotions'
				onChange={field.onChange}
				size='lg'
				maxW='600px'
				defaultValue={field.value}
			/>
			{errors.evidenceAgainst && (
				<ErrorMessage message={errors.evidenceAgainst.message || ''} />
			)}
		</Box>
	)
}

export const Step3 = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'evidenceSupporting',
		control,
	})

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
					Evidence supporting the thoughts.
				</Heading>
				<Text sx={{ mt: 4 }}>
					List any evidence that supports the automatic thoughts.
				</Text>
				<Textarea
					onChange={field.onChange}
					mb={4}
					name='Step3'
					defaultValue={field.value}
					sx={{ mt: 8 }}
					maxW='600px'
				/>
				{errors.evidenceSupporting && (
					<ErrorMessage message={errors.evidenceSupporting.message || ''} />
				)}
			</Box>
			<EvidenceAgainst />
		</>
	)
}
