import { Box, Heading, Text, Button, Center } from '@chakra-ui/react'
import { SubmissionCard } from '../components/SubmissionCard'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface Submission {
	// you should define the shape of a Submission here
}

const SubmissionsPage: React.FC = () => {
	const [submissions, setSubmissions] = useState<Submission[]>([])

	const router = useRouter()

	useEffect(() => {
		const storedData = localStorage.getItem('cognitiveJournalData')
		const parsedData: Submission[] = storedData ? JSON.parse(storedData) : []
		setSubmissions(parsedData)
	}, [])

	const deleteSubmission = (id: string) => {
		const newSubmissions = submissions.filter(
			(submission) => submission.id !== id
		)
		setSubmissions(newSubmissions)
		localStorage.setItem('cognitiveJournalData', JSON.stringify(newSubmissions))
	}

	return (
		<Box p={4} mx='auto'>
			<Heading as='h1' size='xl' fontWeight='semibold' mb={4}>
				Cognitive Journal Submissions
			</Heading>
			{submissions.length === 0 ? (
				<>
					<Text color='gray.600'>No submissions found. Start journaling!</Text>
					<Button mt='4' onClick={() => router.push('/')}>
						Submit your first entry
					</Button>
				</>
			) : (
				submissions.map((submission) => (
					<>
						<SubmissionCard
							submission={submission}
							index={submission.id}
							key={submission.id}
							deleteSubmission={deleteSubmission}
						/>
					</>
				))
			)}
		</Box>
	)
}

export default SubmissionsPage
