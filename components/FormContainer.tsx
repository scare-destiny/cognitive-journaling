import { createContext, useCallback, useState } from 'react'
import { FORM_STATE } from '../contexts/data'
import { MultiStepForm } from './MultiStepForm'

export const FormStateContext = createContext({
	form: FORM_STATE,
	setForm: (
		form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
	) => {},
})

const MultiStepFormContainer = () => {
	const [form, setForm] = useState(FORM_STATE)

	const onComplete = useCallback((state: any) => {
		// do something with "state"
	}, [])

	return (
		<FormStateContext.Provider
			value={{
				form,
				setForm,
			}}
		>
			<MultiStepForm />
		</FormStateContext.Provider>
	)
}

export default MultiStepFormContainer
