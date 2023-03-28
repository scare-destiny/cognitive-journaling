import { Box, Heading } from '@chakra-ui/layout'
import { Text, Textarea, List, ListItem, ListIcon } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useController, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { ErrorMessage, FormValues } from '../pages/index'

export const Step5Schema = yup.object().shape({
	outcome: yup.string().required('Please share your thoughts.'),
	actionPlan: yup.string().required('Please share the action plan.'),
})

const ActionPlan = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'actionPlan',
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
				Action plan.
			</Heading>
			<Text sx={{ mt: 4 }}>
				Describe any action steps or coping strategies to address the situation and
				improve emotional well-being.
			</Text>
			<Textarea
				sx={{ mt: 8 }}
				name='actionPlan'
				onChange={field.onChange}
				size='lg'
				maxW='600px'
				defaultValue={field.value}
			/>
			{errors.actionPlan && (
				<ErrorMessage message={errors.actionPlan.message || ''} />
			)}
		</Box>
	)
}

export const Step5 = () => {
	const { control } = useFormContext<FormValues>()

	const {
		field,
		formState: { errors },
	} = useController({
		name: 'outcome',
		control,
	})

	const methods = useFormContext()
	const cognitiveDistortions = methods.getValues('cognitiveDistortions')
	const alternativeThoughts = methods.getValues('alternativeThoughts')

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
					List of cognitive distortions:{' '}
				</Text>
				<List mt={2} spacing={3}>
					{cognitiveDistortions.map((cognitiveDistortion) => (
						<ListItem key={cognitiveDistortion} fontWeight={200}>
							{' '}
							<ListIcon as={CheckIcon} color='green.500' />
							{cognitiveDistortion?.value}
						</ListItem>
					))}
				</List>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					Alternative thoughts:{' '}
				</Text>
				<Text sx={{ mt: 4 }} fontWeight={200}>
					{alternativeThoughts}
				</Text>
				<Heading size='lg' sx={{ mt: 8 }}>
					Outcome.
				</Heading>
				<Text sx={{ mt: 4 }}>
					Reflect on how the alternative thoughts affect the emotions and situation.
				</Text>
				<Textarea
					onChange={field.onChange}
					mb={4}
					name='Step3'
					defaultValue={field.value}
					sx={{ mt: 8 }}
					maxW='600px'
				/>
				{errors.outcome && <ErrorMessage message={errors.outcome.message || ''} />}
			</Box>
			<ActionPlan />
		</>
	)
}
