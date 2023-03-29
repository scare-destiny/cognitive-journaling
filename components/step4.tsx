import { Box, Heading, Text } from '@chakra-ui/layout'
import { AutoResizeTextarea } from './AutoResizeTextArea'
import { Select } from 'chakra-react-select'
import { useController, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'
import { distortions } from '../data/data'

export const Step4Schema = yup.object().shape({
	cognitiveDistortions: yup
		.array()
		.min(1, 'Please pick at least one cognitive distortion.'),
	alternativeThoughts: yup
		.string()
		.required('Please share your automatic thoughts'),
})

const AlternativeThoughts = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'alternativeThoughts',
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
				Alternative thoughts.
			</Heading>
			<Text sx={{ mt: 4, mb: 4 }}>
				Generate more balanced, rational alternative thoughts to challenge the
				initial automatic thoughts.
			</Text>
			<AutoResizeTextarea
				sx={{ mt: 8 }}
				name='alternativeThoughts'
				onChange={field.onChange}
				size='lg'
				maxW='600px'
				defaultValue={field.value}
			/>
			{errors.alternativeThoughts && (
				<ErrorMessage message={errors.alternativeThoughts.message || ''} />
			)}
		</Box>
	)
}

export const Step4 = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'cognitiveDistortions',
		control,
	})

	const methods = useFormContext()
	const evidenceSupporting = methods.getValues('evidenceSupporting')
	const evidenceAgainst = methods.getValues('evidenceAgainst')

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
					Evidence supporting you thoughts:{' '}
				</Text>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					{evidenceSupporting}
				</Text>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					Evidence against your thoughts:{' '}
				</Text>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					{evidenceAgainst}
				</Text>
				<Heading size='lg' sx={{ mt: 8 }}>
					Cognitive distortions:
				</Heading>
				<Text sx={{ mt: 4, mb: 4 }}>
					Identify the cognitive distortions present in the automatic thoughts (e.g.,
					all-or-nothing thinking, overgeneralization, mental filtering, etc.).
					reference.
				</Text>
				<Select
					isMulti
					name='cognitiveDistortions'
					options={distortions}
					closeMenuOnSelect={false}
					onChange={field.onChange}
					size='lg'
					defaultValue={field.value}
				/>
				{errors.cognitiveDistortions && (
					<ErrorMessage message={errors.cognitiveDistortions.message || ''} />
				)}
			</Box>
			<AlternativeThoughts />
		</>
	)
}
