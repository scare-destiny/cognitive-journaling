import { Box, Heading, Text } from '@chakra-ui/react'
import { SubmissionCard } from '../components/SubmissionCard'
import { useEffect, useState } from 'react'

interface Submission {
	// you should define the shape of a Submission here
}

const SubmissionsPage: React.FC = () => {
	const [submissions, setSubmissions] = useState<Submission[]>([])

	useEffect(() => {
		const storedData = localStorage.getItem('cognitiveJournalData')
		const parsedData: Submission[] = storedData ? JSON.parse(storedData) : []
		setSubmissions(parsedData)
	}, [])

	return (
		<Box p={4} mx='auto'>
			<Heading as='h1' size='xl' fontWeight='semibold' mb={4}>
				Cognitive Journal Submissions
			</Heading>
			{submissions.length === 0 ? (
				<Text color='gray.600'>No submissions found. Start journaling!</Text>
			) : (
				submissions.map((submission, index) => (
					<SubmissionCard submission={submission} index={index} key={index} />
				))
			)}
		</Box>
	)
}

export default SubmissionsPage
