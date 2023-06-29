import { v4 as uuidv4 } from 'uuid'
import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	List,
	ListItem,
	ListIcon,
	Highlight,
	useColorModeValue,
	Container,
	Center,
	useToast,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { FormProvider, useForm } from 'react-hook-form'
import { GiRocketFlight } from 'react-icons/gi'
import { Step1, Step1Schema } from '../components/Step1/Step1'
import { Step2, Step2Schema } from '../components/Step2'
import { Step3, Step3Schema } from '../components/Step3'
import { Step4, Step4Schema } from '../components/Step4'
import { Step5, Step5Schema } from '../components/Step5'
import { FinalResults } from '../components/FinalResults'

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
		content: <Step3 />,
	},
	{
		label: 'Step 4',
		description: 'Cognitive Distortions And Alternative Thoughts',
		content: <Step4 />,
	},
	{
		label: 'Step 5',
		description: 'Outcome And Action Plan',
		content: <Step5 />,
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
	timestamp: '',
	id: '',
}

export type FormValues = typeof INITIAL_VALUES

const schemaArr = [
	Step1Schema,
	Step2Schema,
	Step3Schema,
	Step4Schema,
	Step5Schema,
]

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

	const [showDebugger, setShowDebugger] = useState(false)

	const methods = useForm<FormValues>({
		resolver: yupResolver(schemaArr[activeStep]),
		defaultValues: INITIAL_VALUES,
	})

	const { handleSubmit } = methods

	const formResults = methods.getValues()

	const router = useRouter()

	const onSubmit = () => {
		if (activeStep === steps.length - 1) {
		}
		nextStep()
	}

	const bg = useColorModeValue('gray.50', 'gray.800')

	const toast = useToast()

	const handleReset = () => {
		reset()
		methods.reset()
		window.location.reload()
	}

	const isDuplicateSubmission = (submissions: any, formResults: any) => {
		return submissions.some(
			(submission: any) =>
				JSON.stringify(submission) === JSON.stringify(formResults)
		)
	}

	const saveSubmission = (submissions: any, formResults: any) => {
		submissions.push(formResults)
		localStorage.setItem('cognitiveJournalData', JSON.stringify(submissions))
	}

	const saveResults = () => {
		const storedData = localStorage.getItem('cognitiveJournalData')
		let submissions = storedData ? JSON.parse(storedData) : []

		if (isDuplicateSubmission(submissions, formResults)) {
			toast({
				title: 'Duplicate Submission',
				description: 'You have already saved this entry.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			})
		} else {
			formResults.timestamp = new Date().toISOString()
			formResults.id = uuidv4()
			saveSubmission(submissions, formResults)

			toast({
				title: 'Success',
				description: 'Your entry has been saved.',
				status: 'success',
				duration: 3000,
				isClosable: true,
			})
		}
	}

	return (
		<>
			<Box sx={{ mt: 24 }} paddingX='16px'>
				<FormProvider {...methods}>
					<Steps variant='circles-alt' activeStep={activeStep} colorScheme='pink'>
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
							<Text>
								You&apos;ve just completed a cognitive journal entry, taking a brave
								step towards self-reflection and personal growth.
							</Text>
							<FinalResults data={formResults} />
						</Box>
						<Button
							variant='outline'
							sx={{ mb: 8, mt: 4 }}
							mx='auto'
							onClick={() => saveResults()}
						>
							Save Results To My Device
						</Button>
						<Button variant='ghost' mx='auto' onClick={() => handleReset()}>
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
				{/* <Center>
					<Button variant='solid' mt='8' onClick={() => router.push('/submissions')}>
						See all submissions
					</Button>
				</Center> */}
				<Box as='pre' bg={bg} rounded='md' width='100%' p={4} mt={16}>
					{showDebugger && <code>{JSON.stringify(methods.watch(), null, 2)}</code>}
					<Button onClick={() => setShowDebugger(!showDebugger)}>
						Toggle Debugger
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default CognitiveJournalingForm
