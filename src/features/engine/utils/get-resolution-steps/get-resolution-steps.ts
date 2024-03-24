import { ResolutionStep } from '../get-resolution';

export const getResolutionSteps = ({
	resolution,
}: {
	resolution: ResolutionStep;
}): ResolutionStep[] => {
	const steps: ResolutionStep[] = [];

	let currentStep: ResolutionStep | undefined = resolution;

	while (currentStep) {
		steps.unshift(currentStep);

		currentStep = currentStep.previous;
	}

	return steps.filter((step) => step.velocity);
};
