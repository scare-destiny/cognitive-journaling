import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { FormProvider, useForm } from 'react-hook-form'
import { GiRocketFlight } from 'react-icons/gi'
import { Step1, Step1Schema } from '../components/Step1'
import { Step2, Step2Schema } from '../components/Step2'

const steps = [
	{
		label: 'Step 1',
		description: 'Share Your Mood And Emotions',
		content: <Step1 />,
	},
	{
		label: 'Step 2',
		description: 'Describe Situation And Your Thoughts',
		content: <Step2 />,
	},
	{
		label: 'Step 3',
		description: 'Evidence Against And For',
	},
	{
		label: 'Step 4',
		description: 'Cognitive Distortions And Alternative Thoughts',
	},
	{
		label: 'Step 5',
		description: 'Outcome And Action Plan',
	},
]

const INITIAL_VALUES = {
	mood: '',
	situation: '',
	emotions: [],
	automaticThoughts: '',
	evidenceSupporting: '',
	evidenceAgainst: '',
	cognitiveDistortions: [],
	alternativeThoughts: '',
	outcome: '',
	actionPlan: '',
}

export type FormValues = typeof INITIAL_VALUES

const schemaArr = [Step1Schema, Step2Schema]

export const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<Box
			sx={{
				p: 2,
				rounded: 'md',
				boxShadow: 'sm',
				bg: useColorModeValue('gray.50', 'gray.800'),
			}}
		>
			<Text fontSize='md' color='red.400' fontWeight={'bold'}>
				{message}
			</Text>
		</Box>
	)
}

const CognitiveJournalingForm = ({
	variant,
}: {
	variant: 'circles' | 'circles-alt' | 'simple' | undefined
}) => {
	const { nextStep, prevStep, reset, activeStep } = useSteps({
		initialStep: 0,
	})

	const methods = useForm<FormValues>({
		resolver: yupResolver(schemaArr[activeStep]),
		defaultValues: INITIAL_VALUES,
	})

	const { handleSubmit } = methods

	const onSubmit = () => {
		if (activeStep === steps.length - 1) {
			// handle submission here
		}
		nextStep()
	}

	const bg = useColorModeValue('gray.50', 'gray.800')

	const handleReset = () => {
		reset()
		methods.reset()
	}

	return (
		<Box sx={{ mt: 24 }}>
			<FormProvider {...methods}>
				<Steps variant={variant} activeStep={activeStep} colorScheme='blue'>
					{steps.map(({ label, content, description }) => (
						<Step label={label} key={label} description={description}>
							{content}
						</Step>
					))}
				</Steps>
			</FormProvider>
			{activeStep === steps.length ? (
				<Flex p={4} sx={{ flexDir: 'column', alignItems: 'center' }}>
					<Box sx={{ p: 8 }}>
						<GiRocketFlight size={64} />
					</Box>
					<Heading>Woohoo!</Heading>
					<Box sx={{ mb: 8, mt: 4 }}>
						<Text>You&apos;ve completed the form!</Text>
					</Box>
					<Button mx='auto' onClick={() => handleReset()}>
						Reset
					</Button>
				</Flex>
			) : (
				<Flex width='100%' justify='center'>
					<Button
						isDisabled={activeStep === 0}
						mr={4}
						onClick={prevStep}
						variant='ghost'
					>
						Prev
					</Button>
					<Button onClick={() => handleSubmit(onSubmit)()} type='submit'>
						{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
					</Button>
				</Flex>
			)}
			<Box as='pre' bg={bg} rounded='md' width='100%' p={4} mt={8}>
				<code>{JSON.stringify(methods.watch(), null, 2)}</code>
			</Box>
		</Box>
	)
}

export default CognitiveJournalingForm
