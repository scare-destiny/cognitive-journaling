import * as yup from 'yup'
import { useState } from 'react'
import { EmotionsSelect, EmotionScale, MoodSelect } from './index'

export const Step1Schema = yup.object().shape({
	mood: yup.string().required('This value is required.'),
	emotions: yup.array().min(1, 'Please share your emotions.'),
})

export const Step1 = () => {
	const [selectedEmotions, setSelectedEmotions] = useState([])

	return (
		<>
			<EmotionsSelect setSelectedEmotions={setSelectedEmotions} />
<<<<<<< HEAD
=======
			{selectedEmotions.length > 0 && <EmotionScale />}
>>>>>>> c35b59f3ee8e49c3078a68cff2f68d38b8db3095
			<MoodSelect />
		</>
	)
}
