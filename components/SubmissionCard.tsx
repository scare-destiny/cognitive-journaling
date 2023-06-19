import { Box, Heading, Text, Grid, GridItem, Badge } from '@chakra-ui/react'

import { format } from 'date-fns'

interface SubmissionCardProps {
	submission: Submission
	index: number
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({
	submission,
	index,
}) => {
	const formattedTimestamp = submission.timestamp
		? format(new Date(submission.timestamp), 'Pp')
		: 'Timestamp not available'

	return (
		<Box
			borderWidth={1}
			borderRadius='lg'
			overflow='hidden'
			mb={4}
			boxShadow='lg'
		>
			<Box p='6'>
				<Heading size='md' fontWeight='medium'>
					Submission {index + 1} - {formattedTimestamp}
				</Heading>
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
														{item.label}
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
