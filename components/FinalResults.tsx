import {
	Container,
	Highlight,
	Text,
	List,
	ListItem,
	ListIcon,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export const FinalResults = ({ data }) => {
	console.log(data)
	return (
		<Container fontSize={'lg'} textAlign='center'>
			<Text fontWeight={700} fontSize={24} sx={{ my: 4 }}>
				Your results{' '}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Mood'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Mood
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.mood}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Situation'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Situation
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.situation}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Emotions'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Emotions
				</Highlight>
			</Text>
			<List my={2} spacing={3}>
				{data.emotions.map((emotion) => (
					<ListItem key={emotion}>
						{' '}
						<ListIcon as={CheckIcon} color='green.500' />
						{emotion?.value}
					</ListItem>
				))}
			</List>
			<Text pb='2'>
				<Highlight
					query='Automatic Thoughts'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Automatic Thoughts
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.automaticThoughts}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Evidence Supporting'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Evidence Supporting
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.evidenceSupporting}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Evidence Against'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Evidence Against
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.evidenceAgainst}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Cognitive Distortions'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Cognitive Distortions
				</Highlight>
			</Text>
			<List my={2} spacing={3}>
				{data.cognitiveDistortions.map((cognitiveDistortion) => (
					<ListItem key={cognitiveDistortion}>
						{' '}
						<ListIcon as={CheckIcon} color='green.500' />
						{cognitiveDistortion?.value}
					</ListItem>
				))}
			</List>
			<Text pb='2'>
				<Highlight
					query='Alternative Thoughts'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Alternative Thoughts
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.alternativeThoughts}
			</Text>
			<Text pb='2'>
				<Highlight
					query='Outcome'
					styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
				>
					Outcome
				</Highlight>
			</Text>
			<Text px='2' py='2'>
				{data.outcome}
			</Text>
			<Highlight
				query='Action Plan'
				styles={{ px: '2', py: '1', rounded: 'full', bg: 'pink.100' }}
			>
				Action Plan
			</Highlight>
			<Text px='2' py='2'>
				{data.actionPlan}
			</Text>
		</Container>
	)
}
