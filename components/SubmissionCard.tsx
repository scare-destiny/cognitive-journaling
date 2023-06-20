import {
	Box,
	Heading,
	Button,
	Grid,
	GridItem,
	Badge,
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { format } from 'date-fns'

interface SubmissionCardProps {
	submission: Submission
	index: number
	deleteSubmission: (id: string) => void
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
	submission,
	index,
	deleteSubmission,
}) => {
	const formattedTimestamp = submission.timestamp
		? format(new Date(submission.timestamp), 'Pp')
		: 'Timestamp not available'

	const [isOpen, setIsOpen] = useState(false)
	const onClose = () => setIsOpen(false)
	const onDelete = () => {
		deleteSubmission(submission.id)
		setIsOpen(false)
	}
	const cancelRef = useRef()

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			overflow='hidden'
			mb={4}
			boxShadow='lg'
		>
			<Box p='6'>
				<Grid templateColumns='repeat(12, 1fr)' gap={6}>
					<GridItem colSpan={10}>
						<Heading size='md' fontWeight='medium' mr='12'>
							Submission - {formattedTimestamp}
						</Heading>
					</GridItem>
					<GridItem
						colSpan={2}
						display='flex'
						justifyContent='flex-end'
						alignItems='center'
					>
						<AlertDialog
							isOpen={isOpen}
							leastDestructiveRef={cancelRef}
							onClose={onClose}
						>
							<AlertDialogOverlay>
								<AlertDialogContent>
									<AlertDialogHeader fontSize='lg' fontWeight='bold'>
										Delete Submission
									</AlertDialogHeader>

									<AlertDialogBody>
										Are you sure? This action cannot be undone.
									</AlertDialogBody>

									<AlertDialogFooter>
										<Button ref={cancelRef} onClick={onClose}>
											Cancel
										</Button>
										<Button colorScheme='red' onClick={onDelete} ml={3}>
											Delete
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialogOverlay>
						</AlertDialog>
						<Button
							minW='fit-content'
							colorScheme='red'
							onClick={() => setIsOpen(true)}
						>
							Delete
						</Button>
					</GridItem>
				</Grid>
				<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
					<Box overflowX='auto'>
						{Object.entries(submission).map(([key, value], idx) => {
							const isEmotionArray = Array.isArray(value) && value[0]?.label
							return (
								<Box key={idx} py={2} display='flex' alignItems='baseline'>
									<Box
										textTransform='capitalize'
										ml='2'
										fontWeight='semibold'
										flexBasis='20%'
										color='gray.500'
									>
										{key}
									</Box>
									<Box flexBasis='80%' ml='4'>
										{' '}
										{isEmotionArray
											? value.map((item, idx) => (
													<Badge key={idx} borderRadius='full' px='2' colorScheme='teal'>
														{item.label} {item.intensityBefore}
													</Badge>
											  ))
											: value}
									</Box>
								</Box>
							)
						})}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
