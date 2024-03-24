import { ResolutionStep } from '../get-resolution';

export const getResolutionSteps = ({
	lastStep,
}: {
	lastStep: ResolutionStep;
}): ResolutionStep[] => {
	const steps: ResolutionStep[] = [];

	let currentStep: ResolutionStep | undefined = lastStep;

	while (currentStep) {
		steps.unshift(currentStep);

		currentStep = currentStep.previous;
	}

	return steps;
};
