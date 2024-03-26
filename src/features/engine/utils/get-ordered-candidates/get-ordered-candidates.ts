import { Movable } from '../../types/entities';
import { getHasPriority } from '../get-has-priority';
import { getIsSameVector } from '../get-is-same-vector';
import { getObstaclePosition } from '../get-obstacle-position';

type Candidate = Pick<Movable, 'position' | 'velocity'>;

const getFirstCandidate = ({ candidates }: { candidates: Candidate[] }) =>
	candidates.find((candidate) => {
		const obstaclePosition = getObstaclePosition(candidate);
		const hasObstacle = candidates.some(({ position }) =>
			getIsSameVector(position, obstaclePosition),
		);

		return !hasObstacle;
	});

const getHighestCandidate = ({ candidates }: { candidates: Candidate[] }) => {
	let highest: Candidate | undefined;

	for (const candidate of candidates) {
		if (!highest) {
			highest = candidate;

			continue;
		}

		if (highest.position.y > candidate.position.y) {
			highest = candidate;
		}
	}

	return highest;
};

export const getOrderedCandidates = ({
	candidates,
}: {
	candidates: Candidate[];
}): Candidate[] => {
	switch (candidates.length) {
		case 0: {
			return [];
		}

		case 1: {
			return candidates;
		}

		case 2: {
			// first is the one with priority
			if (getHasPriority(candidates[0], candidates[1])) {
				return candidates;
			}

			return [candidates[1], candidates[0]];
		}

		case 3: {
			// first is the one without an obstacle on it's right
			const first = getFirstCandidate({ candidates });
			if (!first) {
				throw new Error('[getOrderedCandidates] First candidate not found');
			}

			return [
				first,
				...getOrderedCandidates({
					candidates: candidates.filter((candidate) => candidate !== first),
				}),
			];
		}

		case 4: {
			// first is the one with the highest y
			const highest = getHighestCandidate({ candidates });
			if (!highest) {
				throw new Error('[getOrderedCandidates] Highest candidate not found');
			}

			return [
				highest,
				...getOrderedCandidates({
					candidates: candidates.filter((candidate) => candidate !== highest),
				}),
			];
		}

		default: {
			throw new Error(
				`[getOrderedCandidates] ${candidates.length} candidates are not supported`,
			);
		}
	}
};
