import clsx from 'clsx';

import $$ from './animated-text.module.css';

export const AnimatedText = ({ children }: { children: string }) => {
	const words = children.split(' ').filter(Boolean);

	return (
		<div className={$$.animatedText}>
			{words.map((word, index) => (
				<Word key={index}>{word}</Word>
			))}
		</div>
	);
};

const Word = ({ children }: { children: string }) => {
	const letters = [...children];

	return (
		<div className={$$.word}>
			{letters.map((letter, index) => (
				<span
					key={index}
					className={clsx($$.letter, $$[`speed${getSpeed({ index, letter })}`])}
				>
					{letter}
				</span>
			))}
		</div>
	);
};

// return a number between 1 and 3 based on letter character code and index
const getSpeed = ({
	index,
	letter,
	total = 5,
}: {
	letter: string;
	index: number;
	total?: number;
}) => {
	const charCode = letter.codePointAt(0) ?? 0;

	return (charCode + index) % total;
};
