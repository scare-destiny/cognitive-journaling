import { useCallback, useContext } from 'react'
import { produce } from 'immer'
import { Flex, Heading, Button, Grid, Container } from '@chakra-ui/react'
import { Step, Steps, useSteps } from 'chakra-ui-steps'
import { FormStateContext } from './FormContainer'
import { FORM_STEPS } from '../contexts/data'

export const MultiStepForm = () => {
	const { form, setForm } = useContext(FormStateContext)

	const next = useCallback(() => {
		setForm(
			produce((form) => {
				form.selectedIndex += 1
			})
		)
	}, [setForm])

	const prev = useCallback(() => {
		setForm(
			produce((form) => {
				form.selectedIndex -= 1
			})
		)
	}, [setForm])

	const setSelectedIndex = useCallback(
		(index: number) => {
			setForm(
				produce((form) => {
					form.selectedIndex = index
				})
			)
		},
		[setForm]
	)

	const { nextStep, prevStep, reset, activeStep } = useSteps({
		initialStep: 0,
	})

	return (
		<Flex h='100%' alignItems='center' justifyContent='center'>
			<Flex flexDir='column' width='100%' paddingX={16}>
				<Steps size='md' activeStep={activeStep} responsive>
					{FORM_STEPS.map(({ label }, index) => (
						<Step label={label} key={label}>
							<p index={index}>{label}</p>
						</Step>
					))}
				</Steps>
				{activeStep === FORM_STEPS.length ? (
					<Flex px={4} py={4} width='100%' flexDirection='column'>
						<Heading fontSize='xl' textAlign='center'>
							Woohoo! All steps completed!
						</Heading>
						<Button mx='auto' mt={6} size='sm' onClick={reset}>
							Reset
						</Button>
					</Flex>
				) : (
					<Flex width='100%' justify='flex-end'>
						<Button
							isDisabled={activeStep === 0}
							mr={4}
							onClick={prevStep}
							size='sm'
							variant='ghost'
						>
							Prev
						</Button>
						<Button size='sm' onClick={nextStep}>
							{activeStep === FORM_STEPS.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</Flex>
				)}
			</Flex>
		</Flex>
	)
}
