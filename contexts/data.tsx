export const FORM_STEPS: Array<any> = [
	{
		label: 'Situation',
	},
	{
		label: 'Emotions',
	},
	{
		label: 'Automatic thoughts',
	},
]

export const FORM_STATE = {
	selectedIndex: 0,
	steps: {
		situation: {
			valid: false,
			dirty: false,
			value: {
				situation: '',
			},
		},
		emotions: {
			valid: false,
			dirty: false,
			value: {
				emotions: [],
			},
		},
		automatic_thoughts: {
			valid: false,
			dirty: false,
			value: { automatic_thoughts: '' },
		},
		evidence_supporting: {
			valid: false,
			dirty: false,
			value: { evidence_supporting: '' },
		},
		evidence_against: {
			valid: false,
			dirty: false,
			value: { evidence_against: '' },
		},
		cognitive_distortions: {
			valid: false,
			dirty: false,
			value: { cognitive_distortions: [] },
		},
		alternative_thoughts: {
			valid: false,
			dirty: false,
			value: { alternative_thoughts: '' },
		},
		outcome: {
			valid: false,
			dirty: false,
			value: { outcome: '' },
		},
		action_plan: {
			valid: false,
			dirty: false,
			value: { outcome: '' },
		},
	},
}
